"use client"

import { useParams } from "next/navigation"
import { type ReactNode, useTransition } from "react"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from "@/i18n/navigation"

type Props = {
  children: ReactNode
  locale: string
}

export default function LocaleSwitcherItem({ children, locale }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()

  function changeLocale(nextLocale: string) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      )
    })
  }

  return (
    <DropdownMenuItem onClick={() => changeLocale(locale)}>
      {children}
    </DropdownMenuItem>
  )
}
