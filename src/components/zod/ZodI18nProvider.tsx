"use client"

import { useTranslations } from "next-intl"
import { useEffect, type ReactNode } from "react"
import { z } from "zod"
import { makeZodI18nMap } from "zod-i18n-map"

export default function ZodI18nProvider({ children }: { children: ReactNode }) {
    const t = useTranslations("zod")

    useEffect(() => {
        // On repasse sur setErrorMap et on demande à TypeScript d'ignorer la dépréciation
        // @ts-expect-error: z.setErrorMap est déprécié dans Zod v4 mais toujours fonctionnel avec zod-i18n-map
        z.setErrorMap(makeZodI18nMap({ t }))
    }, [t])

    return <>{children}</>
}