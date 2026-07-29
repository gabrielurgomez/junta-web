# Auditoría de Seguridad — Checklist Pendiente

> **Fecha de auditoría:** 28 de julio de 2026
> **Alcance:** Todo el repositorio `junta-web` (Next.js 16.2.4, App Router, despliegue en Railway).
> **Contexto:** Sitio institucional mayormente estático, **sin autenticación ni base de datos**. La única superficie de ataque dinámica es el formulario de contacto (`/contacto`), implementado con una Server Action que verifica Cloudflare Turnstile y envía correo vía la API de Brevo.

---

## 1. Resumen ejecutivo

El proyecto tiene una base de seguridad razonable para su tamaño: la validación del formulario se repite en el servidor, el CAPTCHA se verifica del lado del servidor, los secretos no están versionados y no hay uso de `dangerouslySetInnerHTML` ni HTML inyectado. Originalmente había **tres brechas de alto riesgo**; la primera (Next.js vulnerable) ya está resuelta. Quedan pendientes: no existe ningún header de seguridad HTTP (ni CSP, ni HSTS, ni anti-clickjacking), y la Server Action de contacto no tiene rate limiting, lo que permite abuso del envío de correos y agotamiento de la cuota/costo de Brevo.

| Riesgo   | Pendientes |
| -------- | ---------- |
| 🔴 Alto  | 2          |
| 🟡 Medio | 6          |
| 🟢 Bajo  | 6          |

---

## 2. Checklist de pendientes

### 🔴 Riesgo ALTO

- [x] **A1. Actualizar Next.js a `>= 16.2.6`.** ✅ Completado (28-jul-2026): `next` y `eslint-config-next` actualizados de `16.2.4` a `16.2.12`. Adicionalmente se forzaron vía `pnpm.overrides` en `package.json` las versiones de `postcss` (`8.5.24`) y `sharp` (`0.35.1`), transitivas de `next`, que también estaban vulnerables. `pnpm audit --prod` ahora reporta **"No known vulnerabilities found"** (antes: 27, 14 altas). Verificado con `tsc --noEmit`, `pnpm lint`, `pnpm build` (8/8 páginas estáticas generadas con Next.js 16.2.12/Turbopack) y smoke test HTTP de `/` y `/contacto` (ambas 200, sin errores en logs).

- [ ] **A2. Configurar headers de seguridad HTTP.** `next.config.ts` está vacío: el sitio no envía **ningún** header de seguridad. Faltan como mínimo:
  - `Content-Security-Policy` (idealmente con nonce; debe permitir `https://challenges.cloudflare.com` para el widget de Turnstile en `script-src` y `frame-src`).
  - `Strict-Transport-Security` (HSTS) — crítico para un sitio de una entidad pública que maneja datos de contacto de ciudadanos.
  - `X-Frame-Options: DENY` / `frame-ancestors 'none'` (anti-clickjacking; relevante porque la página de pagos enlaza a pasarelas externas y es objetivo natural de phishing por superposición).
  - `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` restrictiva.
  - **Acción:** definir la función `headers()` en `next.config.ts` (ver documentación local en `node_modules/next/dist/docs/` sobre CSP y headers).

- [ ] **A3. Rate limiting en la Server Action `enviarFormularioContacto`.** Hoy no hay ningún límite por IP ni por ventana de tiempo. Turnstile mitiga bots simples, pero existen granjas de resolución de CAPTCHA; un atacante puede automatizar envíos y (a) agotar la cuota o generar costos en Brevo, (b) inundar el buzón `EMAIL_DESTINO_FORMULARIO_CONTACTO` (denegación de servicio del canal de atención al ciudadano), (c) usar el `replyTo` para spam indirecto.
  - **Acción:** limitar por IP (p. ej. 3–5 envíos por 10 minutos) leyendo `x-forwarded-for` vía `headers()` de `next/headers`. Con 1 réplica en Railway basta un limitador en memoria (LRU); si se escala a más réplicas, usar un almacén compartido (p. ej. Upstash/Redis).

### 🟡 Riesgo MEDIO

