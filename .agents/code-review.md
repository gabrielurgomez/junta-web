# Instrucciones de Code Review

Este documento define las directrices que se deben seguir al realizar una revisión de código en este proyecto. Aplica tanto para revisiones automatizadas como manuales.

Responde siempre en español.

---

## Fuentes Obligatorias

Antes de realizar una revisión de código, aplica las reglas y skills del proyecto que correspondan al cambio revisado:

- `.agents/rules/agent-behavior.md`: comportamiento general esperado del agente durante la revisión.
- `.agents/rules/ui-components.md`: reglas obligatorias para componentes UI cuando el cambio toque componentes, estilos o interacción visual.
- `.agents/skills/accesibilidad/SKILL.md`: lineamientos WCAG 2.2 AA cuando el cambio toque UI, formularios, navegación, imágenes, enlaces, tablas o interacción.
- `.agents/skills/estructura-paginas/SKILL.md`: estructura estándar cuando el cambio cree o modifique páginas, rutas, Server Components, Client Components o Server Actions.

---

## Alcance

- Evalúa únicamente los archivos modificados. No reportes issues en código que no fue cambiado.
- Si los cambios no contienen UI (solo configuración, lógica de servidor sin interfaz, etc.), omite las secciones de accesibilidad y diseño.

---

## 1. Accesibilidad Web (WCAG 2.2 AA)

Lee y aplica estrictamente las directrices definidas en `.agents/skills/accesibilidad/SKILL.md`.

Para cada archivo que contenga cambios de UI (`.tsx`, `.css`), verifica:

1. **HTML Semántico** — ¿Se usan elementos nativos correctos? ¿La jerarquía de encabezados es válida?
2. **ARIA** — ¿Se usan atributos ARIA correctamente? ¿Hay ARIA innecesario donde un elemento nativo bastaría?
3. **Teclado** — ¿Todos los elementos interactivos son accesibles por teclado? ¿Hay indicador de foco visible (`focus-visible`)?
4. **Contraste** — ¿Los colores nuevos cumplen los ratios mínimos? (4.5:1 texto, 3:1 componentes UI)
5. **Lectores de pantalla** — ¿Los elementos tienen nombres accesibles? ¿El contenido dinámico usa `aria-live`?
6. **Imágenes y multimedia** — ¿Todas las imágenes tienen `alt` apropiado?
7. **Formularios** — ¿Los inputs tienen `label`? ¿Los errores usan `aria-describedby` y `aria-invalid`?
8. **Estados de carga** — ¿Se usan `aria-busy` y `role="status"` en contenido asíncrono?
9. **Enlaces externos** — ¿Los enlaces con `target="_blank"` tienen aviso y `rel="noopener noreferrer"`?
10. **Tablas** — ¿Las tablas de datos tienen `scope` en `<th>` y son accesibles en móvil?

---

## 2. Diseño y Design Tokens

Cuando los cambios involucren componentes, estilos o cualquier aspecto visual, verifica que se cumplan las directrices establecidas en `DESIGN.md`.

---

## 3. Componentes y Estructura

- Verifica que nunca se use `<main>` en los componentes de las páginas, ya que el layout raíz (`src/app/layout.tsx`) se encarga de eso.
- Los componentes deben seguir las reglas definidas en `.agents/rules/ui-components.md`.
- Las páginas nuevas deben seguir la estructura definida en `.agents/skills/estructura-paginas/SKILL.md`.

---

## 4. React y JSX

- **No importar React innecesariamente:** Con la transformación JSX automática (desde React 17), usada por Next.js, no es necesario `import React from "react"` solo para escribir JSX.
- **Importaciones específicas:** Solo importar desde `"react"` cuando se usen hooks (`useState`, `useEffect`, etc.) o funciones específicas (`Suspense`, `forwardRef`, etc.), y siempre como importaciones con nombre: `import { useState } from "react"`.

---

## 5. Next.js

- **Documentación local como fuente de verdad:** Antes de proponer soluciones o hacer observaciones sobre Next.js, consultar la documentación oficial ubicada en `node_modules/next/dist/docs/`.
- Verificar que las páginas sean Server Components a menos que requieran interactividad del lado del cliente (`"use client"`).

---

## Formato de Reporte

Para cada hallazgo, reporta:

- **Archivo y línea** del problema
- **Severidad**: 🔴 Violación (incumple estándar o convención) | 🟡 Advertencia (buena práctica no seguida)
- **Problema**: descripción concreta
- **Corrección sugerida**: código o cambio específico para solucionarlo
- Si aplica, **referencia WCAG** afectada (ej: "1.3.1 Info and Relationships — Nivel A")

Si no encuentras problemas, responde: "✅ Los cambios en este PR cumplen con las directrices del proyecto."
