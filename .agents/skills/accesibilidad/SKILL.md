---
name: accessibility
description: Auditoría y generación de código accesible según WCAG 2.2 AA para React/Next.js con Tailwind CSS. Usa este skill siempre que crees, modifiques o revises componentes de UI, páginas, estilos, formularios, tablas, modales, navegación, imágenes, enlaces, o cualquier elemento que un usuario pueda ver o con el que pueda interactuar. También aplica cuando se hagan revisiones de código (code review) que involucren cambios visuales o de interacción.
---

# Skill: Accesibilidad Web (WCAG)

Este skill define los lineamientos y responsabilidades de auditoría y generación de código accesible para el proyecto de la "Junta Regional de Calificación de Invalidez de Santander".

Para ejemplos de implementación detallados, consulta `references/examples.md`.

## Enfoque Desde el Inicio

Adopta un enfoque _accessibility-first_ en cualquier tarea de desarrollo. Retrofitting de accesibilidad después es mucho más costoso. Si estás trabajando en una base de código existente, haz sugerencias para refactorizar el código que aún no sea accesible tan pronto como los déficits sean aparentes.

## Meta Principal

Garantiza que cualquier componente o documento web alcance y mantenga un nivel de conformidad **WCAG 2.2 nivel AA**. Este sitio es utilizado por personas con discapacidad visual, motriz y cognitiva; cada decisión de diseño e implementación debe tener eso en cuenta.

## Instrucciones y Directrices

### 0. Comentarios de Código con Referencias WCAG

Añade comentarios de código que expliquen las implementaciones de accesibilidad, referenciando el criterio WCAG específico y el flujo esperado del usuario. Ver ejemplo en `references/examples.md#1-comentarios-wcag`.

### 1. HTML Semántico e Identificación de Regiones

