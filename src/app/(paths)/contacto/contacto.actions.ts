"use server";

import { sendContactFormBrevoTemplateEmail } from "@/app/libs/utils/email.utils";
import { emailEsValido } from "@/app/libs/utils/strings.utils";

// ─── Verificación Turnstile ───────────────────────────────────────────────────

async function verificarTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.error("[Turnstile] TURNSTILE_SECRET_KEY no está definida.");
    return false;
  }

  if (!token) return false;

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, response: token }),
      },
    );

    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch (error) {
    console.error("[Turnstile] Error al verificar token:", error);
    return false;
  }
}

// ─── Server Action ────────────────────────────────────────────────────────────

export async function enviarFormularioContacto({
  nombre,
  correo,
  telefono,
  mensaje,
  turnstileToken,
}: {
  nombre: string;
  correo: string;
  telefono: string;
  mensaje: string;
  turnstileToken: string;
}): Promise<{ status: number; message: string }> {
  // Verificar Turnstile antes de procesar cualquier dato
  const esHumano = await verificarTurnstile(turnstileToken);
  if (!esHumano) {
    return {
      status: 400,
      message: "No se pudo verificar que usted es un humano. Por favor, intente nuevamente.",
    };
  }

  if (!nombre?.trim()) {
    return { status: 400, message: "El nombre completo es requerido." };
  }

  if (!correo?.trim()) {
    return { status: 400, message: "El correo electrónico es requerido." };
  }

  if (!emailEsValido(correo)) {
    return {
      status: 400,
      message: "El correo electrónico no tiene un formato válido.",
    };
  }

  if (!mensaje?.trim()) {
    return { status: 400, message: "El mensaje es requerido." };
  }

  if (mensaje.trim().length < 20) {
    return {
      status: 400,
      message: "El mensaje debe tener al menos 20 caracteres.",
    };
  }

  const datos = {
    nombre: nombre.trim(),
    correo: correo.trim().toLowerCase(),
    telefono: telefono?.trim() || null,
    mensaje: mensaje.trim(),
    fechaEnvio: new Date().toISOString(),
  };

  const envio = await sendContactFormBrevoTemplateEmail(datos);

  if (!envio.ok) {
    return {
      status: 500,
      message: envio.error,
    };
  }

  return {
    status: 200,
    message:
      "Su mensaje ha sido recibido exitosamente. Nos comunicaremos con usted a la brevedad posible.",
  };
}

