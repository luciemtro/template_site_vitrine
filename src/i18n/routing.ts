import { defineRouting } from "next-intl/routing"
import type { getPathname } from "@/i18n/navigation"

export const pathnames = {
  "/": "/",
  "/legal": "/legal",
  "/about": "/about",
  "/privacy": "/privacy",
  "/contact": "/contact",
  "/terms": "/terms",
  "/cookies": "/cookies",
} as const

export type Pathnames = keyof typeof pathnames

export const defaultLocale = "fr" as const
export const locales = ["fr", "en"] as const
export type Locale = (typeof locales)[number]

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: locales,
  localePrefix: "always",

  // Used when no locale matches
  defaultLocale: defaultLocale,
  pathnames,
})

export type Href = Parameters<typeof getPathname>[0]["href"]

export type HrefParams = Exclude<Href, Pathnames>
// biome-ignore lint/suspicious/noExplicitAny: Need the any to remove it
export type Links = Exclude<HrefParams, { params: any }>["pathname"]
