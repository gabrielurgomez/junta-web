---
name: accessibility
description: Quality assurance for web accessibility and usability, particularly for users with disabilities. Use when involved in any web project.
license: MIT
metadata:
  author: conesible.de
  version: "0.4"
---

# Skill: Accesibilidad Web (WCAG)

Este _skill_ define los lineamientos, heurísticas y responsabilidades de auditoría y generación de código del agente al manejar componentes de interfaz de usuario para el proyecto de la "Junta Regional de Calificación de Invalidez de Santander".

## Enfoque Desde el Inicio

Construir un proyecto web con accesibilidad en mente desde el principio es crucial, especialmente en contextos donde el testeo manual por humanos es limitado. Retrofitting de accesibilidad después es mucho más costoso y complejo. Adopta un enfoque _accessibility-first_ en cualquier tarea de desarrollo, con documentación exhaustiva de los requisitos en curso. Asegúrate de que los estándares de accesibilidad más allá de lo descrito en este skill se entiendan e implementen correctamente en todo momento. Si eso no es posible y estás trabajando en una base de código existente, haz sugerencias cuidadosas para refactorizar el código que aún no sea accesible. Este proceso debe comenzar tan pronto como los déficits sean aparentes, y para ello es necesario entender y documentar las intenciones del usuario y las restricciones de la aplicación.

## Meta Principal

Debes garantizar que cualquier componente o documento web analizado/creado alcance y mantenga un nivel de conformidad **WCAG 2.2 nivel AA**. Este sitio es utilizado por personas con discapacidad visual, motriz y cognitiva; cada decisión de diseño e implementación debe tener eso en cuenta de forma explícita.

## Instrucciones y Directrices

Durante tu análisis de código o cuando se te requiera crear nuevos componentes en React/Next.js, debes evaluar afirmativamente y aplicar todos los siguientes puntos:

### 0. Comentarios de Código con Referencias WCAG

Añade comentarios de código de forma liberal que expliquen las implementaciones realizadas específicamente para accesibilidad. En ellos, explica en base a los requisitos WCAG 2.2 de cualquier nivel. Explica el flujo esperado del usuario si es relevante.

**Ejemplo:**
```tsx
{/* WCAG 2.1 — 1.3.1 Info and Relationships (Level A):
    Se usa <nav> como landmark para que los lectores de pantalla
    puedan saltar directamente a la navegación principal.
    Flujo esperado: usuario con lector de pantalla navega con
    tecla 'R' para saltar entre regiones. */}
<nav aria-label="Navegación principal">
```

### 1. HTML Semántico e Identificación de Regiones

