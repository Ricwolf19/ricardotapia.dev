import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all routes except api, _next, Vercel internals, the dynamic metadata
  // routes (opengraph-image / twitter-image — no file extension, so they would
  // otherwise be locale-prefixed and 404), and any path with a file extension.
  matcher: ["/((?!api|_next|_vercel|opengraph-image|twitter-image|.*\\..*).*)"],
};
