import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    // Node by default — most of what's worth testing here is pure. The few DOM
    // specs opt in per file with a `@vitest-environment jsdom` docblock, which
    // keeps the suite fast instead of booting jsdom for every file.
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
