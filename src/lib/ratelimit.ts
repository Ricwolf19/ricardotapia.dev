import { env, features } from "./env";

const WINDOW_SECONDS = 600; // 10 minutes
const MAX_REQUESTS = 3;

/** Runs a single Redis command through the Upstash REST API. */
const redis = async (command: (string | number)[]): Promise<unknown> => {
  const res = await fetch(env.upstashUrl ?? "", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.upstashToken ?? ""}` },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  const data = (await res.json()) as { result?: unknown };
  return data.result;
};

/**
 * Fixed-window rate limit keyed by an identifier (e.g. hashed IP).
 * Returns `{ success: true }` when rate limiting is not configured, and
 * fails open on infrastructure errors so a transient Redis outage never
 * blocks the contact form.
 */
export const checkRateLimit = async (identifier: string): Promise<{ success: boolean }> => {
  if (!features.rateLimit) return { success: true };

  const key = `ratelimit:contact:${identifier}`;
  try {
    const count = Number(await redis(["INCR", key]));
    if (count === 1) await redis(["EXPIRE", key, WINDOW_SECONDS]);
    return { success: count <= MAX_REQUESTS };
  } catch {
    return { success: true };
  }
};