- **Estructura Significativa:** Obliga el uso de etiquetas nativas HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`) para definir las diferentes regiones o "landmarks" del sitio web.
- **Jerarquía de Encabezados:** Valida que el orden de los encabezados (`<h1>` a `<h6>`) no contenga saltos (por ejemplo, evitar pasar de `<h2>` directamente a `<h4>` sin un `<h3>` en el medio). Cada página debe tener un único `<h1>`.
- **Controles Nativos:** Abstente de usar `<div onClick={...}>` o `<span onClick={...}>` para ejecutar interacciones. Usa siempre elementos nativos operables, como `<button>` y `<a>`. Usa elementos nativos como `<select>`, `<details>` o `<dialog>` cuando existan. Si no hay forma de evitar componentes personalizados, sigue los patrones de diseño ARIA establecidos y los modelos de interacción por teclado.
- **Semántica de Formularios e Inputs:**
  - Todo campo `<input>`, `<textarea>` o `<select>` debe tener una etiqueta descriptiva visible mediante `<label>` vinculada por `id`. Si por diseño no puede ser visible, debe tener un atributo `aria-label` descriptivo.
  - Los formularios interactivos (como búsquedas o captación de información) deben utilizar el contenedor semántico `<form>` con atributos nativos apropiados como `action` o manejadores `onSubmit`, evitando envoltorios `<div>` sin semántica.
  - El botón primario de un `<form>` debe siempre tener `type="submit"` (en lugar de `type="button"`) para garantizar que el comportamiento por defecto de "presionar la tecla Enter para enviar" funcione mediante los estándares nativos del navegador.
  - Usa `<fieldset>` y `<legend>` para agrupar campos de formulario relacionados.
  - En formularios, comunica claramente los errores (no solo por color), los requisitos y el estado de un componente. Evita usar el estado `disabled` por completo; los controles deben ser invisibles en su lugar.
- **Texto de Enlace Descriptivo:** Evita textos de enlace como "aquí", "clic" o "Continuar Leyendo". Si son requeridos visualmente, añade un mecanismo redundante para recibir su contenido y retíralos del árbol de accesibilidad.
- **Tablas de Datos:** Usa encabezados de tabla (`<th>` con atributos `scope`) para hacer claras las relaciones en datos tabulares para los lectores de pantalla.

### 2. Pautas sobre Atributos ARIA

- **Elementos Decorativos vs Significativos:** Un botón que consta exclusivamente de un icono SVG o sin texto legible debe poseer siempre un atributo `aria-label` descriptivo o `aria-labelledby`. Para iconos, añade siempre una etiqueta correspondiente y usa `aria-hidden="true"` para el contenido solo visual.
- **Estados Reactivos:** Para componentes dinámicos como botones _dropdowns_, acordeones o popovers, aplica estrictamente las especificaciones ARIA, requiriendo de variables o estados del componente para el renderizado de etiquetas como `aria-expanded`, `aria-hidden` y `aria-controls`.
- **Regla de Oro:** "Ningún ARIA es mejor que un mal ARIA". Utilízalo únicamente cuando las alternativas nativas semánticas queden cortas. Si lo usas, documenta esta elección y el razonamiento detrás de ella.
- **`tabindex`:** Solo añade `tabindex` para elementos enfocables personalizados y únicamente con valores negativos. Para el orden de tabulación, confía siempre en el orden del DOM.

### 3. Navegabilidad mediante el Teclado

- **Caminos Lógicos (Tab-order):** Todos los elementos interactivos del DOM deben ser accesibles al presionar la tecla `Tab` en un orden lógico para la lectura.
- **Visibilidad del Foco (Focus-visible):** Cada vez que se enfoque a un elemento con el teclado, debe haber un contorno o indicador netamente claro. Exige y escribe estilos utilizando las utilidades `focus-visible:` de Tailwind CSS (por ejemplo, `focus-visible:ring` o `focus-visible:outline-offset-2`). Nunca usar `outline: none` sin alternativa visible.
- **Operación General:** La funcionalidad activada por ratón debe poder activarse equivalentemente con las teclas de `Espacio` o `Enter`.
- **Tamaño de Área Táctil (WCAG 2.2 — 2.5.8 AA):** El área táctil mínima de cualquier control interactivo debe ser de **24×24 CSS px**. El tamaño objetivo preferido es 44×44 px (nivel AAA). Si el tamaño del control es menor, debe haber suficiente espacio alrededor para alcanzar ese mínimo. Los controles de ratón o gestos (como arrastrar) requieren siempre una alternativa de un solo puntero o teclado (WCAG 2.2 — 2.5.7 AA).

### 4. Alternativas en Multimedia

- **Redacción de Imágenes:** Las etiquetas `<img>` y los componentes de Next.js como `<Image>` siempre requieren de un atributo `alt`. Mantén el texto alt corto y conciso; no hay límite de caracteres, pero debe ser descriptivo.
- **Anulación Asistida:** Si una imagen forma parte únicamente de la decoración o diseño puramente estético y no entrega contexto adicional, impón el uso de la directiva `alt=""` para que los lectores de pantalla puedan saltarla debidamente.
- **Audio/Video:** Proporciona transcripciones o subtítulos para contenido de audio/video. Si no puedes generarlos de forma confiable, documenta esto como una tarea requerida y bloqueante para otro mantenedor.

### 5. Tolerancias de Color y Contraste

- **Contraste de Texto (WCAG 1.4.3 AA):** Ratio mínimo de `4.5:1` para texto normal y `3:1` para texto grande (≥18pt / ≥14pt negrita). La fórmula es: `(L1 + 0.05) / (L2 + 0.05)` donde L1 es la luminancia del color más claro. Verifica **todos** los estados: normal, hover, focus, active y visited. El texto sobre imágenes o gradientes debe verificarse en el peor punto de contraste.
- **Contraste de Componentes de UI y Elementos Gráficos (WCAG 1.4.11 AA):** Los bordes de inputs, íconos significativos, indicadores de estado (checkboxes, radios, toggles) y otros elementos gráficos que transmiten información deben tener un ratio mínimo de `3:1` contra su fondo adyacente. Esto también aplica a los bordes de campos de formulario.
- **Contraste del Indicador de Foco (WCAG 2.4.11 / 2.4.13 — WCAG 2.2 AA):** El indicador de foco debe tener un área mínima de contorno igual al perímetro del componente × 2px CSS, y un ratio de contraste de `3:1` entre el estado con foco y el estado sin foco. Nunca usar `outline: none` sin un reemplazo que cumpla este criterio.
- **Independencia del Color (WCAG 1.4.1 A):** No transmitas estado, avisos o urgencias confiando únicamente en el color. Añade iconografía, texto o patrones de apoyo (por ejemplo, un ícono de error `⚠` junto a un borde rojo y el texto del error).
- **Modo de Alto Contraste:** Asegúrate de que la UI funcione correctamente bajo el Modo de Alto Contraste de Windows (`forced-colors: active`). Los bordes, íconos y textos deben seguir siendo distinguibles.
- Respeta obligatoriamente los _Design Tokens_ de la aplicación y documenta su correcta aplicación inclusiva en contraste.

---

### 6. Lectores de Pantalla (Screen Readers)

Este sitio es utilizado activamente por personas con discapacidad visual que dependen de tecnologías de asistencia como NVDA, JAWS, VoiceOver (macOS/iOS) y TalkBack (Android). Cada componente debe ser auditado mentalmente desde la perspectiva de un usuario que **no ve la pantalla**.

#### 6.1 Orden de Lectura y Secuencia Significativa

- **WCAG 1.3.2 — Meaningful Sequence (A):** El orden en que el DOM presenta el contenido debe ser el mismo orden lógico de lectura. Nunca uses CSS (`order`, `flex`, `grid`) para reordenar visualmente el contenido si eso crea una discrepancia con el orden del DOM que confunda a un lector de pantalla.
- Verifica que al eliminar CSS la página siga siendo legible en el orden correcto.
- En Next.js App Router, presta atención a cómo se renderizan los Server Components: el HTML resultante debe tener sentido secuencialmente.

#### 6.2 Texto Solo para Lectores de Pantalla (`sr-only`)

Usa la clase utilitaria `sr-only` (o equivalente Tailwind `sr-only`) para proporcionar contexto adicional que solo los lectores de pantalla necesitan, sin afectar el diseño visual. Es obligatorio en los siguientes casos:

- Botones con solo íconos: `<button><Icon /><span className="sr-only">Cerrar menú</span></button>`
- Encabezados de secciones que son visualmente obvias pero necesitan una etiqueta para el árbol de accesibilidad.
- Indicadores de estado que se comunican solo con color o forma.

```tsx
{/* WCAG 2.2 — 1.3.1 Info and Relationships (A):
    El texto sr-only proporciona el nombre accesible del botón
    ya que el ícono SVG por sí solo no tiene semántica. */}
