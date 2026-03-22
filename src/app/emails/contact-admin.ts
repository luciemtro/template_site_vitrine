import {escapeHtml} from "@/lib/utils";

export function contactAdminTemplate({
  name,
  email,
  message,
}: {
  name: string
  email: string
  message: string
}) {

  return `
    <div style="font-family: Arial, sans-serif; background:#f9f9f9; padding:40px;">
      <div style="max-width:600px;margin:auto;background:#fff;padding:30px;border-radius:8px;">
        
        <h2>Nouveau message reçu</h2>

        <p><strong>Nom :</strong><br/>${escapeHtml(name)}</p>
        <p><strong>Email :</strong><br/>${escapeHtml(email)}</p>

        <p><strong>Message :</strong></p>
        <p style="white-space: pre-line; line-height:1.6;">
          ${escapeHtml(message)}
        </p>

        <hr/>

        <p style="font-size:12px;color:#888;">
         Envoyé depuis le formulaire de contact
        </p>

      </div>
    </div>
  `
}
