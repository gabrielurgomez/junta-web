import { config } from "dotenv";

config();

export const BREVO_API_KEY = process.env.BREVO_API_KEY;
export const EMAIL_DESTINO_FORMULARIO_CONTACTO =
  process.env.EMAIL_DESTINO_FORMULARIO_CONTACTO;
/** Remitente verificado en Brevo (obligatorio para SMTP transaccional). */
export const BREVO_CONTACT_SENDER_EMAIL =
  process.env.BREVO_CONTACT_SENDER_EMAIL;
