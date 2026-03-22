"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useLocale, useTranslations } from "next-intl"
import { useEffect, useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import { sendContact } from "@/app/[locale]/(marketing)/contact/actions"
import {
  type FormValues,
  formSchema,
} from "@/app/[locale]/(marketing)/contact/schemas"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Locale } from "@/i18n/routing"

export default function ContactPage() {
  const locale = useLocale() as Locale
  const t = useTranslations("Contact")
  const [pending, startTransition] = useTransition()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      console.log(values)
      await sendContact(values, locale)
    })
  }

  useEffect(() => {
    if (errors) {
      console.log(errors)
    }
  }, [errors])

  return (
    <div className="section-padding">
      <div className="container-custom max-w-2xl">
        <h1 className="title-lg">{t("title")}</h1>

        <p className="text-base-custom mt-4">{t("subtitle")}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input placeholder={t("form.name")} {...field} />
            )}
          />
          <p className="text-red-500">{errors.name?.message}</p>

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input type="email" placeholder={t("form.email")} {...field} />
            )}
          />
          <p className="text-red-500">{errors.email?.message}</p>

          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <Textarea placeholder={t("form.message")} {...field} />
            )}
          />
          <p className="text-red-500">{errors.message?.message}</p>

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? t("form.sending") : t("form.submit")}
          </Button>
        </form>
      </div>
    </div>
  )
}