<button type="button" aria-label="Cerrar">
  <XIcon aria-hidden="true" />
  <span className="sr-only">Cerrar</span>
</button>
```

#### 6.3 Regiones ARIA Live (Contenido Dinámico)

Cualquier cambio de contenido que ocurra **sin recarga de página** debe ser anunciado al lector de pantalla mediante regiones live:

- **`aria-live="polite"`:** Para actualizaciones no urgentes (mensajes de éxito, resultados de búsqueda, notificaciones). El lector de pantalla anuncia el cambio cuando termina de leer lo que estaba leyendo.
- **`aria-live="assertive"`:** Solo para mensajes de error críticos o alertas urgentes. Interrumpe al lector de pantalla inmediatamente. Usar con extrema cautela.
- **`role="status"`** y **`role="alert"`** son atajos semánticos para `aria-live="polite"` y `aria-live="assertive"` respectivamente.

```tsx
{/* WCAG 2.2 — 4.1.3 Status Messages (AA):
    El mensaje de éxito se anuncia automáticamente al lector
    de pantalla sin requerir que el foco se mueva al elemento. */}
<div role="status" aria-live="polite" aria-atomic="true">
  {mensaje && <p>{mensaje}</p>}
</div>
```

**Reglas para live regions:**
- El contenedor `aria-live` debe existir en el DOM **antes** de que el contenido aparezca; no lo montes dinámicamente.
- Usa `aria-atomic="true"` cuando el anuncio deba leerse completo (no en fragmentos).
- Usa `aria-relevant="additions text"` si solo deben anunciarse adiciones de texto.
- Nunca pongas live regions en componentes que se remontan frecuentemente; esto dispara anuncios falsos.

#### 6.4 Gestión del Foco en Interacciones Dinámicas

- **Modales/Diálogos:** Al abrir un modal, mueve el foco al primer elemento enfocable dentro de él. Al cerrarlo, devuelve el foco al elemento que lo disparó. Usa el elemento nativo `<dialog>` que gestiona esto automáticamente, o implementa un _focus trap_ manualmente.
- **Navegación entre páginas (Next.js):** Al navegar con `<Link>`, Next.js no mueve el foco automáticamente en App Router. Implementa un mecanismo para anunciar el cambio de página al lector de pantalla (por ejemplo, moviendo el foco al `<h1>` de la nueva página o usando un `aria-live` region de anuncio de ruta).
- **Contenido que se expande/colapsa:** Cuando un acordeón o dropdown se expande, el foco no debe saltar inesperadamente. El botón de control mantiene el foco; el contenido expandido queda disponible en el orden del DOM a continuación.
- **Toasts y Notificaciones:** Nunca muevas el foco a un toast. Usa `role="status"` o `role="alert"` para que sea anunciado sin interrumpir el flujo del usuario.

#### 6.5 Nombres Accesibles de Elementos (Accessible Name Computation)

Cada elemento interactivo debe tener un nombre accesible claro. El orden de precedencia para calcularlo es:

1. `aria-labelledby` (referencia a otro elemento visible)
2. `aria-label` (texto explícito, solo si no hay alternativa visible)
3. Contenido de texto nativo del elemento
4. Atributo `title` (último recurso, no confiable en todos los lectores)

Verifica siempre que el nombre accesible sea descriptivo y único dentro de la página. Dos botones no deben tener el mismo nombre si realizan acciones diferentes.

```tsx
{/* WCAG 2.2 — 4.1.2 Name, Role, Value (A):
    aria-labelledby referencia el texto visible del encabezado
    de la sección, asociando la tabla a su contexto. */}
