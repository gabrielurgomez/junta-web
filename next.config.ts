import type { NextConfig } from "next";

const esDesarrollo = process.env.NODE_ENV === "development";

const directivasCsp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com${esDesarrollo ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "connect-src 'self' https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  // Se omite en desarrollo: al servir `pnpm dev` por una IP de LAN
  // (p. ej. http://192.168.1.5:3000 para probar en un celular) el navegador
  // intentaría cargar los assets por HTTPS y la página quedaría rota.
  ...(esDesarrollo ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const encabezadosSeguridad = [
  { key: "Content-Security-Policy", value: directivasCsp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

// HSTS solo en producción (los navegadores lo ignoran sobre HTTP de todos modos,
// según RFC 6797 §8.1). Sin `includeSubDomains`: `jrci.com.co` aloja el correo
// institucional y podrían existir subdominios (webmail, panel de hosting) sin
// HTTPS válido; un error de HSTS no se puede omitir desde el navegador y
// persiste hasta que expire `max-age`. Agregarlo solo tras inventariar los
// subdominios y confirmar que todos sirven HTTPS.
if (!esDesarrollo) {
  encabezadosSeguridad.push({
    key: "Strict-Transport-Security",
    value: "max-age=63072000",
  });
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: encabezadosSeguridad,
      },
    ];
  },
};

export default nextConfig;
