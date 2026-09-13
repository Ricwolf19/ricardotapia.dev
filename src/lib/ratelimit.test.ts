import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

/**
 * `features` is computed from `process.env` at module load, so each case sets the
 * environment and then re-imports through `vi.resetModules()`. Mocking Upstash's
 * HTTP API is legitimate here — it is a third party we don't own; what is under
 * test is our window arithmetic around it.
 */
const loadWithEnv = async (configured: boolean) => {
  vi.resetModules();
  if (configured) {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.test");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "token");
  } else {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");
  }
  return import("@/lib/ratelimit");
};

/** Replies to each Redis command in order with the given results. */
const mockRedis = (results: unknown[]) => {
  const calls: (string | number)[][] = [];
  let i = 0;
  vi.stubGlobal(
    "fetch",
    vi.fn(async (_url: string, init: { body: string }) => {
      calls.push(JSON.parse(init.body) as (string | number)[]);
      return { json: async () => ({ result: results[i++] }) };
    }),
  );
  return calls;
};

beforeEach(() => vi.unstubAllGlobals());
afterEach(() => vi.unstubAllEnvs());

describe("checkRateLimit", () => {
  it("allows everything when Upstash is not configured", async () => {
    const { checkRateLimit } = await loadWithEnv(false);
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    expect(await checkRateLimit("1.2.3.4")).toEqual({ success: true });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("sets the TTL on the first request of a window", async () => {
    const { checkRateLimit } = await loadWithEnv(true);
    const calls = mockRedis([1, "OK"]);

    await checkRateLimit("1.2.3.4");

    // Without this EXPIRE the key would never age out and the caller would be
    // blocked permanently after three requests.
    expect(calls[0]?.[0]).toBe("INCR");
    expect(calls[1]?.[0]).toBe("EXPIRE");
  });

  it("does not reset the TTL on later requests in the same window", async () => {
    const { checkRateLimit } = await loadWithEnv(true);
    const calls = mockRedis([2]);

    await checkRateLimit("1.2.3.4");

    expect(calls.map((c) => c[0])).toEqual(["INCR"]);
  });

  it("allows up to the limit and rejects past it", async () => {
    const { checkRateLimit } = await loadWithEnv(true);

    mockRedis([3]);
    expect(await checkRateLimit("ip")).toEqual({ success: true });

    mockRedis([4]);
    expect(await checkRateLimit("ip")).toEqual({ success: false });
  });

  it("fails open when Redis is unreachable", async () => {
    const { checkRateLimit } = await loadWithEnv(true);
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("ECONNREFUSED");
      }),
    );

    // A Redis outage must never take the contact form down with it.
    expect(await checkRateLimit("1.2.3.4")).toEqual({ success: true });
  });

  it("namespaces the key per identifier", async () => {
    const { checkRateLimit } = await loadWithEnv(true);
    const calls = mockRedis([1, "OK"]);

    await checkRateLimit("9.9.9.9");

    expect(String(calls[0]?.[1])).toContain("9.9.9.9");
  });
});