<section aria-labelledby="tabla-dictamenes-titulo">
  <h2 id="tabla-dictamenes-titulo">Dictámenes recientes</h2>
  <table aria-labelledby="tabla-dictamenes-titulo">
    ...
  </table>
</section>
```

#### 6.6 Pruebas con Lectores de Pantalla

Antes de entregar cualquier componente complejo, documenta el flujo esperado con un lector de pantalla. Al menos verifica mentalmente:

1. ¿El usuario sabe en qué página está? (`<title>` + `<h1>`)
2. ¿Puede saltar a la zona de contenido principal? (skip link)
3. ¿Todos los controles tienen nombre accesible?
4. ¿Los cambios dinámicos son anunciados?
5. ¿El flujo del teclado es lógico y no queda atrapado?

---

### 7. Tipografía y Legibilidad

La tipografía accesible es crítica para usuarios con baja visión, dislexia, o dificultades cognitivas.

#### 7.1 Escalado y Redimensionamiento de Texto

- **WCAG 1.4.4 — Resize Text (AA):** El texto debe ser redimensionable hasta el **200% sin pérdida de contenido ni funcionalidad**. Usa **unidades relativas** (`rem`, `em`, `%`) para tamaños de fuente y espaciados. Nunca fijes tamaños de fuente en `px` para texto de contenido.
- **WCAG 1.4.10 — Reflow (AA):** El contenido debe presentarse sin scroll horizontal en viewports de **320px CSS de ancho** (equivalente a 400% de zoom en una pantalla de 1280px). Usa layouts flexibles (Flexbox, CSS Grid) y evita contenedores con ancho fijo que rompan el reflow.
- **WCAG 1.4.12 — Text Spacing (AA):** El contenido no debe perder información ni funcionalidad si el usuario aplica los siguientes espaciados de texto:
  - Altura de línea: `1.5` veces el tamaño de fuente
  - Espaciado entre párrafos: `2` veces el tamaño de fuente
  - Espaciado entre letras: `0.12em`
  - Espaciado entre palabras: `0.16em`

  Esto implica que los contenedores de texto no pueden tener alturas fijas (`height`) que corten el texto desbordado.

```css
/* ❌ Incorrecto — altura fija que corta el texto al aumentar espaciado */
.card-description {
  height: 48px;
  overflow: hidden;
}

