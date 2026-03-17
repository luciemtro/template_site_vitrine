import createMiddleware from "next-intl/middleware";
import { locales } from "@/i18n/routing";

export default createMiddleware({
  // Liste des langues supportées
  locales: locales,
  defaultLocale: "fr",
});

export const config = {
  matcher: [
    // Applique le middleware à toutes les requêtes SAUF :
    // - Les routes d'API (/api/...)
    // - Les fichiers internes de Next.js (/_next/...)
    // - Les fichiers statiques avec une extension (comme favicon.ico, .css, .png, etc.)
    "/((?!api|_next|.*\\..*).*)",
  ],
};