- **Estructura Significativa:** Usa etiquetas nativas HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`) para definir landmarks.
- **Jerarquía de Encabezados:** Valida que el orden de encabezados (`<h1>` a `<h6>`) no contenga saltos. Cada página debe tener un único `<h1>`.
- **Controles Nativos:** No uses `<div onClick>` o `<span onClick>` para interacciones. Usa `<button>`, `<a>`, `<select>`, `<details>`, `<dialog>`. Si se necesitan componentes personalizados, sigue los patrones ARIA APG.
- **Semántica de Formularios:**
  - Todo `<input>`, `<textarea>` o `<select>` debe tener `<label>` vinculada por `id`. Si no puede ser visible, usar `aria-label`.
  - Usar `<form>` con `onSubmit`, no `<div>`. El botón primario debe tener `type="submit"`.
  - Usar `<fieldset>` y `<legend>` para agrupar campos relacionados.
  - Comunicar errores con texto (no solo color). Evitar `disabled`; hacer controles invisibles en su lugar.
- **Texto de Enlace Descriptivo:** Evita "aquí", "clic", "Continuar Leyendo".
- **Tablas de Datos:** Usa `<th>` con `scope` para hacer claras las relaciones en datos tabulares.

### 2. Pautas sobre Atributos ARIA

- **Elementos con solo ícono:** Deben tener `aria-label` o `aria-labelledby`. Íconos decorativos llevan `aria-hidden="true"`.
- **Estados Reactivos:** Componentes dinámicos (dropdowns, acordeones, popovers) deben usar `aria-expanded`, `aria-hidden`, `aria-controls` vinculados a estados del componente.
- **Regla de Oro:** "Ningún ARIA es mejor que un mal ARIA". Solo usarlo cuando los elementos nativos no alcancen. Documentar la elección.
- **`tabindex`:** Solo valores negativos para elementos enfocables personalizados. Confiar en el orden del DOM para tabulación.

### 3. Navegabilidad mediante el Teclado

- **Tab-order:** Todos los elementos interactivos accesibles con `Tab` en orden lógico.
- **Focus-visible:** Indicador de foco claro con `focus-visible:ring` o `focus-visible:outline-offset-2`. Nunca `outline: none` sin alternativa.
- **Operación General:** Toda funcionalidad de ratón debe activarse con `Espacio` o `Enter`.
- **Área Táctil (WCAG 2.5.8 AA):** Mínimo 24×24 CSS px, preferido 44×44 px. Controles de arrastre requieren alternativa de un solo puntero o teclado (WCAG 2.5.7 AA).

### 4. Alternativas en Multimedia

- **Imágenes:** `<img>` y `<Image>` de Next.js siempre con `alt` descriptivo. Decorativas con `alt=""`.
- **Audio/Video:** Proporcionar transcripciones o subtítulos. Si no es posible, documentar como tarea pendiente.

### 5. Tolerancias de Color y Contraste

- **Texto (WCAG 1.4.3 AA):** Ratio `4.5:1` para texto normal, `3:1` para texto grande (≥18pt / ≥14pt negrita). Fórmula: `(L1 + 0.05) / (L2 + 0.05)`. Verificar en todos los estados: normal, hover, focus, active, visited.
- **Componentes UI (WCAG 1.4.11 AA):** Bordes de inputs, íconos significativos, indicadores de estado: ratio `3:1` contra fondo adyacente.
- **Indicador de Foco (WCAG 2.4.13 AA):** Contorno ≥2px CSS, ratio `3:1` entre estado enfocado y sin enfocar.
- **Independencia del Color (WCAG 1.4.1 A):** No transmitir estado solo con color. Añadir iconografía, texto o patrones.
- **Alto Contraste:** Verificar que la UI funcione con `forced-colors: active` (Windows).
- Respetar los Design Tokens de la aplicación.

---

### 6. Lectores de Pantalla (Screen Readers)

Este sitio es utilizado por personas con discapacidad visual que dependen de NVDA, JAWS, VoiceOver y TalkBack. Cada componente debe auditarse desde la perspectiva de un usuario que no ve la pantalla.

#### 6.1 Orden de Lectura y Secuencia Significativa

- **WCAG 1.3.2 (A):** El orden del DOM debe ser el orden lógico de lectura. No usar CSS (`order`, `flex`, `grid`) para reordenar si crea discrepancia con el DOM.
- Verificar que sin CSS la página sea legible en el orden correcto.

#### 6.2 Texto sr-only

Usar `sr-only` de Tailwind para contexto adicional solo para lectores de pantalla. Obligatorio en: botones con solo íconos, encabezados visualmente obvios, indicadores de estado solo visuales. Ver ejemplo en `references/examples.md#2-texto-sr-only`.

#### 6.3 Regiones ARIA Live

Cambios de contenido sin recarga de página deben anunciarse al lector de pantalla:

- `aria-live="polite"` / `role="status"` — actualizaciones no urgentes
- `aria-live="assertive"` / `role="alert"` — solo errores críticos
- El contenedor `aria-live` debe existir en el DOM **antes** de que el contenido aparezca
- Usar `aria-atomic="true"` cuando el anuncio deba leerse completo
- No poner live regions en componentes que se remontan frecuentemente

Ver ejemplo en `references/examples.md#3-regiones-aria-live`.

#### 6.4 Gestión del Foco en Interacciones Dinámicas

- **Modales:** Mover foco al primer elemento enfocable al abrir. Devolver al elemento disparador al cerrar. Preferir `<dialog>` nativo.
- **Navegación Next.js:** `<Link>` no mueve el foco automáticamente en App Router. Implementar mecanismo de anuncio de ruta. Ver patrón en `references/examples.md#4-route-announcer`.
- **Expandir/Colapsar:** El botón de control mantiene el foco; el contenido expandido queda en el orden del DOM.
- **Toasts:** Nunca mover foco a un toast. Usar `role="status"` o `role="alert"`.

#### 6.5 Nombres Accesibles

