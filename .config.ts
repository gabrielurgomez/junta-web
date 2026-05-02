import { logger } from "./src/app/libs/utils/logger.utils";

export const BREVO_API_KEY = process.env.BREVO_API_KEY;
export const EMAIL_DESTINO_FORMULARIO_CONTACTO =
  process.env.EMAIL_DESTINO_FORMULARIO_CONTACTO;
/** Remitente verificado en Brevo (obligatorio para SMTP transaccional). */
export const BREVO_CONTACT_SENDER_EMAIL =
  process.env.BREVO_CONTACT_SENDER_EMAIL;

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

export const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
