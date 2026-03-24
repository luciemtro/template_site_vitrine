// components/ui/locale-switcher.tsx
"use client"

import { useLocale } from "next-intl"
import { useTransition, useState, useRef, useEffect } from "react"
import { usePathname, useRouter } from "@/i18n/navigation"
import { useParams } from "next/navigation"
import { locales } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

export default function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const [_, startTransition] = useTransition()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // ✅ Fermeture au clic extérieur
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const changeLocale = (nextLocale: string) => {
    startTransition(() => {
      router.replace(
        { pathname, params } as any,
        { locale: nextLocale }
      )
    })
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      {/* TRIGGER */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium",
          "border border-neutral-200 dark:border-neutral-700",
          "bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md",
          "transition-all hover:border-neutral-400 dark:hover:border-neutral-500",
          open && "border-neutral-400 dark:border-neutral-500"
        )}
      >
        {/* Petite icône drapeau/globe optionnelle */}
        <span className="uppercase">{locale}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-neutral-500 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {/* DROPDOWN */}
      <div
        className={cn(
          // Position & layout
          "absolute right-0 mt-2 min-w-[80px]",
          // Style carte
          "rounded-xl border border-neutral-200 dark:border-neutral-700",
          "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-lg",
          "overflow-hidden",
          // Transition
          "transition-all duration-200 origin-top-right",
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        {locales.map((loc) => {
          const active = loc === locale

          return (
            <button
              key={loc}
              onClick={() => changeLocale(loc)}
              className={cn(
                "w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors",
                active
                  ? "bg-black text-white dark:bg-white dark:text-black font-medium"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white"
              )}
            >
              <span className="uppercase font-medium">{loc}</span>
              {/* ✅ Indicateur actif discret */}
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white dark:bg-black" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