Cada elemento interactivo debe tener nombre accesible claro. Precedencia: `aria-labelledby` → `aria-label` → contenido de texto → `title`. Dos botones no deben tener el mismo nombre si realizan acciones diferentes. Ver ejemplo en `references/examples.md#5-nombres-accesibles`.

#### 6.6 Pruebas con Lectores de Pantalla

Antes de entregar un componente complejo, verificar mentalmente:

1. ¿El usuario sabe en qué página está? (`<title>` + `<h1>`)
2. ¿Puede saltar al contenido principal? (skip link)
3. ¿Todos los controles tienen nombre accesible?
4. ¿Los cambios dinámicos son anunciados?
5. ¿El flujo del teclado es lógico y no queda atrapado?

---

### 7. Tipografía y Legibilidad

#### 7.1 Escalado y Redimensionamiento

- **WCAG 1.4.4 (AA):** Texto redimensionable hasta 200% sin pérdida. Usar `rem`, `em`, `%`. Nunca `px` para texto de contenido.
- **WCAG 1.4.10 (AA):** Sin scroll horizontal en 320px de ancho. Usar Flexbox/Grid, evitar anchos fijos.
- **WCAG 1.4.12 (AA):** El contenido debe sobrevivir estos espaciados: línea `1.5×`, párrafo `2×`, letras `0.12em`, palabras `0.16em`. Los contenedores no pueden tener `height` fijo que corte texto.

Ver ejemplo de altura fija vs min-height en `references/examples.md#6-altura-fija-vs-min-height`.

#### 7.2 Elección Tipográfica

- Fuentes sans-serif legibles (Inter, Roboto, Lato). No decorativas para contenido.
- Tamaño mínimo: contenido principal ≥16px (1rem), secundario ≥14px (0.875rem).
- Longitud de línea: 60–80 caracteres (`max-width: 65ch`).
- No usar solo itálicas para enfatizar contenido crítico.

#### 7.3 Texto sobre Fondos Complejos

- Evitar texto sobre imágenes sin overlay de contraste.
- Verificar contraste en el peor punto sobre gradientes.
- Nunca usar imágenes de texto; siempre texto HTML real.

---

### 8. Criterios Nuevos Exclusivos de WCAG 2.2

#### 8.1 Focus Not Obscured — 2.4.11 (AA)

El elemento enfocado no debe quedar completamente cubierto por headers sticky, banners o chats flotantes. Usar `scroll-margin-top` para compensar. Ver ejemplo en `references/examples.md#7-focus-not-obscured`.

#### 8.2 Focus Appearance — 2.4.13 (AA)

Contorno ≥2px CSS, ratio ≥3:1 entre enfocado y sin enfocar. Nunca eliminar con `outline: none`. Ver ejemplo en `references/examples.md#8-focus-appearance`.

#### 8.3 Target Size — 2.5.8 (AA)

Área de activación mínima 24×24 CSS px. Si el control es menor, el espacio alrededor debe completar 24px. Usar `padding` para ampliar sin cambiar tamaño visual.

#### 8.4 Dragging Movements — 2.5.7 (AA)

Toda funcionalidad de arrastre debe tener alternativa de un solo puntero o de teclado.

#### 8.5 Consistent Help — 3.2.6 (A)

Mecanismos de ayuda (contacto, chat, PQRS) deben aparecer en el mismo lugar relativo en todas las páginas.

#### 8.6 Redundant Entry — 3.3.7 (A)

En formularios multi-etapa, no pedir la misma información más de una vez (excepto seguridad).

#### 8.7 Accessible Authentication — 3.3.8 (AA)

No requerir pruebas cognitivas (CAPTCHA visual) sin alternativa. Nunca deshabilitar `autocomplete` en campos de autenticación.

---

### 9. Accesibilidad Cognitiva y Diseño Inclusivo

