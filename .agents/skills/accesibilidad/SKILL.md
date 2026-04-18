# Skill: Accesibilidad Web (WCAG)

Este _skill_ define los lineamientos, heurísticas y responsabilidades de auditoría y generación de código del agente al manejar componentes de interfaz de usuario para el proyecto de la "Junta Regional de Calificación de Invalidez de Santander".

## Meta Principal

Debes garantizar que cualquier componente o documento web analizado/creado alcance y mantenga un nivel de conformidad **WCAG 2.1 / 2.2 nivel AA**.

## Instrucciones y Directrices

Durante tu análisis de código o cuando se te requiera crear nuevos componentes en React/Next.js, debes evaluar afirmativamente y aplicar todos los siguientes puntos:

### 1. HTML Semántico e Identificación de Regiones

- **Estructura Significativa:** Obliga el uso de etiquetas nativas HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`) para definir las diferentes regiones o "landmarks" del sitio web.
- **Jerarquía de Encabezados:** Valida que el orden de los encabezados (`<h1>` a `<h6>`) no contenga saltos (por ejemplo, evitar pasar de `<h2>` directamente a `<h4>` sin un `<h3>` en el medio).
- **Controles Nativos:** Abstente de usar `<div onClick={...}>` o `<span onClick={...}>` para ejecutar interacciones. Usa siempre elementos nativos operables, como `<button>` y `<a>`.

### 2. Pautas sobre Atributos ARIA

- **Elementos Decorativos vs Significativos:** Un botón que consta exclusivamente de un icono SVG o sin texto legible debe poseer siempre un atributo `aria-label` descriptivo o `aria-labelledby`.
- **Estados Reactivos:** Para componentes dinámicos como botones _dropdowns_, acordeones o popovers, aplica estrictamente las especificaciones ARIA, requiriendo de variables o estados del componente para el renderizado de etiquetas como `aria-expanded`, `aria-hidden` y `aria-controls`.
- **Regla de Oro:** "Ningún ARIA es mejor que un mal ARIA". Utilízalo únicamente cuando las alternativas nativas semánticas queden cortas.

### 3. Navegabilidad mediante el Teclado

- **Caminos Lógicos (Tab-order):** Todos los elementos interactivos del DOM deben ser accesibles al presionar la tecla `Tab` en un orden lógico para la lectura.
- **Visibilidad del Foco (Focus-visible):** Cada vez que se enfoque a un elemento con el teclado, debe haber un contorno o indicador netamente claro. Exige y escribe estilos utilizando las utilidades `focus-visible:` de Tailwind CSS (por ejemplo, `focus-visible:ring` o `focus-visible:outline-offset-2`).
- **Operación General:** La funcionalidad activada por ratón debe poder activarse equivalentemente con las teclas de `Espacio` o `Enter`.

### 4. Alternativas en Multimedia

- **Redacción de Imágenes:** Las etiquetas `<img>` y los componentes de Next.js como `<Image>` o `<Imagen>` siempre requieren de un atributo `alt`.
- **Anulación Asistida:** Si una imagen forma parte únicamente de la decoración o diseño puramente estético y no entrega contexto adicional, impón el uso de la directiva `alt=""` para que los lectores de pantalla puedan saltarla debidamente.

### 5. Tolerancias de Color y Contraste

- **Proporciones Racionales:** Supervisa todo el tiempo el contraste de los colores de texto y fondo para asegurar su legibilidad. Exige el uso de pares de colores que cuenten con un ratio de contraste mínimo de `4.5:1` para texto normal y de `3:1` para texto en negritas o de gran tamaño.
- **Independencia del Color:** No transmitas estado, avisos o urgencias confiando únicamente en el color. Asegúrate de añadir iconografía o texto de apoyo (por ejemplo, un texto de error junto a un borde rojo).
- Respeta obligatoriamente los _Design Tokens_ de la aplicación y documenta su correcta aplicación inclusiva en contraste.
