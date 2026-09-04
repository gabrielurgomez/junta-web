# Seguridad — Medidas Implementadas

> **Última actualización:** 3 de septiembre de 2026
> **Alcance:** Repositorio `junta-web` (Next.js 16.2.12, App Router, despliegue en Railway).
> **Documento complementario:** los pendientes por implementar están en [`TODO/auditoria-seguridad-checklist-pendiente.md`](../TODO/auditoria-seguridad-checklist-pendiente.md). Este archivo documenta únicamente **lo que ya está aplicado**.

## Contexto del sistema

El sitio es institucional y **estático**: las 5 rutas públicas (`/`, `/contacto`, `/entidad`, `/normatividad`, `/pagos`) más la página 404 se prerenderizan en build. **No hay autenticación, no hay base de datos y no se almacenan datos de usuarios.** La única superficie de ataque dinámica es la Server Action del formulario de contacto, que es un endpoint POST independiente del renderizado de las páginas.

Esto es en sí mismo la medida de seguridad más importante del proyecto: casi no hay nada que atacar.

---

## 1. Headers de seguridad HTTP

> ⚠️ **Estado: implementado en la rama `security/headers-http` ([PR #10](https://github.com/gabrielurgomez/junta-web/pull/10)), pendiente de merge y despliegue.** Hasta que se mergee, el sitio en producción **no** envía estos headers.

Definidos en [`next.config.ts`](../next.config.ts) mediante la función `headers()`, aplicados a todas las rutas (`/(.*)`).

- [x] **`Content-Security-Policy`** — restringe de dónde puede cargar recursos la página.
  - `default-src 'self'` — por defecto, solo el propio origen.
  - `frame-ancestors 'none'` — **anti-clickjacking**: nadie puede embeber el sitio en un iframe.
  - `form-action 'self'` — los formularios no pueden enviarse a dominios externos.
  - `object-src 'none'` — bloquea `<object>` / `<embed>` (plugins legacy).
  - `base-uri 'self'` — impide reescribir la base de las URLs relativas.
  - Excepción explícita para `https://challenges.cloudflare.com` en `script-src`, `connect-src` y `frame-src`, necesaria para el widget de Turnstile.
  - `upgrade-insecure-requests` **solo en producción** (ver §1.1).
- [x] **`Strict-Transport-Security: max-age=63072000`** (2 años) — fuerza HTTPS. **Solo en producción.**
- [x] **`X-Frame-Options: DENY`** — anti-clickjacking para navegadores que no soportan `frame-ancestors`.
- [x] **`X-Content-Type-Options: nosniff`** — impide que el navegador adivine el tipo MIME.
- [x] **`Referrer-Policy: strict-origin-when-cross-origin`** — no filtra la ruta completa a sitios externos.
- [x] **`Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`** — desactiva APIs del navegador que el sitio no usa.
- [x] **`poweredByHeader: false`** — elimina `X-Powered-By: Next.js`, que facilitaba el fingerprinting de la versión del framework.

### 1.1 Decisiones deliberadas (no cambiar sin leer esto)

- **HSTS sin `includeSubDomains`.** El dominio `jrci.com.co` aloja el correo institucional y podrían existir subdominios (webmail, panel de hosting) sin HTTPS válido. Un error de HSTS **no se puede omitir desde el navegador** y persiste hasta que expire el `max-age`. Agregarlo solo después de inventariar todos los subdominios y confirmar que sirven HTTPS.
- **HSTS sin `preload`.** Misma razón, agravada: la lista de preload va compilada dentro del binario del navegador y salir de ella toma meses.
- **HSTS y `upgrade-insecure-requests` se omiten en desarrollo.** En `localhost` no tienen efecto de todos modos (HSTS se ignora sobre transporte inseguro por RFC 6797 §8.1, y `localhost` es _potentially trustworthy_), pero sí rompen `pnpm dev` servido por IP de LAN para probar en un celular.
- **CSP sin nonces, con `'unsafe-inline'` en `script-src` y `style-src`.** Es una **deuda técnica conocida**, no un descuido: los nonces exigen renderizado dinámico y eliminarían la generación estática de todas las páginas. Revisar si alguna página pasa a ser dinámica en el futuro.

---

## 2. Formulario de contacto (`/contacto`)

Es el único endpoint dinámico del sitio. Implementado como Server Action en [`contacto.actions.ts`](<../src/app/(paths)/contacto/contacto.actions.ts>).

### 2.1 Protección anti-bot

- [x] **Cloudflare Turnstile** como CAPTCHA, vía `@marsidev/react-turnstile`.
- [x] **Verificación del lado del servidor.** El token no se cree por el hecho de existir: la Server Action lo valida contra `https://challenges.cloudflare.com/turnstile/v0/siteverify` antes de procesar nada. Un atacante que llame la Server Action directamente sin token válido es rechazado.
- [x] **La verificación es lo primero que ocurre.** El token se valida **antes** de leer o procesar cualquier dato del formulario, no después.
- [x] **Fail-closed.** Si `TURNSTILE_SECRET_KEY` no está configurada, si Cloudflare responde con error HTTP o si la petición lanza una excepción, la función retorna `false` y el envío se rechaza. Nunca se asume "válido" ante un fallo.

### 2.2 Validación de entrada

- [x] **Toda la validación se repite en el servidor.** Las Server Actions son endpoints HTTP públicos: cualquiera puede invocarlas con payloads arbitrarios. La validación del cliente es solo de usabilidad; la del servidor es la que cuenta.
- [x] **Límites de longitud en servidor:** nombre ≤ 100, correo ≤ 100, teléfono ≤ 20, mensaje entre 20 y 1000 caracteres.
- [x] **Formato de correo validado** en servidor con `emailEsValido()`.
- [x] **Campos obligatorios verificados** con `trim()`, de modo que un valor de solo espacios se rechaza.
- [x] **Espejo en cliente** con `maxLength` en cada input, más `type="email"` y `autoComplete` apropiados.

### 2.3 Prevención de inyección en el correo

En [`email.utils.ts`](../src/app/libs/utils/email.utils.ts):

- [x] **Sanitización CRLF del nombre** (`\r`, `\n`, `\t` → espacio) antes de usarlo como `replyTo.name`. Previene **inyección de cabeceras de correo**, que permitiría añadir destinatarios o cabeceras arbitrarias.
- [x] **Sanitización estricta del correo** (elimina `\r`, `\n`, `\t` y todo espacio) antes de usarlo como `replyTo.email`.
- [x] **Truncado defensivo a 100 caracteres** en ambos campos, redundante con la validación de la Server Action.
- [x] **Plantilla transaccional de Brevo (ID 1)** en lugar de componer HTML en el código: el contenido del mensaje se pasa como parámetros, no como marcado.

### 2.4 Manejo de errores sin fuga de información

- [x] **Mensajes genéricos al usuario.** Ante un fallo de Brevo, el usuario recibe "No se pudo enviar el mensaje en este momento", nunca el detalle del error, el código HTTP ni la respuesta de la API.
- [x] **El detalle solo se registra en desarrollo** (`NODE_ENV === "development"`), de modo que las respuestas de la API de Brevo no acaban en los logs de producción.
- [x] **Validación de configuración antes de operar:** si falta `BREVO_API_KEY`, el remitente o el correo de destino, la función retorna un error controlado en lugar de intentar la petición.
- [x] **Anti-doble-envío en cliente:** el `handleSubmit` retorna temprano si ya hay un envío en curso, y el botón se deshabilita. (En servidor no hay deduplicación; mitiga parcialmente que un token de Turnstile no sea reutilizable.)
- [x] **Logger estructurado en JSON** ([`logger.utils.ts`](../src/app/libs/utils/logger.utils.ts)): `JSON.stringify` neutraliza la inyección de logs.

---

## 3. Gestión de secretos

- [x] **`.env` está en `.gitignore`** y no está versionado. Verificado: el único archivo de entorno en git es `.env.example`.
- [x] **`.env.example` documenta las variables sin valores**, para que nadie tenga que adivinar la configuración.
- [x] **`*.pem` ignorado** en `.gitignore`.
- [x] **Separación servidor/cliente estricta.** Los secretos (`BREVO_API_KEY`, `TURNSTILE_SECRET_KEY`, `BREVO_CONTACT_SENDER_EMAIL`, `EMAIL_DESTINO_FORMULARIO_CONTACTO`) se leen en [`.config.ts`](../.config.ts), que solo se importa desde código de servidor.
- [x] **La única variable expuesta al navegador es `NEXT_PUBLIC_TURNSTILE_SITE_KEY`**, que es pública por diseño. Se lee directamente en el componente cliente y **no** a través de `.config.ts`, precisamente para no arrastrar el módulo de secretos al bundle del navegador — hay un comentario en el código explicando esta decisión.
- [x] **GitGuardian** escanea cada PR en busca de secretos filtrados.

---

## 4. Superficie de ataque reducida

- [x] **Sin `dangerouslySetInnerHTML`, sin `eval()`, sin manipulación de `innerHTML`.** Verificado por búsqueda en todo `src/`: cero ocurrencias. Todo el contenido se renderiza vía JSX, con el escape automático de React.
- [x] **Sin base de datos y sin autenticación** — no hay inyección SQL, no hay sesiones que secuestrar, no hay credenciales de usuario que filtrar.
- [x] **Todos los enlaces externos con `rel="noopener noreferrer"`.** Verificado: los 2 enlaces con `target="_blank"` del sitio ([`CanalesPago.client.tsx`](../src/app/components/CanalesPago.client.tsx), [`Normatividad.tsx`](../src/app/components/Normatividad.tsx)) lo tienen. Previene el ataque de _tabnabbing_ vía `window.opener`.
- [x] **Documentos PDF hospedados localmente** en `public/documentos/`, no enlazados a dominios de terceros.
- [x] **Todas las páginas son estáticas.** Al prerenderizarse en build, ninguna ruta ejecuta lógica de servidor por petición; lo único dinámico es la Server Action de contacto.

---

## 5. Dependencias

- [x] **Next.js actualizado a 16.2.12** (desde 16.2.4, que tenía vulnerabilidades conocidas).
- [x] **Dependencias transitivas vulnerables forzadas vía `pnpm.overrides`** en `package.json`: `postcss` a `8.5.24` y `sharp` a `0.35.1`.
- [x] **Superficie de dependencias mínima:** solo 4 dependencias de producción (`next`, `react`, `react-dom`, `@marsidev/react-turnstile`).
- [x] **`packageManager` fijado con hash SHA-512** en `package.json`, lo que impide que una versión alterada de pnpm ejecute el build.
- [x] **Lockfile versionado** (`pnpm-lock.yaml`), que fija las versiones exactas de todo el árbol.

---

## 6. Controles en integración continua

Workflows en `.github/workflows/`, ejecutados en cada `push` y `pull_request` contra `main`:

- [x] **`typecheck.yml`** — TypeScript en modo estricto.
- [x] **`eslint.yml`** — ESLint con `eslint-config-next`.
- [x] **`prettier.yml`** — formato consistente.
- [x] **GitGuardian** — detección de secretos.
- [x] **Automatizaciones de Cursor** — revisión de código, búsqueda de vulnerabilidades y auditoría de accesibilidad en cada PR.

> **Nota sobre las revisiones automáticas:** son útiles como checklist, no como criterio final. En el PR #10 uno de los bots citó una fuente de documentación que no contenía lo que afirmaba, y otro recomendó activar `preload` en HSTS — un cambio difícil de revertir que en este proyecto sería contraproducente. **Verificar siempre la fuente antes de aplicar lo que sugieran.**

---

## 7. Infraestructura

- [x] **Despliegue en Railway** con HTTPS gestionado ([`railway.json`](../railway.json)).
- [x] **`restartPolicyType: ON_FAILURE`** con hasta 10 reintentos — recuperación automática ante caídas.
- [x] **Una sola réplica** (`numReplicas: 1`), dato relevante para implementar rate limiting en memoria sin necesidad de almacén compartido.

---

## Lo que NO está cubierto

Este documento describe lo aplicado. Los huecos conocidos están en [`TODO/auditoria-seguridad-checklist-pendiente.md`](../TODO/auditoria-seguridad-checklist-pendiente.md). El más importante:

> **Sin rate limiting en la Server Action de contacto.** No hay límite por IP ni por ventana de tiempo. Turnstile frena bots simples, pero existen granjas de resolución de CAPTCHA. Es el único riesgo alto explotable hoy: permite agotar la cuota de Brevo, generar costos e inundar el buzón de atención al ciudadano.

Otros pendientes relevantes: WAF/proxy de Cloudflare delante de Railway, timeouts en los `fetch` salientes, validación del `hostname` en la respuesta de Turnstile, auditoría de dependencias en CI, `security.txt` y `robots.txt`.
