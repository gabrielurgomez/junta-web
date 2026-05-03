"use server";
import { TURNSTILE_SECRET_KEY } from "../../../../.config";
import { logger } from "@/app/libs/utils/logger.utils";
import { sendContactFormBrevoTemplateEmail } from "@/app/libs/utils/email.utils";
import { isValidEmail } from "@/app/libs/utils/strings.utils";

// ─── Verificación Turnstile ───────────────────────────────────────────────────

async function verificarTurnstile(token: string): Promise<boolean> {
  if (!TURNSTILE_SECRET_KEY) {
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
        body: JSON.stringify({ secret: TURNSTILE_SECRET_KEY, response: token }),
      },
    );

    const data = (await res.json()) as {
      success: boolean;
      "error-codes"?: string[];
    };

    if (!data.success) {
      logger({
        level: "error",
        message: `[Turnstile] Verificación fallida. Códigos de error: ${data["error-codes"]}`,
      });
    }

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
      message:
        "No se pudo verificar que usted es un humano. Por favor, intente nuevamente.",
    };
  }

  if (!nombre?.trim()) {
    return { status: 400, message: "El nombre completo es requerido." };
  }

  if (nombre.trim().length > 100) {
    return {
      status: 400,
      message: "El nombre no puede exceder 100 caracteres.",
    };
  }

  if (!correo?.trim()) {
    return { status: 400, message: "El correo electrónico es requerido." };
  }

  if (correo.trim().length > 100) {
    return {
      status: 400,
      message: "El correo no puede exceder 100 caracteres.",
    };
  }

  if (!isValidEmail(correo)) {
    return {
      status: 400,
      message: "El correo electrónico no tiene un formato válido.",
    };
  }

  if (telefono && telefono.trim().length > 20) {
    return {
      status: 400,
      message: "El teléfono no puede exceder 20 caracteres.",
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

  if (mensaje.trim().length > 1000) {
    return {
      status: 400,
      message: "El mensaje no puede exceder 1000 caracteres.",
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
