# Instrucciones y Reglas para GitHub Copilot / LLM

Al interactuar con este proyecto, ten en cuenta las siguientes directrices, especialmente en lo que respecta a la accesibilidad del sitio web.

## Accesibilidad Web (WCAG)

El estándar mundial recomendado para la accesibilidad web es el **WCAG (Web Content Accessibility Guidelines)**, desarrollado por el W3C. La meta suele ser alcanzar el nivel de conformidad **AA** (actualmente en sus versiones 2.1 o 2.2).

Cuando generes o modifiques componentes de UI, asegúrate siempre de que el código cumpla con los principios de accesibilidad:

1. **Uso de atributos ARIA:**
   - Asegúrate de que los elementos interactivos que carecen de texto visible (como botones de iconos) tengan atributos `aria-label` descriptivos.
   - Utiliza estados de ARIA adecuadamente (ej. `aria-expanded` para menús desplegables, `aria-hidden="true"` para iconos decorativos, `aria-describedby` para información adicional).

2. **Imágenes accesibles:**
   - Toda etiqueta `<img>` (o el componente `<Image>` de Next.js) debe incluir siempre un atributo `alt`.
   - Si la imagen es únicamente decorativa, proporciona un `alt=""` vacío para que los lectores de pantalla la ignoren.

3. **HTML Semántico:**
   - Prefiere siempre el uso de etiquetas semánticas (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<button>`, `<a>`) por encima de un uso excesivo de `<div>`.
   - Mantén una jerarquía lógica de encabezados (`<h1>`, `<h2>`, `<h3>`), sin saltarte niveles.

4. **Soporte para teclado:**
   - Todo elemento interactivo debe ser navegable usando la tecla `Tab` y debe poder activarse con `Enter` y/o barra espaciadora.
   - Aplica estilos para el estado `focus` que sean claramente visibles (por ejemplo, utilizando las clases `focus-visible:ring` y `focus-visible:outline` de Tailwind CSS).

5. **Contraste y diseño:**
   - Ten en cuenta que los colores del texto contra su fondo deben cumplir con recomendaciones de contraste adecuadas.

## Variables y Design Tokens

6. **Uso de colores y variables del sistema de diseño:**
   - **NUNCA** incrustes colores "hardcodeados" (como por ejemplo valores hexadecimales `#1a4f8f` o colores utilitarios puros de Tailwind como `bg-blue-600` o `text-gray-500` si no se mapean a los tokens del proyecto).
   - En su lugar, debes seguir con estricto rigor las variables de color creadas en `src/app/globals.css` mediante la configuración de Tailwind inline (v4).
   - Usa los prefijos y las clases del tema del proyecto, tales como:
     - `primary` (ej: `text-color-primary-500`, `bg-color-primary`, `var(--color-primary-600)`)
     - `accent` (ej: `text-color-accent`, `bg-color-accent-light`)
     - Semánticas: `color-success`, `color-warning`, `color-error`, `color-info`
     - Texto: `color-text-primary`, `color-text-secondary`, `color-text-tertiary`
     - Superficies: `color-surface`, `color-surface-secondary`, `background`, `foreground`
   - Aplicar estos tokens garantiza que el color fluya bajo el System Design de la Junta, manteniendo siempre coherencia en la UI.
