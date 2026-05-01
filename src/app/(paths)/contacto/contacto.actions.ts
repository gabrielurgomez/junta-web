"use server";

import { sendContactFormBrevoTemplateEmail } from "@/app/libs/utils/email.utils";
import { emailEsValido } from "@/app/libs/utils/strings.utils";

export async function enviarFormularioContacto({
  nombre,
  correo,
  telefono,
  mensaje,
}: {
  nombre: string;
  correo: string;
  telefono: string;
  mensaje: string;
}): Promise<{ status: number; message: string }> {
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
