import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // Liste des langues supportées
    locales: ['fr', 'en'],
    // Langue par défaut si l'utilisateur arrive sur monsite.com/
    defaultLocale: 'fr'
});

export const config = {
    // Applique le middleware sur toutes les pages sauf les fichiers statiques et les API
    matcher: ['/', '/(fr|en)/:path*']
};