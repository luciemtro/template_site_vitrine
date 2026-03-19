"use client"

import { useLocale, useTranslations } from "next-intl"
import { useTransition } from "react"
import { toast } from "sonner"
import { sendContact } from "@/app/actions/contact"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  const locale = useLocale()
  const t = useTranslations("Contact")
  const [pending, startTransition] = useTransition()

  return (
    <main className="section-padding">
      <div className="container-custom max-w-2xl">
        <h1 className="title-lg">{t("title")}</h1>

        <p className="text-base-custom mt-4">{t("subtitle")}</p>

        <form
          className="mt-8 space-y-4"
          action={(formData) =>
            startTransition(async () => {
              formData.append("locale", locale)

              const res = await sendContact(formData)

              if (res?.success) {
                toast.success(t("success"))
                ;(document.activeElement as HTMLElement)
                  ?.closest("form")
                  ?.reset()
              } else {
                toast.error(t(`errors.${res?.error || "server_error"}`))
              }
            })
          }
        >
          <Input name="name" placeholder={t("form.name")} required />

          <Input
            name="email"
            type="email"
            placeholder={t("form.email")}
            required
          />

          <Textarea name="message" placeholder={t("form.message")} required />

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? t("form.sending") : t("form.submit")}
          </Button>
        </form>
      </div>
    </main>
  )
}
