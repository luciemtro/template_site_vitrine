import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { type Locale, locales } from "@/i18n/routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) as Locale;

  if (!locale || !locales.includes(locale)) {
    notFound();
  }
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
