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
      await sendContact(values, locale)
    })
  }

  useEffect(() => {
    if (errors) console.log(errors)
  }, [errors])

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-32 max-w-2xl mx-auto">

      {/* HEADER */}
      <p className="text-sm font-medium text-accent uppercase tracking-widest mb-4">
        {t("eyebrow")}
      </p>
      <h1 className="text-4xl sm:text-5xl font-black tracking-tighter leading-tight mb-4">
        {t("title")}
        <span className="text-accent">.</span>
      </h1>
      <p className="text-muted-foreground text-lg leading-relaxed mb-12">
        {t("subtitle")}
      </p>

      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* NAME */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            {t("form.name")}
          </label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                placeholder={t("form.namePlaceholder")}
                className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
                {...field}
              />
            )}
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* EMAIL */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            {t("form.email")}
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                type="email"
                placeholder={t("form.emailPlaceholder")}
                className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                {...field}
              />
            )}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* MESSAGE */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            {t("form.message")}
          </label>
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <Textarea
                placeholder={t("form.messagePlaceholder")}
                rows={6}
                className={errors.message ? "border-red-500 focus-visible:ring-red-500" : ""}
                {...field}
              />
            )}
          />
          {errors.message && (
            <p className="text-xs text-red-500">{errors.message.message}</p>
          )}
        </div>

        {/* SUBMIT */}
        <Button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-cta-bg text-cta-text hover:opacity-90 hover:scale-[1.02] transition-all duration-200 py-6 text-sm font-semibold"
        >
          {pending ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              {t("form.sending")}
            </span>
          ) : (
            t("form.submit")
          )}
        </Button>

      </form>
    </main>
  )
}
