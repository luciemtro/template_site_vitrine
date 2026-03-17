import Link from "next/link";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "@/components/ui/locale-switcher";

export default function NavBar() {
  // On charge les traductions spécifiques à la navigation
  const t = useTranslations("Navigation");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/70 backdrop-blur-lg dark:border-gray-800/50 dark:bg-neutral-950/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex shrink-0 items-center">
          <Link href="/" className="text-2xl font-black tracking-tighter">
            Lucie<span className="text-blue-600">.</span>
          </Link>
        </div>

        {/* Liens de navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-blue-600">
            {t("home")}
          </Link>
        </nav>

        {/* Actions à droite (Sélecteur de langue & Bouton d'action) */}
        <div className="flex items-center gap-4">
          {/* Emplacement pour le futur sélecteur de langue */}
          <LocaleSwitcher />

          {/* Call to Action */}
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#171717] px-5 py-2 text-sm font-medium text-white transition-transform hover:scale-105 dark:bg-white dark:text-black"
          >
            {t("contact")}
          </Link>

          {/* Bouton Menu Mobile (Basique) */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-500 hover:text-foreground"
          >
            {/** biome-ignore lint/a11y/noSvgWithoutTitle: <no> */}
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
