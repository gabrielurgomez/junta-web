---
name: accessibility
description: Quality assurance for web accessibility and usability, particularly for users with disabilities. Use when involved in any web project.
license: MIT
metadata:
  author: conesible.de
  version: "0.3"
---

# Skill: Accesibilidad Web (WCAG)

Este _skill_ define los lineamientos, heurísticas y responsabilidades de auditoría y generación de código del agente al manejar componentes de interfaz de usuario para el proyecto de la "Junta Regional de Calificación de Invalidez de Santander".

## Enfoque Desde el Inicio

Construir un proyecto web con accesibilidad en mente desde el principio es crucial, especialmente en contextos donde el testeo manual por humanos es limitado. Retrofitting de accesibilidad después es mucho más costoso y complejo. Adopta un enfoque _accessibility-first_ en cualquier tarea de desarrollo, con documentación exhaustiva de los requisitos en curso. Asegúrate de que los estándares de accesibilidad más allá de lo descrito en este skill se entiendan e implementen correctamente en todo momento. Si eso no es posible y estás trabajando en una base de código existente, haz sugerencias cuidadosas para refactorizar el código que aún no sea accesible. Este proceso debe comenzar tan pronto como los déficits sean aparentes, y para ello es necesario entender y documentar las intenciones del usuario y las restricciones de la aplicación.

## Meta Principal

Debes garantizar que cualquier componente o documento web analizado/creado alcance y mantenga un nivel de conformidad **WCAG 2.1 / 2.2 nivel AA**.

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
- **Tamaño de Área Táctil:** Recuerda la regla WCAG para tamaños de área táctil. Todo debe ser fácilmente alcanzable. Los controles de ratón o gestos (como arrastrar) requieren una alternativa.

### 4. Alternativas en Multimedia

- **Redacción de Imágenes:** Las etiquetas `<img>` y los componentes de Next.js como `<Image>` siempre requieren de un atributo `alt`. Mantén el texto alt corto y conciso; no hay límite de caracteres, pero debe ser descriptivo.
- **Anulación Asistida:** Si una imagen forma parte únicamente de la decoración o diseño puramente estético y no entrega contexto adicional, impón el uso de la directiva `alt=""` para que los lectores de pantalla puedan saltarla debidamente.
- **Audio/Video:** Proporciona transcripciones o subtítulos para contenido de audio/video. Si no puedes generarlos de forma confiable, documenta esto como una tarea requerida y bloqueante para otro mantenedor.

### 5. Tolerancias de Color y Contraste

- **Proporciones Racionales:** Supervisa todo el tiempo el contraste de los colores de texto y fondo para asegurar su legibilidad. Exige el uso de pares de colores que cuenten con un ratio de contraste mínimo de `4.5:1` para texto normal y de `3:1` para texto en negritas o de gran tamaño. La fórmula es: `(L1 + 0.05) / (L2 + 0.05)` donde L1 es la luminancia del color más claro y L2 la del más oscuro. Verifica también los estados hover, focus y disabled.
- **Independencia del Color:** No transmitas estado, avisos o urgencias confiando únicamente en el color. Asegúrate de añadir iconografía o texto de apoyo (por ejemplo, un texto de error junto a un borde rojo).
- Respeta obligatoriamente los _Design Tokens_ de la aplicación y documenta su correcta aplicación inclusiva en contraste.

---

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

> **Nota importante:** Este skill no constituye una conciencia plena de todo lo que es importante para desarrollar de forma accesible. Si tienes dudas, documéntalo siempre y consulta únicamente recursos oficiales de W3C/WCAG para obtener ayuda.
