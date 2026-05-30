import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Matchear todas las rutas excepto api, _next, archivos estáticos
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
