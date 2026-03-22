"use server"

import { Resend } from "resend"
import type { FormValues } from "@/app/[locale]/(marketing)/contact/schemas"
import { contactAdminTemplate } from "@/app/emails/contact-admin"
import { contactUserTemplate } from "@/app/emails/contact-user"
import type { Locale } from "@/i18n/routing"

// 🔒 sécurité env
if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY")
}

if (!process.env.CONTACT_FROM_EMAIL || !process.env.CONTACT_EMAIL) {
  throw new Error("Missing email config")
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContact(formData: FormValues, locale: Locale) {
  try {
    const name = formData.name
    const email = formData.email
    const message = formData.message

    // 🌍 sujets multi-langue
    const subjects =  `Nouveau message de ${name}`

    const autoReplySubjects = {
      fr: "Nous avons bien reçu votre message",
      en: "We received your message",
    }

    // 📩 ADMIN
    if (process.env.CONTACT_FROM_EMAIL && process.env.CONTACT_EMAIL) {
      await resend.emails.send({
        from: email,
        to: process.env.CONTACT_EMAIL,
        subject: subjects,
        replyTo: email,
        html: contactAdminTemplate({
          name,
          email,
          message,
        }),
      })
    } else {
      console.log("env CONTACT_FROM_EMAIL is missing")
    }

    // 📩 CLIENT
    if (process.env.CONTACT_AUTO_REPLY && process.env.CONTACT_FROM_EMAIL) {
      await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL,
        to: email,
        subject: autoReplySubjects[locale as "fr" | "en"],
        html: contactUserTemplate({
          name,
          locale,
        }),
      })
    }

    return { success: true }
  } catch (error) {
    console.error("CONTACT ERROR:", error)
    return { error: "server_error" }
  }
}
