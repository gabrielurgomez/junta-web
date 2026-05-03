/**
 * Validación de variables de entorno al arrancar el servidor.
 * Mantener la lista alineada con `.env.example`.
 *
 * Convención Next.js: https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation
 */
const CLAVES_VARIABLES_ENTORNO = [
  "BREVO_API_KEY",
  "EMAIL_DESTINO_FORMULARIO_CONTACTO",
  "BREVO_CONTACT_SENDER_EMAIL",
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
  "TURNSTILE_SECRET_KEY",
] as const;

function variableDefinidaYNoVacia(clave: string): boolean {
  const valor = process.env[clave];
  return typeof valor === "string" && valor.trim().length > 0;
}

function imprimirResumenVariablesEntorno(): void {
  const reset = "\x1b[0m";
  const verde = "\x1b[32m";
  const rojo = "\x1b[31m";
  const atenuado = "\x1b[2m";

  console.log("");
  console.log(
    `${atenuado}[junta-web] Comprobación de variables de entorno${reset}`,
  );

  let faltantes = 0;

  for (const clave of CLAVES_VARIABLES_ENTORNO) {
    const ok = variableDefinidaYNoVacia(clave);
    if (!ok) faltantes += 1;
    const marca = ok ? `${verde}✓${reset}` : `${rojo}✗${reset}`;
    console.log(`  ${marca} ${clave}`);
  }

  if (faltantes > 0) {
    console.log(
      `${rojo}  → ${faltantes} variable(s) sin definir o vacía(s). Revise la configuración del despliegue.${reset}`,
    );
  }
  console.log("");
}

export function register(): void {
  if (process.env.NEXT_RUNTIME === "edge") {
    return;
  }

  imprimirResumenVariablesEntorno();
}
