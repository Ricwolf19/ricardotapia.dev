import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

const isLocale = (value: string | undefined): value is (typeof routing.locales)[number] =>
  value !== undefined && (routing.locales as readonly string[]).includes(value);

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = isLocale(requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
