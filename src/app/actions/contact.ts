"use server";

import { Resend } from "resend";
import { contactAdminTemplate } from "@/app/emails/contact-admin";
import { contactUserTemplate } from "@/app/emails/contact-user";
import { env } from "@/lib/env";

// 🔒 sécurité env
if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY");
}

if (!process.env.CONTACT_FROM_EMAIL || !process.env.CONTACT_EMAIL) {
  throw new Error("Missing email config");
}

const resend = new Resend(env.RESEND_API_KEY);

// 🔒 validation email
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 🔒 sécuriser locale
function getSafeLocale(locale: string) {
  return ["fr", "en"].includes(locale) ? locale : "fr";
}

export async function sendContact(formData: FormData) {
  try {
    const rawLocale = String(formData.get("locale") || "fr");
    const locale = getSafeLocale(rawLocale);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    // 🧠 validations
    if (!name || !email || !message) {
      return { error: "missing_fields" };
    }

    if (name.length < 2) {
      return { error: "invalid_name" };
    }

    if (!isValidEmail(email)) {
      return { error: "invalid_email" };
    }

    if (message.length < 10) {
      return { error: "message_too_short" };
    }

    if (message.length > 2000) {
      return { error: "message_too_long" };
    }

    // 🌍 sujets multi-langue
    const subjects = {
      fr: `Nouveau message de ${name}`,
      en: `New message from ${name}`,
    };

    const autoReplySubjects = {
      fr: "Nous avons bien reçu votre message",
      en: "We received your message",
    };

    // 📩 ADMIN
    await resend.emails.send({
      from: env.CONTACT_FROM_EMAIL,
      to: env.CONTACT_EMAIL,
      subject: subjects[locale as "fr" | "en"],
      replyTo: email,
      html: contactAdminTemplate({
        name,
        email,
        message,
        locale,
      }),
    });

    // 📩 CLIENT
    if (env.CONTACT_AUTO_REPLY) {
      await resend.emails.send({
        from: env.CONTACT_FROM_EMAIL,
        to: email,
        subject: autoReplySubjects[locale as "fr" | "en"],
        html: contactUserTemplate({
          name,
          locale,
        }),
      });
    }

    return { success: true };
  } catch (error) {
    console.error("CONTACT ERROR:", error);
    return { error: "server_error" };
  }
}