/* ✓ Correcto — altura mínima que permite crecer */
.card-description {
  min-height: 48px;
}
```

#### 7.2 Elección Tipográfica

- **Fuentes legibles:** Usa fuentes sans-serif bien diseñadas (Inter, Roboto, Lato, Open Sans). Evita fuentes decorativas o de fantasía para texto de contenido.
- **Tamaño mínimo de fuente:** El texto de contenido principal no debe ser menor a `16px` (1rem). Texto secundario no menor a `14px` (0.875rem). Evita texto de `12px` o menor excepto para metadata muy secundaria.
- **Peso de fuente:** Asegúrate de que el peso de fuente (`font-weight`) refuerce la jerarquía visual y el contraste. El texto en negritas (≥700) sobre fondos tiene requisito de contraste de `3:1` (texto grande).
- **No uses solo itálicas para enfatizar** contenido crítico; combina con color o negritas que también cumplan contraste.
- **Longitud de línea:** Mantén entre 60–80 caracteres por línea para facilitar la lectura (usa `max-width: 65ch` en bloques de texto).

#### 7.3 Texto sobre Imágenes y Fondos Complejos

- Evita texto sobre imágenes sin una capa de contraste intermedia (overlay de color sólido o semitransparente).
- Si se usa texto sobre gradiente, verifica el contraste en el punto de menor diferencia (el peor caso).
- Nunca uses imágenes de texto (`<img>` con texto renderizado); siempre usa texto HTML real con CSS.

---

### 8. Criterios Nuevos Exclusivos de WCAG 2.2

Estos criterios no existían en WCAG 2.1 y deben aplicarse en todo componente nuevo.

#### 8.1 Focus Not Obscured — 2.4.11 (AA) y 2.4.12 (AAA)

- **2.4.11 (AA):** Cuando un elemento recibe el foco mediante teclado, no debe quedar **completamente** cubierto por otro componente (por ejemplo, un header pegajoso, un banner de cookies, un chat flotante).
- **2.4.12 (AAA — objetivo aspiracional):** El elemento enfocado no debe quedar **parcialmente** cubierto.
- Implementación: usa `scroll-margin-top` en elementos enfocables para compensar headers fijos. Verifica que los elementos sticky no tapen al elemento que recibe el foco al tabular.

```css
/* WCAG 2.2 — 2.4.11 Focus Not Obscured (AA):
   Compensa la altura del navbar sticky (64px) para que el
   elemento enfocado no quede tapado al recibir el foco. */
:focus-visible {
  scroll-margin-top: 80px;
}
```

#### 8.2 Focus Appearance — 2.4.13 (AA)

El indicador de foco debe cumplir **todos** estos requisitos simultáneamente:

- El área del indicador debe encerrar el componente con un contorno de al menos **2px CSS**.
- El ratio de contraste entre el indicador enfocado y sin enfocar debe ser al menos **3:1**.
- El indicador no debe ser reducido o eliminado por `outline: none`.

```tsx
{/* WCAG 2.2 — 2.4.13 Focus Appearance (AA):
    Indicador de foco visible, con contraste suficiente (anillo
    de 2px azul sobre fondo blanco = ratio ~4.5:1). */}
