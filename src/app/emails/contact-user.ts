import {escapeHtml} from "@/lib/utils";

const translations = {
  fr: {
    title: "Confirmation de réception",
    hello: "Bonjour",
    text: "Nous avons bien reçu votre message et vous répondrons rapidement.",
    end: "Cordialement",
  },
  en: {
    title: "Message received",
    hello: "Hello",
    text: "We received your message and will reply shortly.",
    end: "Best regards",
  },
}

export function contactUserTemplate({
  name,
  locale,
}: {
  name: string
  locale: string
}) {
  const t = translations[locale as "fr" | "en"] || translations.fr

  return `
    <div style="font-family: Arial, sans-serif; background:#f9f9f9; padding:40px;">
      <div style="max-width:600px;margin:auto;background:#fff;padding:30px;border-radius:8px;">
        
        <h2>${t.title}</h2>

        <p>${t.hello} ${escapeHtml(name)},</p>

        <p>${t.text}</p>

        <br/>

        <p>${t.end}<br/>${process.env.NEXT_PUBLIC_SITE_NAME || "L’équipe"}</p>

      </div>
    </div>
  `
}
