# Instrucciones y Reglas para GitHub Copilot / LLM

Cuando se realice un code review siempre responde en español

Al interactuar con este proyecto, ten en cuenta las siguientes directrices, especialmente en lo que respecta a la accesibilidad del sitio web.

## Accesibilidad Web (WCAG)

Para garantizar la accesibilidad web y cumplir con los estándares requeridos, se deben revisar y aplicar estrictamente las instrucciones descritas en el skill de accesibilidad que está ubicado en `.agents/skills/accesibilidad/SKILL.md`.

## Diseño y Design Tokens

Cuando vayas a crear o modificar componentes, estilos o cualquier aspecto visual (UI), debes revisar y apegarte estrictamente a las directrices establecidas en el archivo `DESIGN.md`. Este archivo contiene todas las reglas y especificaciones necesarias del System Design del proyecto.

## Componentes

- Verifica que nunca se use `<main>` en los componentes de las paginas ya que de eso se encarga el layout el cual está en `src/app/layout.tsx`

## React y la Transformación JSX

- **No importes React innecesariamente:** Con la nueva transformación JSX (desde React 17) y usada por Next.js, **ya no es necesario** usar `import React from "react";` simplemente para poder escribir JSX.
- **Cuándo sí importar:** Solo importa desde `"react"` cuando vayas a utilizar hooks específicos (ej. `useState`, `useEffect`, `useRef`, etc.) o funciones particulares de la librería (ej. `Suspense`, `forwardRef`, etc.). Aún así, debes importar esas piezas específicas (ej. `import { useState } from "react";`) en lugar del objeto global `React`.

## Next.js y Documentación Oficial

- **La documentación local es la fuente de la verdad:** Dado que la información del modelo puede estar desactualizada respecto a las versiones más recientes, antes de codificar, proponer soluciones o hacer _code review_ relacionado con el framework Next.js, **SIEMPRE debes buscar y leer la documentación oficial relevante ubicada en `node_modules/next/dist/docs/`**.
