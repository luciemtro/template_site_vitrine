// components/ui/footer.tsx
import Link from "next/link"
import { useTranslations } from "next-intl"
import { siteConfig } from "@/lib/config/site"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
}

export default function Footer() {
  const tf = useTranslations("Footer")
  const year = new Date().getFullYear()
const footerLinks = tf.raw("links") as { label: string; href: string }[]

  return (
    <footer className="relative w-full overflow-hidden border-t border-neutral-200 dark:border-neutral-800">

      {/* Glow décoratif */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full bg-blue-500/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">

          {/* COLONNE 1 — Branding */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-2xl font-black tracking-tighter transition hover:opacity-80 w-fit"
            >
              {siteConfig.name}
              <span className="text-blue-600">{siteConfig.brandAccent}</span>
            </Link>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xs">
              {tf("tagline")}
            </p>
          </div>

          {/* COLONNE 2 — Navigation */}
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold tracking-wide uppercase text-neutral-400">
              {tf("navigation")}
            </p>
            <nav className="flex flex-col gap-3">
              {footerLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="group w-fit text-sm text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <span className="h-px w-0 bg-blue-500 transition-all duration-300 group-hover:w-3" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* COLONNE 3 — Socials + Contact */}
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold tracking-wide uppercase text-neutral-400">
              {tf("connect")}
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {(Object.entries(siteConfig.socials) as [keyof typeof socialIcons, string][])
                .filter(([, href]) => href)
                .map(([key, href]) => {
                  const Icon = socialIcons[key]
                  return (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md transition-all hover:scale-110 hover:border-neutral-400 hover:text-black dark:hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  )
                })}

              {siteConfig.email && (
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="p-2 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md transition-all hover:scale-110 hover:border-neutral-400 hover:text-black dark:hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                </a>
              )}
            </div>

            {/* Bouton contact — même style que navbar */}
            {siteConfig.email && (
              <Link
                href="/contact"
                className="w-fit inline-flex items-center justify-center rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-all hover:scale-105 hover:shadow-lg dark:bg-white dark:text-black"
              >
                {tf("cta")}
              </Link>
            )}
          </div>

        </div>

        {/* SÉPARATEUR */}
        <div className="mt-12 border-t border-neutral-200 dark:border-neutral-800" />

        {/* BOTTOM BAR */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400 dark:text-neutral-500">
          <p>© {year} {siteConfig.name}. {tf("rights")}</p>
          <p className="flex items-center gap-1">
            {tf("madeWith")} <span className="text-blue-500">♥</span> {tf("and")} Next.js
          </p>
        </div>

      </div>
    </footer>
  )
}