- [ ] **M1. Protección DDoS / WAF delante de Railway.** Railway no incluye WAF ni mitigación DDoS de capa 7 comparable a un CDN. Al ya usar Cloudflare (Turnstile), lo natural es poner el dominio detrás del **proxy de Cloudflare** (DNS naranja): WAF gestionado, rate limiting a nivel de borde, caché de estáticos y ocultamiento de la IP de origen de Railway.

- [ ] **M2. Timeouts en los `fetch` salientes.** Ni `verificarTurnstile` ni `sendContactFormBrevoTemplateEmail` usan timeout. Si Cloudflare o Brevo responden lento, las peticiones quedan colgadas ocupando conexiones del servidor (amplifica un DoS).
  - **Acción:** agregar `signal: AbortSignal.timeout(10_000)` a ambos `fetch`.

- [ ] **M3. Endurecer la verificación de Turnstile.** En `siteverify` no se envía `remoteip` ni se valida el `hostname`/`action` de la respuesta. Sin validar `hostname`, un token resuelto en otro sitio que use la misma site key (o en un entorno de pruebas) podría aceptarse.
  - **Acción:** enviar `remoteip` y validar `data.hostname` contra el dominio de producción.

- [ ] **M4. Riesgo de inyección HTML en la plantilla de Brevo.** `buildTemplateParams` pasa `NOMBRE`, `MENSAJE`, etc. sin sanitizar al template transaccional (ID 1). Si la plantilla inserta los params en contexto HTML sin escape, un atacante puede inyectar HTML/enlaces de phishing en el correo que recibe el personal de la Junta (los correos "internos" generan confianza).
  - **Acción:** verificar en Brevo que la plantilla escapa los parámetros; si no, escapar `<`, `>`, `&`, `"` en `buildTemplateParams` antes de enviar.

- [ ] **M5. Auditoría de dependencias en CI.** Los workflows actuales (`eslint.yml`, `prettier.yml`, `typecheck.yml`) no incluyen seguridad. Las vulnerabilidades de A1 llevaban tiempo detectables.
  - **Acción:** agregar un workflow con `pnpm audit --prod --audit-level=high` y habilitar **Dependabot/Renovate** (alertas y PRs de actualización automáticas en GitHub).

- [ ] **M6. Validación estructural de la entrada de la Server Action.** Las Server Actions son endpoints HTTP públicos: cualquiera puede invocarlas con payloads arbitrarios (tipos inesperados, campos extra). La validación actual es manual y asume strings. Funciona, pero es frágil ante cambios.
  - **Acción:** validar el payload con un esquema (p. ej. `zod`) al inicio de `enviarFormularioContacto`, rechazando tipos incorrectos antes de cualquier procesamiento.

### 🟢 Riesgo BAJO

- [ ] **B1. `poweredByHeader: false` en `next.config.ts`.** Hoy el sitio expone `X-Powered-By: Next.js` (facilita fingerprinting de la versión del framework).
- [ ] **B2. Publicar `/.well-known/security.txt`** (RFC 9116) con un contacto para reportes de vulnerabilidades — buena práctica esperada en entidades públicas.
- [ ] **B3. Agregar `robots.txt` y revisar qué hay en `public/documentos/`** para confirmar que ningún documento contiene datos personales que no deban indexarse.
- [ ] **B4. Deduplicación / anti-doble-envío en servidor.** El cliente bloquea reenvíos mientras `estadoEnvio === "enviando"`, pero el servidor no; un mismo token Turnstile no es reutilizable (mitiga), aun así un idempotency-key simple evitaría correos duplicados por reintentos.
- [ ] **B5. Log de errores de Brevo también en producción.** En `email.utils.ts` el detalle del fallo solo se registra si `NODE_ENV === "development"`; en producción los fallos de envío quedan invisibles en los logs de Railway (dificulta detectar abuso o caídas del canal). Registrar el error (sin datos personales) siempre.
- [ ] **B6. Réplica única sin healthcheck.** `railway.json` define 1 réplica y no configura healthcheck; ante un DoS parcial o crash-loop la disponibilidad depende solo de `restartPolicyType: ON_FAILURE`. Configurar healthcheck y evaluar 2 réplicas si el sitio es crítico.

### No aplica (por ahora)

