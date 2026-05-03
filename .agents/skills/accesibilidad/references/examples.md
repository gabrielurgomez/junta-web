# Ejemplos de Código — Accesibilidad Web

Este archivo contiene los ejemplos de implementación referenciados desde `SKILL.md`. Lee la sección correspondiente cuando se te indique.

---

## Tabla de Contenidos

1. [Comentarios WCAG](#1-comentarios-wcag)
2. [Texto sr-only para lectores de pantalla](#2-texto-sr-only)
3. [Regiones ARIA Live](#3-regiones-aria-live)
4. [Route Announcer para Next.js](#4-route-announcer)
5. [Nombres accesibles con aria-labelledby](#5-nombres-accesibles)
6. [Altura fija vs min-height](#6-altura-fija-vs-min-height)
7. [Focus Not Obscured — scroll-margin-top](#7-focus-not-obscured)
8. [Focus Appearance en Tailwind](#8-focus-appearance)
9. [Vinculación programática de errores](#9-errores-formulario)
10. [Estados de carga accesibles](#10-estados-de-carga)
11. [Enlaces a PDFs accesibles](#11-enlaces-pdfs)
12. [Enlaces externos con aviso](#12-enlaces-externos)
13. [Tablas responsivas con scroll](#13-tablas-responsivas)
14. [Iframes y alternativas textuales](#14-iframes-alternativas)
15. [prefers-reduced-motion — CSS global](#15-reduced-motion-css)
16. [useReducedMotion — Hook React](#16-reduced-motion-hook)

---

## 1. Comentarios WCAG

```tsx
{/* WCAG 2.1 — 1.3.1 Info and Relationships (Level A):
    Se usa <nav> como landmark para que los lectores de pantalla
    puedan saltar directamente a la navegación principal.
    Flujo esperado: usuario con lector de pantalla navega con
    tecla 'R' para saltar entre regiones. */}
<nav aria-label="Navegación principal">
```

---

## 2. Texto sr-only

```tsx
{
  /* WCAG 2.2 — 1.3.1 Info and Relationships (A):
    El texto sr-only proporciona el nombre accesible del botón
    ya que el ícono SVG por sí solo no tiene semántica. */
}
<button type="button" aria-label="Cerrar">
  <XIcon aria-hidden="true" />
  <span className="sr-only">Cerrar</span>
</button>;
```

---

## 3. Regiones ARIA Live

```tsx
{
  /* WCAG 2.2 — 4.1.3 Status Messages (AA):
    El mensaje de éxito se anuncia automáticamente al lector
    de pantalla sin requerir que el foco se mueva al elemento. */
}
<div role="status" aria-live="polite" aria-atomic="true">
  {mensaje && <p>{mensaje}</p>}
</div>;
```

---

## 4. Route Announcer

> **Importante:** Antes de implementar este componente, verifica en `node_modules/next/dist/docs/` si la versión actual de Next.js ya incluye un anunciador de rutas integrado.

```tsx
/* WCAG 2.2 — 4.1.3 Status Messages (AA):
   Anuncia el cambio de ruta al lector de pantalla sin
   mover el foco, para que el usuario sepa que la página cambió. */
"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function RouteAnnouncer() {
  const pathname = usePathname();
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const title = document.title;
    setAnnouncement(`Navegaste a: ${title}`);
  }, [pathname]);

  return (
    <div
      role="status"
      aria-live="assertive"
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
}
```

---

## 5. Nombres accesibles

```tsx
{
  /* WCAG 2.2 — 4.1.2 Name, Role, Value (A):
    aria-labelledby referencia el texto visible del encabezado
    de la sección, asociando la tabla a su contexto. */
}
<section aria-labelledby="tabla-dictamenes-titulo">
  <h2 id="tabla-dictamenes-titulo">Dictámenes recientes</h2>
  <table aria-labelledby="tabla-dictamenes-titulo">...</table>
</section>;
```

---

## 6. Altura fija vs min-height

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

---

## 7. Focus Not Obscured

```css
/* WCAG 2.2 — 2.4.11 Focus Not Obscured (AA):
   Compensa la altura del navbar sticky (64px) para que el
   elemento enfocado no quede tapado al recibir el foco. */
:focus-visible {
  scroll-margin-top: 80px;
}
```

---

## 8. Focus Appearance

```tsx
{
  /* WCAG 2.2 — 2.4.13 Focus Appearance (AA):
    Indicador de foco visible, con contraste suficiente (anillo
    de 2px azul sobre fondo blanco = ratio ~4.5:1). */
}
// En Tailwind CSS v4:
// focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
```

---

## 9. Errores de formulario

```tsx
{/* WCAG 2.2 — 3.3.1 Error Identification (A):
    aria-describedby vincula el mensaje de error al campo.
    aria-invalid indica semánticamente que el valor es inválido.
    El mensaje usa role="alert" para anuncio inmediato. */}
<label htmlFor="email">Correo electrónico</label>
<input
  id="email"
  type="email"
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? "email-error" : undefined}
/>
{errors.email && (
  <p id="email-error" role="alert">
    {errors.email}
  </p>
)}
```

---

## 10. Estados de carga

```tsx
{
  /* WCAG 2.2 — 4.1.3 Status Messages (AA):
    aria-busy indica al lector de pantalla que la región
    está cargando contenido. role="status" anuncia el
    cambio cuando finaliza la carga. */
}
<div role="status" aria-live="polite" aria-busy={isLoading}>
  {isLoading ? <p>Cargando dictámenes...</p> : <ResultsList />}
</div>;
```

---

## 11. Enlaces a PDFs

```tsx
{
  /* WCAG 2.2 — 1.1.1 Non-text Content (A):
    El enlace indica formato, tamaño y que abre en nueva ventana
    para que el usuario sepa qué esperar antes de hacer clic. */
}
<a href="/docs/resolucion-123.pdf" target="_blank" rel="noopener noreferrer">
  Resolución 123
  <span className="sr-only">(PDF, 245 KB — se abre en nueva ventana)</span>
</a>;
```

---

## 12. Enlaces externos

```tsx
{
  /* WCAG 2.2 — 3.2.5 Change on Request (AAA, aspiracional):
    El usuario es informado de que el enlace abre en nueva ventana
    antes de activarlo. El ícono es decorativo (aria-hidden). */
}
<a href="https://ejemplo.com" target="_blank" rel="noopener noreferrer">
  Sitio del Ministerio del Trabajo
  <ExternalLinkIcon aria-hidden="true" className="ml-1 inline-block h-4 w-4" />
  <span className="sr-only">(se abre en nueva ventana)</span>
</a>;
```

---

## 13. Tablas responsivas

```tsx
{
  /* WCAG 2.2 — 1.3.1 Info and Relationships (A):
    El contenedor scrollable tiene tabindex y role para ser
    navegable por teclado y anunciado correctamente al lector. */
}
<div
  role="region"
  aria-label="Tabla de dictámenes recientes"
  tabIndex={0}
  className="overflow-x-auto"
>
  <table>
    <thead>
      <tr>
        <th scope="col">Número</th>
        <th scope="col">Fecha</th>
        <th scope="col">Estado</th>
      </tr>
    </thead>
    <tbody>{/* ... */}</tbody>
  </table>
</div>;
```

---

## 14. Iframes y alternativas

```tsx
{
  /* WCAG 2.2 — 4.1.2 Name, Role, Value (A):
    El iframe tiene title descriptivo para que el lector de
    pantalla anuncie su propósito sin necesidad de cargarlo. */
}
<iframe
  src="https://maps.google.com/..."
  title="Mapa de ubicación de la Junta Regional — Calle 36 #19-20, Bucaramanga"
  loading="lazy"
/>;
{
  /* Alternativa textual para usuarios que no pueden usar el mapa */
}
<p>
  <strong>Dirección:</strong> Calle 36 #19-20, Bucaramanga, Santander.
  <a
    href="https://maps.google.com/..."
    target="_blank"
    rel="noopener noreferrer"
  >
    Ver en Google Maps
    <span className="sr-only">(se abre en nueva ventana)</span>
  </a>
</p>;
```

---

## 15. prefers-reduced-motion — CSS

```css
/* WCAG 2.2 — 2.3.3 Animation from Interactions (AAA, aspiracional):
   Reduce todas las animaciones no esenciales cuando el usuario
   ha configurado su sistema para reducir movimiento. */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 16. useReducedMotion — Hook

```tsx
"use client";
import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reducedMotion;
}
```
