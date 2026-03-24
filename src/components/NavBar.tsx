"use client"

import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import LocaleSwitcher from "@/components/ui/locale-switcher"
import { usePathname } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
]

export default function NavBar() {
  const t = useTranslations("Navigation")
  const pathname = usePathname()

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  return (
    <>
      {/* NAVBAR */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-nav-bg backdrop-blur-xl border-b border-nav-border shadow-sm"
            : "bg-transparent",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-500",
            scrolled ? "h-14" : "h-20",
          )}
        >
          {/* LOGO */}
          <Link
            href="/"
            className="group text-2xl font-black tracking-tighter transition-opacity hover:opacity-80"
          >
            Lucie
            <span className="text-accent transition-all duration-300 group-hover:opacity-70">
              .
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-1 rounded-full border border-border bg-secondary/60 backdrop-blur-md px-2 py-1.5 text-sm font-medium shadow-sm">
            {NAV_LINKS.map(({ key, href }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={key}
                  href={href}
                  className={cn(
                    "relative px-4 py-1.5 rounded-full transition-colors duration-200",
                    isActive
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-secondary ring-1 ring-border"
                      transition={{
                        type: "spring",
                        bounce: 0.25,
                        duration: 0.4,
                      }}
                    />
                  )}

                  <span className="relative z-10 flex flex-col items-center gap-0.5">
                    {t(key)}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="h-1 w-1 rounded-full bg-accent"
                        transition={{
                          type: "spring",
                          bounce: 0.25,
                          duration: 0.4,
                        }}
                      />
                    )}
                  </span>
                </Link>
              )
            })}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            <LocaleSwitcher />

            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-cta-bg text-cta-text px-5 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-foreground/10"
            >
              {t("contact")}
            </Link>

            {/* BURGER */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Ouvrir le menu"
              className="md:hidden relative p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-background border-l border-border flex flex-col p-8 shadow-2xl"
            >
              {/* Header panel */}
              <div className="flex items-center justify-between mb-10">
                <span className="text-lg font-black tracking-tighter">
                  Lucie<span className="text-accent">.</span>
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Fermer le menu"
                  className="p-2 rounded-full hover:bg-secondary transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-1 flex-1">
                {NAV_LINKS.map(({ key, href }, i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors",
                        pathname === href
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                      )}
                    >
                      {t(key)}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom */}
              <div className="flex flex-col gap-4 pt-6 border-t border-border">
                <LocaleSwitcher />
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center rounded-full bg-cta-bg text-cta-text px-5 py-2.5 text-sm font-medium transition-all hover:scale-105"
                >
                  {t("contact")}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