- **Autenticación / sesiones / cookies:** el sitio no tiene login, panel de administración, cookies ni datos de sesión, así que no hay superficie que auditar. Si en el futuro se agrega un área administrativa, usar una librería establecida (Auth.js, Better Auth o similar), cookies `HttpOnly; Secure; SameSite=Lax`, y proteger las rutas en el layout/página del segmento (no confiar solo en middleware, ver bypass de A1).
- **SQL/NoSQL injection:** no hay base de datos.
- **Subida de archivos:** no existe.
- **CORS:** no hay API routes; las Server Actions de Next.js ya validan el header `Origin` contra el `Host` por defecto.

---

## 3. Revisión de lo ya implementado

| Elemento                                                             | Estado          | Observación                                                                                                                                                   |
| -------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Verificación de Turnstile **en el servidor** antes de procesar datos | ✅ Bien         | Orden correcto (CAPTCHA primero). Mejorable con `remoteip` y validación de `hostname` (M3).                                                                   |
| Validación de entradas duplicada cliente + servidor                  | ✅ Bien         | Límites de longitud (100/20/1000) y formato de email revalidados en la Server Action; el servidor no confía en el cliente. Mejorable con esquema tipado (M6). |
| Sanitización anti **CRLF injection** en `replyTo` (nombre y correo)  | ✅ Bien         | `email.utils.ts` elimina `\r\n\t` y recorta a 100 caracteres antes de armar el correo. Falta el equivalente para los params del template (M4).                |
| Destinatario del correo **fijo por configuración**                   | ✅ Bien         | El usuario no controla el `to`; imposible usar el formulario como relay de spam directo.                                                                      |
| Mensajes de error **genéricos hacia el usuario**                     | ✅ Bien         | Los detalles de fallos de Brevo/Turnstile no se filtran al cliente; solo van a logs.                                                                          |
| Secretos vía variables de entorno, `.env` en `.gitignore`            | ✅ Bien         | Verificado: `.env` no está rastreado por git. Ningún secreto usa prefijo `NEXT_PUBLIC_` salvo la site key de Turnstile, que es pública por diseño.            |
| Regex de email (`emailEsValido`)                                     | ✅ Bien         | Patrón lineal sin backtracking anidado; sin riesgo de ReDoS.                                                                                                  |
| Enlaces externos con `target="_blank"`                               | ✅ Bien         | Todos llevan `rel="noopener noreferrer"` (`Normatividad.tsx`, `CanalesPago.client.tsx`).                                                                      |
| Sin `dangerouslySetInnerHTML`, `eval` ni HTML dinámico               | ✅ Bien         | Todo el contenido se renderiza vía JSX (escape automático de React).                                                                                          |
| Logger estructurado (JSON)                                           | ✅ Aceptable    | `JSON.stringify` neutraliza inyección de logs. Mejorar cobertura en producción (B5).                                                                          |
| `console.error` con detalle de excepciones en `verificarTurnstile`   | ⚠️ Mejorar      | Corre también en producción y sin formato JSON; unificar con `logger` y no volcar el objeto `error` completo.                                                 |
| `next.config.ts`                                                     | ❌ Insuficiente | Vacío: sin headers de seguridad (A2) ni `poweredByHeader: false` (B1).                                                                                        |
| CI (`.github/workflows`)                                             | ⚠️ Mejorar      | Solo lint/format/typecheck; sin auditoría de dependencias ni Dependabot (M5).                                                                                 |
| Versión de Next.js                                                   | ✅ Corregido    | Actualizado a 16.2.12 con overrides de `postcss`/`sharp`; `pnpm audit --prod` limpio (A1 completado).                                                         |

---

## 4. Orden de implementación sugerido

1. **A1** — actualizar Next.js (menor esfuerzo, mayor reducción de riesgo inmediata).
2. **A2 + B1** — headers de seguridad y `poweredByHeader` en el mismo cambio de `next.config.ts`.
3. **A3 + M2** — rate limiting y timeouts en la Server Action (mismo archivo).
4. **M5** — workflow de `pnpm audit` + Dependabot, para que A1 no vuelva a ocurrir.
5. **M1** — proxy de Cloudflare delante de Railway.
6. **M3, M4, M6** — endurecimiento del flujo de contacto.
7. **B2–B6** — mejoras de higiene.