- **Lenguaje claro:** Frases cortas, voz activa, vocabulario accesible. Evitar jerga legal sin definir.
- **Instrucciones visibles:** Los requisitos de campos deben ser visibles **antes** del envío, no solo en mensajes de error.
- **Prevención de errores (WCAG 3.3.4 AA):** Permitir revisar y corregir antes de confirmación final.
- **Tiempo suficiente (WCAG 2.2.1 A):** Avisar antes de expirar sesión y permitir extender.
- **Sin destellos (WCAG 2.3.1 A):** Ningún contenido debe destellar más de 3 veces por segundo.
- **Consistencia de navegación (WCAG 3.2.3 AA):** Navbar, footer y navegación en el mismo orden en todas las páginas.
- **Identificación de errores (WCAG 3.3.1 A):** Identificar el campo con error y describir el problema en texto.
- **Sugerencias de corrección (WCAG 3.3.3 AA):** Proporcionar corrección conocida (ej: "El formato debe ser DD/MM/AAAA").
- **Gestión del foco en errores:** Mover foco al primer campo inválido o resumen de errores al inicio del formulario.
- **Vinculación programática:** Usar `aria-describedby` para vincular errores al campo, `aria-invalid="true"` para marcar campos inválidos. Validación en tiempo real con `aria-live="polite"`.

Ver ejemplo de vinculación de errores en `references/examples.md#9-errores-formulario`.

### 10. Estados de Carga (Loading States)

- Usar `aria-live="polite"` con `role="status"` para anunciar estados de carga.
- Spinners y skeletons deben tener `aria-label` descriptivo y `role="status"`.
- Nunca mover el foco a un indicador de carga.
- Botones con estado de carga: cambiar texto (ej: "Enviar" → "Enviando...") en vez de solo deshabilitar. Si se deshabilita, usar `aria-disabled="true"` con texto de estado.
- Contenedores de carga: usar `aria-busy="true"` mientras cargan.

Ver ejemplo en `references/examples.md#10-estados-de-carga`.

---

### 11. Documentos Descargables (PDFs y Archivos)

- Los PDFs deben ser **PDFs etiquetados** (tagged PDFs), no escaneos de imagen sin OCR.
- Indicar formato y tamaño en el texto del enlace: "Resolución 123 (PDF, 245 KB)".
- Si un PDF no puede hacerse accesible, proporcionar alternativa HTML.
- Si abre en nueva pestaña, indicarlo claramente (ver sección 12).

Ver ejemplo en `references/examples.md#11-enlaces-pdfs`.

---

### 12. Enlaces Externos y Nuevas Ventanas

- Siempre que se use `target="_blank"`, informar al usuario con texto visible o `sr-only`.
- Incluir `rel="noopener noreferrer"` en enlaces con `target="_blank"`.
- No abrir en nueva ventana salvo razón justificada.
- Usar patrón visual/semántico consistente para enlaces externos en todo el sitio.

Ver ejemplo en `references/examples.md#12-enlaces-externos`.

---

### 13. Tablas Responsivas

- No convertir `<table>` en divs con CSS para móviles (destruye la semántica).
- Scroll horizontal: contenedor con `overflow-x: auto`, `tabindex="0"`, `role="region"` y `aria-label`.
- Si se usa reflow a tarjetas, mantener asociación encabezado-dato.
- Nunca usar `display: block` en `<table>`, `<tr>`, `<td>` sin roles ARIA compensatorios.

Ver ejemplo en `references/examples.md#13-tablas-responsivas`.

---

### 14. Componentes de Terceros (Embeds e Iframes)

- Todo `<iframe>` debe tener `title` descriptivo.
- Mapas interactivos: alternativa textual con dirección + enlace directo.
- Captchas: ofrecer alternativa accesible. No deshabilitar `autocomplete`. Verificar navegación por teclado.
- Videos embebidos: controles accesibles por teclado. Proporcionar transcripciones/subtítulos.
- Widgets de chat flotante: no bloquear foco, operable por teclado, cerrable con `Escape`.

Ver ejemplo en `references/examples.md#14-iframes-alternativas`.

---

## Mantenimiento Continuo y Anti-Patrones

