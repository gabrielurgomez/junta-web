import { logger } from "./src/app/libs/utils/logger.utils";

export const BREVO_API_KEY = process.env.BREVO_API_KEY;
export const EMAIL_DESTINO_FORMULARIO_CONTACTO =
  process.env.EMAIL_DESTINO_FORMULARIO_CONTACTO;
/** Remitente verificado en Brevo (obligatorio para SMTP transaccional). */
export const BREVO_CONTACT_SENDER_EMAIL =
  process.env.BREVO_CONTACT_SENDER_EMAIL;
export const NEXT_PUBLIC_TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
export const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

if (!BREVO_API_KEY) {
  logger({
    level: "error",
    message: "Missing required env var: BREVO_API_KEY",
  });
}
if (!EMAIL_DESTINO_FORMULARIO_CONTACTO) {
  logger({
    level: "error",
    message: "Missing required env var: EMAIL_DESTINO_FORMULARIO_CONTACTO",
  });
}
if (!BREVO_CONTACT_SENDER_EMAIL) {
  logger({
    level: "error",
    message: "Missing required env var: BREVO_CONTACT_SENDER_EMAIL",
  });
}
if (!NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
  logger({
    level: "error",
    message: "Missing required env var: NEXT_PUBLIC_TURNSTILE_SITE_KEY",
  });
}

if (!TURNSTILE_SECRET_KEY) {
  logger({
    level: "error",
    message: "Missing required env var: TURNSTILE_SECRET_KEY",
  });
}
