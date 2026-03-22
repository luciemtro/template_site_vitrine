import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import "@/app/globals.css"

import { Inter, Poppins } from "next/font/google"
import { Toaster } from "sonner"
import NavBar from "@/components/NavBar"
import type { Locale } from "@/i18n/routing"
import ZodI18nProvider from "@/components/zod/ZodI18nProvider";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontHeading = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading",
})

export const metadata: Metadata = {
  /* =========================================================
     🧠 SEO (Google)
  ========================================================= */

  // 👉 Nom du site / page
  title: "Nom du site",

  // 👉 Description (120–160 caractères)
  description: "Explique ici clairement ton activité et ta valeur",

  // 👉 Mots-clés (optionnel)
  keywords: ["mot clé", "service", "ville"],

  // 👉 Auteur
  authors: [{ name: "Nom entreprise" }],

  /* =========================================================
     🌐 OPEN GRAPH (LE PLUS IMPORTANT)
  ========================================================= */

  openGraph: {
    title: "Nom du site",
    description: "Description pour réseaux sociaux",

    // 👉 URL du site
    url: "https://tonsite.com",

    // 👉 Image preview (ULTRA IMPORTANT)
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aperçu du site",
      },
    ],

    type: "website",
  },

  /* =========================================================
     🐦 TWITTER (OPTIONNEL)
  ========================================================= */

  twitter: {
    card: "summary_large_image",
    title: "Nom du site",
    description: "Description pour Twitter",
    images: ["/og-image.jpg"],
  },

  /* =========================================================
     🌍 BASE URL
  ========================================================= */

  metadataBase: new URL("https://tonsite.com"),
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params

  const messages = await getMessages({ locale })

  return (
    <html
      lang={locale}
      className={`${fontSans.variable} ${fontHeading.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <ZodI18nProvider>
            <NavBar />
            <main className="min-h-screen">{children}</main>
            <Toaster />
          </ZodI18nProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
