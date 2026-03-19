function escapeHtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const translations = {
  fr: {
    title: "Nouveau message reçu",
    name: "Nom",
    email: "Email",
    message: "Message",
    footer: "Envoyé depuis le formulaire de contact",
  },
  en: {
    title: "New message received",
    name: "Name",
    email: "Email",
    message: "Message",
    footer: "Sent from contact form",
  },
};

export function contactAdminTemplate({
  name,
  email,
  message,
  locale,
}: {
  name: string;
  email: string;
  message: string;
  locale: string;
}) {
  const t = translations[locale as "fr" | "en"] || translations.fr;

  return `
    <div style="font-family: Arial, sans-serif; background:#f9f9f9; padding:40px;">
      <div style="max-width:600px;margin:auto;background:#fff;padding:30px;border-radius:8px;">
        
        <h2>${t.title}</h2>

        <p><strong>${t.name} :</strong><br/>${escapeHtml(name)}</p>
        <p><strong>${t.email} :</strong><br/>${escapeHtml(email)}</p>

        <p><strong>${t.message} :</strong></p>
        <p style="white-space: pre-line; line-height:1.6;">
          ${escapeHtml(message)}
        </p>

        <hr/>

        <p style="font-size:12px;color:#888;">
          ${t.footer}
        </p>

      </div>
    </div>
  `;
}
