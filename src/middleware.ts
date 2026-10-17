import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { DETECTION_FALLBACK, isLocale, preferredLocale } from "@/i18n/preferredLocale";

const intlMiddleware = createMiddleware(routing);

const hasLocalePrefix = (pathname: string) =>
  routing.locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));

/**
 * Unprefixed URL, no remembered choice, no supported browser language: send the
 * visitor to English instead of next-intl's default (es). Everything else —
 * prefixed URLs, the NEXT_LOCALE cookie, a matching Accept-Language — is
 * next-intl's normal detection.
 */
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const remembered = request.cookies.get("NEXT_LOCALE")?.value;

  if (
    !hasLocalePrefix(pathname) &&
    !isLocale(remembered) &&
    !preferredLocale(request.headers.get("accept-language"))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/${DETECTION_FALLBACK}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url, 307);
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all routes except api, _next, Vercel internals, the dynamic metadata
  // routes (opengraph-image / twitter-image / icon / apple-icon — no file
  // extension, so they would otherwise be locale-prefixed and 404), and any
  // path with a file extension.
  matcher: ["/((?!api|_next|_vercel|opengraph-image|twitter-image|icon|apple-icon|.*\\..*).*)"],
};