// En Tailwind CSS v4:
// focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
```

#### 8.3 Target Size (Minimum) — 2.5.8 (AA)

- Todos los controles interactivos deben tener un área de activación mínima de **24×24 CSS px**.
- Si el control es más pequeño, el espacio sin obstruir alrededor debe completar esos 24px.
- Excepción: controles cuyo tamaño es determinado por el agente de usuario (inputs nativos) o texto en línea.
- En la práctica: botones de íconos, controles de formulario y enlaces deben verificarse. Usa `padding` para ampliar el área táctil sin cambiar el tamaño visual.

#### 8.4 Dragging Movements — 2.5.7 (AA)

- Toda funcionalidad que use movimiento de arrastre (drag & drop, sliders de rango, reordenar listas) debe tener una alternativa de **un solo puntero** (un clic) o de teclado.
- Ejemplo: un slider que permite arrastrar también debe permitir hacer clic en un punto del track para saltar al valor, y ser controlable con flechas del teclado.

#### 8.5 Consistent Help — 3.2.6 (A)

- Si el sitio proporciona mecanismos de ayuda (número de contacto, chat, enlace de ayuda, formulario PQRS), deben aparecer en el **mismo lugar relativo** en todas las páginas.
- Aplica especialmente al footer y a secciones de "Atención al usuario". El orden y la ubicación de esos elementos deben ser consistentes entre rutas.

#### 8.6 Redundant Entry — 3.3.7 (A)

- En procesos de múltiples pasos (formularios multi-etapa), no se debe pedir al usuario que ingrese la misma información más de una vez, a menos que sea por razones de seguridad.
- Si se requiere re-ingreso (como confirmar contraseña), es aceptable. Para otros campos, rellena automáticamente o muestra la información previamente ingresada.

#### 8.7 Accessible Authentication — 3.3.8 (AA)

- Los procesos de autenticación no deben requerir que el usuario realice una prueba cognitiva (como reconocer caracteres deformados en un CAPTCHA) a menos que se proporcione una alternativa.
- Alternativas aceptables: audio CAPTCHA, soporte de autocompletado del navegador (no deshabilitar `autocomplete`), autenticación por enlace de email.
- **Nunca deshabilites `autocomplete` en campos de autenticación** (WCAG 1.3.5 — Identify Input Purpose).

---

### 9. Accesibilidad Cognitiva y Diseño Inclusivo

Las personas con discapacidades cognitivas, de atención o de memoria también son usuarias de este sitio. Aplica estos principios:

- **Lenguaje claro y simple:** Usa frases cortas, voz activa y vocabulario del nivel de lectura del público objetivo. Evita jerga legal sin definir.
- **Instrucciones visibles:** Los requisitos de campos de formulario (formato, longitud, caracteres permitidos) deben ser visibles **antes** de que el usuario intente enviar, no solo en mensajes de error.
- **Prevención de errores (WCAG 3.3.4 AA):** Para acciones importantes (enviar formulario, confirmar pago), permite al usuario revisar y corregir antes de la confirmación final.
- **Tiempo suficiente (WCAG 2.2.1 A):** Si una sesión expira, avisa al usuario con anticipación y permite extender el tiempo. Nunca expira una sesión sin advertencia durante una tarea activa.
- **Sin destellos (WCAG 2.3.1 A):** Ningún contenido debe destellar más de 3 veces por segundo (puede causar convulsiones fotosensibles).
- **Consistencia de navegación (WCAG 3.2.3 AA):** El navbar, footer y elementos de navegación deben aparecer en el mismo orden relativo en todas las páginas.
- **Identificación de errores (WCAG 3.3.1 A):** Los errores en formularios deben identificar específicamente el campo con error y describir el problema en texto (no solo con color ni icono).
- **Sugerencias de corrección (WCAG 3.3.3 AA):** Si se detecta un error y se conoce la corrección, proporciónala (por ejemplo: "El formato de fecha debe ser DD/MM/AAAA").

## Mantenimiento Continuo y Anti-Patrones

Lograr la accesibilidad no es una tarea única: requiere evaluación continua a medida que el proyecto evoluciona. Trata las verificaciones de accesibilidad como un requisito continuo cada vez que se añada contenido o funcionalidades.

### Prácticas Clave a Mantener

- **Alt en cada imagen nueva:** Cada vez que se añada una imagen u otro medio, es obligatorio proporcionar texto `alt` (o marcarla como decorativa con `alt=""`). Para iconos, añade siempre una etiqueta correspondiente y usa `aria-hidden="true"` para el contenido solo visual.
- **Contraste en cada cambio de UI:** Cada vez que se introduzca un color nuevo (para texto, fondos, iconos, botones, etc.) o se cambien estilos de diseño, verifica que el contraste de color cumpla las directrices WCAG.
- **Estructura de encabezados y landmarks:** Al añadir nuevo contenido o páginas, asegúrate de que la jerarquía de encabezados permanezca lógica (sin saltar niveles arbitrariamente) y de que se usen elementos de sección donde corresponda.
- **Re-evaluación con cada cambio:** Incorpora pruebas automatizadas (como Pa11y) en los conjuntos de pruebas de regresión para que cada build las ejecute.

### Anti-Patrones a Evitar

- `<div>` usados como botones (`<div onClick>`)
- `onclick` sin manejo de teclado correspondiente
- `outline: none` sin un indicador de foco alternativo
- `aria-label` como reemplazo de etiquetas visuales (no en lugar de `<label>`)
- `role="button"` en enlaces externos (`<a>`)
- Cualquier interacción que solo funcione con ratón o gestos sin alternativa

---

## TODOs Adicionales

Los siguientes son requisitos que deben verificarse y mantenerse en el proyecto:

- **`lang` en `<html>`:** El elemento `<html>` requiere un atributo `lang` (así como cualquier bloque de texto —no palabras sueltas— en un idioma extranjero). El valor para este proyecto es `lang="es-CO"`.
- **Elemento `<title>`:** Los elementos `<title>` son un requisito. Entiende dónde en el proyecto se añaden (en Next.js App Router, en el `metadata` de cada `page.tsx`) y cámbialo dinámicamente según el contenido de cada ruta.
- **Skip Links:** Implementa skip links antes de cada bloque que no sea contenido (por ejemplo, justo antes de la navegación) que solo sean visibles una vez enfocados. También añade skip links antes de grupos grandes (≥ 5) de contenido posiblemente irrelevante, como carruseles. Llámalos "Saltar [cosa]", por ejemplo "Saltar navegación". Asegúrate de que permanezcan correctos cuando cambie la estructura.
- **`prefers-reduced-motion`:** Maneja y respeta la media query `prefers-reduced-motion`. Cualquier animación o transición debe reducirse o eliminarse cuando el usuario la solicite.
- **Reflow:** Todo el contenido debe reorganizarse correctamente cuando cambie el tamaño del viewport o el nivel de zoom.
- **Comunicación en el equipo:** Comunica claramente dentro de la organización del proyecto y la documentación que se requieren pruebas humanas y que los flujos de usuario deben ser evaluados continuamente por los diseñadores.
- **Nunca mencionar accesibilidad en la UI:** En la interfaz de usuario, nunca menciones la accesibilidad directamente al usuario final.

---

## Referencias Normativas

| Recurso | URL |
|---|---|
| WCAG 2.2 (oficial W3C) | https://www.w3.org/TR/WCAG22/ |
| Understanding WCAG 2.2 | https://www.w3.org/WAI/WCAG22/Understanding/ |
| ARIA Authoring Practices Guide | https://www.w3.org/WAI/ARIA/apg/ |
| Accessible Name Computation | https://www.w3.org/TR/accname-1.2/ |
| WebAIM Contrast Checker | https://webaim.org/resources/contrastchecker/ |
| Forced Colors / High Contrast | https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors |

> **Nota importante:** Este skill no constituye una conciencia plena de todo lo que es importante para desarrollar de forma accesible. Si tienes dudas, documéntalo siempre y consulta únicamente los recursos oficiales de W3C/WCAG listados arriba. No uses fuentes de terceros como fuente de verdad para requisitos WCAG.
