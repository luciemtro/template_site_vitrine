import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

const locales = ["fr", "en"];

export default getRequestConfig(async ({ requestLocale }) => {
  // 1. On récupère la langue demandée
  const locale = await requestLocale;

  // 2. Si elle est absente ou non supportée, on déclenche une page 404
  if (!locale || !locales.includes(locale)) {
    notFound();
  }

  // 3. À ce stade, TypeScript sait que `locale` est 100% une string valide
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
