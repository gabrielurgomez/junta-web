import {
  BREVO_API_KEY,
  BREVO_CONTACT_SENDER_EMAIL,
  EMAIL_DESTINO_FORMULARIO_CONTACTO,
} from "../../../../.config";
import { logger } from "./logger.utils";

const BREVO_SMTP_URL = "https://api.brevo.com/v3/smtp/email";
/** Plantilla transaccional creada en Brevo (Contacto). */
const CONTACT_TEMPLATE_ID = 1;

export type ContactFormEmailInput = {
  nombre: string;
  correo: string;
  telefono: string | null;
  mensaje: string;
  fechaEnvio: string;
};

export type SendContactTemplateResult =
  | { ok: true; messageId?: string }
  | { ok: false; error: string };

function buildTemplateParams(
  input: ContactFormEmailInput,
): Record<string, string> {
  return {
    NOMBRE: input.nombre,
    CORREO: input.correo,
    CELULAR: input.telefono?.trim() ? input.telefono.trim() : "—",
    MENSAJE: input.mensaje,
  };
}

/**
 * Envía un correo transaccional usando la plantilla de Brevo indicada por
 * {@link CONTACT_TEMPLATE_ID}, con parámetros en mayúsculas para el editor.
 */
export async function sendContactFormBrevoTemplateEmail(
  input: ContactFormEmailInput,
): Promise<SendContactTemplateResult> {
  if (!BREVO_API_KEY?.trim()) {
    return {
      ok: false,
      error: "No está configurada la clave de API de Brevo (BREVO_API_KEY).",
    };
  }

  const toEmail = EMAIL_DESTINO_FORMULARIO_CONTACTO?.trim();
  if (!toEmail) {
    return {
      ok: false,
      error:
        "No está configurado el correo de destino (EMAIL_DESTINO_FORMULARIO_CONTACTO).",
    };
  }

  const senderEmail = BREVO_CONTACT_SENDER_EMAIL?.trim();
  if (!senderEmail) {
    return {
      ok: false,
      error:
        "No está configurado el remitente (BREVO_CONTACT_SENDER_EMAIL). Debe ser un remitente verificado en Brevo.",
    };
  }

  const senderName = "Página web — Contacto";

  // Sanitización de nombre para evitar inyección en cabeceras (CRLF)
  const sanitizedName = input.nombre
    .replace(/[\r\n\t]/g, " ")
    .trim()
    .substring(0, 100);

  // Sanitización estricta del correo (CRLF y espacios)
  const sanitizedEmail = input.correo
    .replace(/[\r\n\t\s]/g, "")
    .substring(0, 100);

  const body = {
    sender: { email: senderEmail, name: senderName },
    to: [{ email: toEmail }],
    replyTo: { email: sanitizedEmail, name: sanitizedName },
    templateId: CONTACT_TEMPLATE_ID,
    params: buildTemplateParams(input),
  };

  try {
    const res = await fetch(BREVO_SMTP_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": BREVO_API_KEY.trim(),
      },
      body: JSON.stringify(body),
    });

    const raw = await res.text();
    type BrevoSmtpJson = { messageId?: string; code?: string; message?: string };
    let parsed: BrevoSmtpJson | null = null;
    try {
      parsed = raw ? (JSON.parse(raw) as BrevoSmtpJson) : null;
    } catch {
      parsed = null;
    }

    if (!res.ok) {
      const detail =
        parsed?.message ?? (raw ? raw.slice(0, 200) : `HTTP ${res.status}`);
      logger({
        level: "error",
        message: `[Brevo] sendTransacEmail failed: ${res.status} ${parsed?.code ?? ""} ${detail}`,
      });
      return {
        ok: false,
        error:
          "No se pudo enviar el mensaje en este momento. Intente más tarde o utilice otro canal de contacto.",
      };
    }

    return { ok: true, messageId: parsed?.messageId };
  } catch (e) {
    logger({
      level: "error",
      message: `[Brevo] sendTransacEmail exception: ${e instanceof Error ? e.message : String(e)}`,
    });
    return {
      ok: false,
      error: "No se pudo enviar el mensaje en este momento. Intente más tarde.",
    };
  }
}
