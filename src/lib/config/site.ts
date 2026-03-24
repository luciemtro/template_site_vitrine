// config/site.ts
export const siteConfig = {
  name: "Acme",
  brandAccent: ".", // le point coloré après le nom
  email: "hello@acme.com",
  socials: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    twitter: "https://twitter.com/",
  },
    // Google Places — null si la fiche n'existe pas encore
  googlePlaceId: null as string | null,

  // Fallbacks affichés si pas de Google
  stats: {
    yearFounded: "2024",
    projectsDone: "12+",
    satisfactionRate: "100%",
  },
}