La accesibilidad requiere evaluación continua. Trata las verificaciones como un requisito en cada cambio.

### Prácticas Clave

- **Alt en cada imagen nueva.** Decorativas con `alt=""`. Íconos con etiqueta + `aria-hidden="true"`.
- **Contraste en cada cambio de UI.** Verificar cada color nuevo contra directrices WCAG.
- **Estructura de encabezados y landmarks.** Mantener jerarquía lógica al añadir contenido.
- **Re-evaluación con cada cambio.** Incorporar pruebas automatizadas en CI/CD.

### Testing Automatizado

Las herramientas detectan ~30-40% de los problemas. El resto requiere prueba manual.

**Herramientas recomendadas:**

| Herramienta                    | Uso                   | Alcance                            |
| ------------------------------ | --------------------- | ---------------------------------- |
| `eslint-plugin-jsx-a11y`       | Linting en desarrollo | Errores de ARIA y semántica en JSX |
| `axe-core` / `@axe-core/react` | Testing en navegador  | Auditoría del DOM renderizado      |
| `pa11y`                        | CI/CD                 | Verificación en cada PR/build      |
| Lighthouse                     | Auditoría manual      | Puntuación general                 |

**Checklist de prueba manual mínima por componente:**

1. Navegar usando solo teclado (Tab, Enter, Escape, flechas)
2. Verificar indicador de foco visible en todo momento
3. Recorrer con lector de pantalla
4. Zoom al 200% — verificar que nada se corte
5. Probar con `prefers-reduced-motion: reduce` activado

### Anti-Patrones a Evitar

- `<div>` como botones (`<div onClick>`)
- `onclick` sin manejo de teclado
- `outline: none` sin indicador de foco alternativo
- `aria-label` reemplazando `<label>` visible
- `role="button"` en enlaces (`<a>`)
- Interacciones solo con ratón o gestos sin alternativa

---

## TODOs Adicionales

- **`lang` en `<html>`:** Usar `lang="es-CO"`.
- **`<title>`:** Dinámico por ruta (en Next.js App Router, via `metadata` de cada `page.tsx`).
- **Skip Links:** Antes de navegación y grupos grandes (≥5) de contenido. Solo visibles al enfocar. "Saltar [cosa]".
- **`prefers-reduced-motion`:** Distinguir animaciones esenciales (spinner) de decorativas (parallax). Solo eliminar las decorativas. Ver implementación CSS y hook en `references/examples.md#15-reduced-motion-css` y `references/examples.md#16-reduced-motion-hook`.
- **Reflow:** Contenido debe reorganizarse correctamente al cambiar viewport o zoom.
- **Comunicación en el equipo:** Se requieren pruebas humanas y evaluación continua por diseñadores.
- **Nunca mencionar accesibilidad en la UI.**
- **`prefers-color-scheme` (modo oscuro):** Si se implementa, verificar contrastes en ambos esquemas. Indicadores de foco, bordes y estados interactivos visibles en ambos modos. Design Tokens con variantes. Respetar `prefers-color-scheme` del sistema.

---

## Referencias Normativas

| Recurso                        | URL                                                                   |
| ------------------------------ | --------------------------------------------------------------------- |
| WCAG 2.2 (oficial W3C)         | https://www.w3.org/TR/WCAG22/                                         |
| Understanding WCAG 2.2         | https://www.w3.org/WAI/WCAG22/Understanding/                          |
| ARIA Authoring Practices Guide | https://www.w3.org/WAI/ARIA/apg/                                      |
| Accessible Name Computation    | https://www.w3.org/TR/accname-1.2/                                    |
| WebAIM Contrast Checker        | https://webaim.org/resources/contrastchecker/                         |
| Forced Colors / High Contrast  | https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors |

> **Nota importante:** Este skill no constituye una conciencia plena de todo lo que es importante para desarrollar de forma accesible. Si tienes dudas, documéntalo y consulta únicamente los recursos oficiales de W3C/WCAG listados arriba.
