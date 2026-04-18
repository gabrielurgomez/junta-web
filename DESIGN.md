# Design System — Junta Regional de Calificación de Invalidez de Santander

## 1. Visual Theme & Atmosphere

El sitio web de la Junta Regional de Calificación de Invalidez de Santander proyecta **confianza, seriedad institucional y transparencia**. El diseño opera sobre un fondo blanco puro (`#ffffff`) con el azul institucional **Primary** (`#348ceb`) como color principal de marca. El resultado es una interfaz limpia y profesional que transmite la imparcialidad y objetividad propias de un organismo del Sistema de Seguridad Social Integral.

La tipografía utiliza **Inter** — una fuente de Google Fonts diseñada específicamente para pantallas, con excelente legibilidad a todos los tamaños. Opera en un rango de pesos de 400 (regular) para cuerpo, 500 (medium) para UI, 600 (semibold) para énfasis, y 700 (bold) para encabezados principales.

El sistema de diseño utiliza un token system basado en variables CSS (`--color-*`) y un enfoque de sombras sutiles y profesionales. Las tarjetas usan una sombra de tres capas que crea una elevación elegante y sobria. Bordes redondeados moderados (6px–16px) dan un toque moderno sin perder la formalidad institucional.

**Key Characteristics:**

- Fondo blanco puro con Primary Blue (`#348ceb`) como color principal de marca
- Inter — Google Font optimizada para pantallas, profesional y legible
- Token system basado en variables CSS (`--color-*`)
- Sombras de tarjeta de tres capas: borde sutil + difuminado suave + difuminado principal
- Border-radius moderado: 6px botones, 8px badges, 12px tarjetas, 16px elementos grandes
- Estética institucional y gubernamental — transmite confianza y seriedad
- Texto near-black (`#1a1a2e`) — profesional, no frío
- Gold accent (`#d4a017`) para elementos destacados y reconocimientos

## 2. Color Palette & Roles

### Primary (Azul Institucional)

| Token                 | Hex       | Uso                                           |
| --------------------- | --------- | --------------------------------------------- |
| `--color-primary-50`  | `#e8f4fd` | Fondos sutiles, estados hover sobre blanco    |
| `--color-primary-100` | `#c5e3f9` | Fondos de badges, chips, alertas informativas |
| `--color-primary-200` | `#9dd0f5` | Bordes activos, indicadores secundarios       |
| `--color-primary-300` | `#6db9ef` | Iconos secundarios, links hover               |
| `--color-primary-400` | `#348ceb` | **🎯 Color principal de marca — Primary**     |
| `--color-primary-500` | `#2b7ad4` | CTAs hover, botones presionados               |
| `--color-primary-600` | `#2366b5` | Encabezados sobre fondo claro, énfasis        |
| `--color-primary-700` | `#1a4f8f` | Texto sobre fondo claro con alto contraste    |
| `--color-primary-800` | `#133a6a` | Fondos oscuros de navbar/footer               |
| `--color-primary-900` | `#0d2847` | Fondos muy oscuros, overlays                  |

### Accent (Gold)

- **Gold** (`#d4a017`): `--color-accent`, elementos destacados, iconos de reconocimiento
- **Gold Light** (`#f5e6b8`): `--color-accent-light`, fondos de badges premium
- **Gold Dark** (`#b8860b`): `--color-accent-dark`, hover sobre gold

### Semantic (Estados)

- **Success** (`#16a34a`): `--color-success`, confirmaciones, estados exitosos
- **Warning** (`#f59e0b`): `--color-warning`, alertas, precauciones
- **Error** (`#dc2626`): `--color-error`, errores, estados críticos
- **Error Dark** (`#b91c1c`): `--color-error-dark`, error hover/pressed
- **Info** (`#348ceb`): `--color-info`, mismo primary — información neutral

### Text Scale

- **Near Black** (`#1a1a2e`): `--color-text-primary`, texto principal — profesional
- **Dark Gray** (`#374151`): `--color-text-secondary`, texto secundario, descripciones
- **Medium Gray** (`#6b7280`): `--color-text-tertiary`, labels, placeholders
- **Light Gray** (`#9ca3af`): `--color-text-disabled`, estados deshabilitados

### Interactive

- **Link Blue** (`#348ceb`): `--color-link`, mismo primary — links e interacciones
- **Link Hover** (`#2366b5`): `--color-link-hover`, hover sobre links
- **Border** (`#e5e7eb`): `--color-border`, bordes de tarjetas y divisores
- **Border Focus** (`#348ceb`): `--color-border-focus`, borde en estado focus

### Surface & Shadows

- **Pure White** (`#ffffff`): `--color-surface`, fondo de página y tarjetas
- **Light Gray** (`#f9fafb`): `--color-surface-secondary`, fondos alternos de secciones
- **Card Shadow** (`rgba(0,0,0,0.03) 0px 0px 0px 1px, rgba(0,0,0,0.05) 0px 2px 8px, rgba(0,0,0,0.08) 0px 4px 12px`): Elevación profesional de tres capas
- **Hover Shadow** (`rgba(0,0,0,0.1) 0px 4px 16px`): Elevación hover

## 3. Typography Rules

### Font Family

- **Primary**: `Inter`, fallbacks: `-apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif`
- **Import**: `import { Inter } from 'next/font/google'; const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });`

### Hierarchy

| Role            | Font  | Size           | Weight | Line Height | Letter Spacing | Notes                  |
| --------------- | ----- | -------------- | ------ | ----------- | -------------- | ---------------------- |
| Page Title      | Inter | 32px (2.00rem) | 700    | 1.25        | -0.5px         | Títulos de página      |
| Section Heading | Inter | 24px (1.50rem) | 700    | 1.33        | -0.3px         | Encabezados de sección |
| Card Heading    | Inter | 20px (1.25rem) | 600    | 1.30        | -0.2px         | Títulos de tarjeta     |
| Sub-heading     | Inter | 18px (1.13rem) | 600    | 1.40        | normal         | Sub-encabezados        |
| UI Medium       | Inter | 16px (1.00rem) | 500    | 1.50        | normal         | Nav, texto enfatizado  |
| Button          | Inter | 15px (0.94rem) | 600    | 1.25        | 0.2px          | Labels de botones      |
| Body            | Inter | 16px (1.00rem) | 400    | 1.625       | normal         | Texto de cuerpo        |
| Body Small      | Inter | 14px (0.88rem) | 400    | 1.50        | normal         | Texto secundario       |
| Caption         | Inter | 13px (0.81rem) | 500    | 1.38        | normal         | Captions, metadata     |
| Tag             | Inter | 12px (0.75rem) | 500    | 1.33        | 0.3px          | Tags, etiquetas        |
| Badge           | Inter | 11px (0.69rem) | 600    | 1.18        | 0.5px          | Badges de estado       |

### Principles

- **Rango de pesos profesional**: 400 para cuerpo, 500 para UI, 600 para énfasis, 700 para encabezados. Inter mantiene excelente legibilidad en todos los pesos.
- **Tracking sutil en encabezados**: -0.2px a -0.5px en títulos crea encabezados compactos y profesionales.
- **Line-height generoso en cuerpo**: 1.625 para texto de cuerpo asegura legibilidad óptima en contenido institucional denso.
- **Tracking positivo en elementos pequeños**: +0.2px a +0.5px en badges y tags mejora la legibilidad a tamaños reducidos.

## 4. Component Stylings

### Buttons

**Primary**

- Background: `#348ceb` (Primary Blue)
- Text: `#ffffff`
- Padding: 12px 24px
- Radius: 6px
- Hover: `#2b7ad4` (Primary 500) + sombra sutil
- Focus: `0 0 0 3px rgba(52, 140, 235, 0.3)` ring
- Transition: `all 0.2s ease`

**Secondary / Outline**

- Background: `transparent`
- Text: `#348ceb`
- Border: `1px solid #348ceb`
- Padding: 12px 24px
- Radius: 6px
- Hover: `background: #e8f4fd` (Primary 50)

**Ghost**

- Background: `transparent`
- Text: `#374151` (text secondary)
- Padding: 12px 24px
- Radius: 6px
- Hover: `background: #f9fafb`

### Cards & Containers

- Background: `#ffffff`
- Radius: 6px (badges), 12px (tarjetas), 16px (elementos grandes)
- Shadow: `rgba(0,0,0,0.03) 0px 0px 0px 1px, rgba(0,0,0,0.05) 0px 2px 8px, rgba(0,0,0,0.08) 0px 4px 12px`
- Hover: transición suave a `rgba(0,0,0,0.1) 0px 4px 16px`
- Tarjetas informativas: icono + título + descripción

### Inputs

- Text: `#1a1a2e`
- Placeholder: `#9ca3af`
- Border: `1px solid #e5e7eb`
- Focus: `border-color: #348ceb` + `0 0 0 3px rgba(52, 140, 235, 0.15)` ring
- Radius: 6px
- Padding: 10px 14px

### Navigation (Navbar)

El sitio web utiliza un componente NavBar para la navegación principal (`src/components/NavBar.tsx`). Se encuentra fijado en la parte superior de la interfaz en resoluciones de escritorio y es completamente responsive:

- **Escritorio (Desktop):**
  - Posición _sticky_ en la parte superior con una sombra inferior sutil `0 1px 3px rgba(0,0,0,0.08)`.
  - Fondo: `#ffffff` (`var(--color-surface)`).
  - A la izquierda: Logo SVG institucional (escudo azul) y nombre de la entidad.
  - A la derecha/centro: Enlaces de navegación en línea (`Inicio`, `Entidad`, `Normatividad`, `Dictámenes`, `Atención al usuario`, `Pagos`, `Contratación`).
  - Link activo: texto Primary (`var(--color-primary-400)`) con indicador inferior y peso fuente `600`.
  - Hover: texto `var(--color-primary-500)` y fondo tenue `var(--color-primary-50)`.

- **Móvil (Mobile):**
  - Botón menú hamburguesa animado en la esquina superior derecha (se transforma en "X" al abrir).
  - Drawer lateral derecho: panel desplegable que aparece sobre un _overlay_ oscurecido (`rgba(0, 0, 0, 0.4)`).
  - Interacciones: al abrir el drawer, se bloquea el scroll de la página principal para centrar la navegación dentro del panel. Incluye encabezado con título "Navegación", los enlaces listados verticalmente y un mensaje de footer.

### Footer

- Fondo: `#0d2847` (Primary 900) o `#133a6a` (Primary 800)
- Texto: `#ffffff` / `rgba(255,255,255,0.7)` para secundario
- Links hover: `#9dd0f5` (Primary 200)
- Información de contacto, redes, links institucionales

## 5. Layout Principles

### Spacing System

- Base unit: 4px
- Scale: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px

### Grid & Container

- Max-width del contenido: 1200px, centrado
- Header sticky con navegación institucional
- Secciones alternas: blanco / gris claro (`#f9fafb`)
- Footer oscuro (Primary 800/900) con columnas de links

### Whitespace Philosophy

- **Espaciado institucional**: Padding vertical generoso entre secciones (64px–96px) para dar peso y seriedad al contenido.
- **Legibilidad ante todo**: Máximo 75 caracteres por línea en bloques de texto para lectura cómoda.
- **Jerarquía clara**: Cada sección visual está claramente delimitada con espacio y/o fondo alterno.

### Border Radius Scale

- Sutil (4px): Tags, badges pequeños
- Standard (6px): Botones, inputs, elementos de formulario
- Card (12px): Tarjetas, contenedores de contenido
- Large (16px): Hero sections, elementos destacados
- Circle (50%): Avatares, iconos circulares

## 6. Depth & Elevation

| Level              | Treatment                                                                                       | Uso                                 |
| ------------------ | ----------------------------------------------------------------------------------------------- | ----------------------------------- |
| Flat (Level 0)     | No shadow                                                                                       | Fondo de página, bloques de texto   |
| Subtle (Level 1)   | `rgba(0,0,0,0.03) 0px 0px 0px 1px, rgba(0,0,0,0.05) 0px 2px 8px`                                | Tarjetas en reposo, navbar          |
| Card (Level 2)     | `rgba(0,0,0,0.03) 0px 0px 0px 1px, rgba(0,0,0,0.05) 0px 2px 8px, rgba(0,0,0,0.08) 0px 4px 12px` | Tarjetas hover, dropdowns           |
| Elevated (Level 3) | `rgba(0,0,0,0.1) 0px 8px 24px`                                                                  | Modales, popovers                   |
| Focus (Level 4)    | `0 0 0 3px rgba(52, 140, 235, 0.3)`                                                             | Elementos enfocados (accesibilidad) |

**Shadow Philosophy**: Las sombras son sobrias y profesionales. La capa base (`0px 0px 0px 1px`) proporciona un borde sutil. Las capas adicionales crean una elevación controlada que no distrae del contenido. El focus ring azul (`rgba(52, 140, 235, 0.3)`) refuerza la identidad de marca en las interacciones.

## 7. Do's and Don'ts

### Do

- Usar `#1a1a2e` (near-black profesional) para texto — nunca `#000000` puro
- Aplicar Primary Blue (`#348ceb`) para CTAs, links y elementos de marca
- Usar Inter en pesos 400–700 según la jerarquía establecida
- Aplicar la sombra de tres capas para superficies elevadas
- Usar border-radius moderado: 6px para botones, 12px para tarjetas
- Usar fondos alternos (blanco / `#f9fafb`) para separar secciones visualmente
- Usar Gold accent (`#d4a017`) con moderación para elementos especiales
- Mantener alto contraste para accesibilidad (WCAG AA mínimo)
- Usar `--color-*` variables CSS de forma consistente

### Don't

- No usar negro puro (`#000000`) para texto — siempre `#1a1a2e`
- No aplicar Primary Blue en grandes superficies de fondo (usar Primary 800/900 solo en footer/navbar oscuro)
- No usar pesos de fuente menores a 400 — Inter funciona mejor desde regular
- No usar sombras pesadas (>0.1 opacidad en capa principal)
- No usar esquinas completamente cuadradas (0px) en tarjetas — mínimo 6px
- No introducir colores fuera de la paleta definida
- No usar rojo como color de marca — rojo es exclusivamente para errores y estados críticos
- No usar degradados excesivos — mantener la estética sobria e institucional

## 8. Responsive Behavior

### Breakpoints

| Name          | Width       | Key Changes                   |
| ------------- | ----------- | ----------------------------- |
| Mobile Small  | <375px      | Single column, compact search |
| Mobile        | 375–550px   | Standard mobile listing grid  |
| Tablet Small  | 550–744px   | 2-column listings             |
| Tablet        | 744–950px   | Search bar expansion          |
| Desktop Small | 950–1128px  | 3-column listings             |
| Desktop       | 1128–1440px | 4-column grid, full header    |
| Large Desktop | 1440–1920px | 5-column grid                 |
| Ultra-wide    | >1920px     | Maximum grid width            |

_Note: Airbnb has 61 detected breakpoints — one of the most granular responsive systems observed, reflecting their obsession with layout at every possible screen size._

### Touch Targets

- Circular nav buttons: adequate 50% radius sizing
- Listing cards: full-card tap target on mobile
- Search bar: prominently sized for thumb interaction
- Category pills: horizontally scrollable with generous padding

### Collapsing Strategy

- Listing grid: 5 → 4 → 3 → 2 → 1 columns
- Search: expanded bar → compact bar → overlay
- Category pills: horizontal scroll at all sizes
- Navigation: full header → mobile simplified
- Map: side panel → overlay/toggle

### Image Behavior

- Listing photos: carousel with swipe on mobile
- Responsive image sizing with aspect ratio maintained
- Heart overlay positioned consistently across sizes
- Photo quality adjusts based on viewport

## 9. Agent Prompt Guide

### Quick Color Reference

- Background: Pure White (`#ffffff`)
- Surface alt: Light Gray (`#f9fafb`)
- Text: Near Black (`#1a1a2e`)
- Text secondary: Dark Gray (`#374151`)
- Brand primary: Primary Blue (`#348ceb`)
- Brand primary hover: `#2b7ad4`
- Brand primary dark: `#1a4f8f`
- Accent: Gold (`#d4a017`)
- Error: `#dc2626`
- Success: `#16a34a`
- Border: `#e5e7eb`
- Card shadow: three-layer professional stack
- Footer bg: `#0d2847` o `#133a6a`

### Example Component Prompts

- "Crear tarjeta institucional: fondo blanco, 12px radius. Sombra de tres capas. Icono azul (#348ceb), título 20px Inter weight 600, descripción 14px weight 400 en #374151."
- "Diseñar botón CTA: fondo #348ceb, texto blanco, 6px radius, 15px Inter weight 600, padding 12px 24px. Hover: #2b7ad4 con sombra sutil."
- "Construir navbar: fondo blanco, sticky, sombra inferior sutil. Logo a la izquierda, links de navegación Inter 16px weight 500. Link activo en #348ceb con indicador inferior."
- "Crear hero section: fondo blanco o gradiente sutil desde #e8f4fd. Título 32px Inter weight 700 en #1a1a2e. Subtítulo 18px weight 400 en #374151. CTA azul primario."
- "Diseñar footer: fondo #0d2847, texto blanco. Links en rgba(255,255,255,0.7) con hover en #9dd0f5. Columnas con información de contacto."

### Iteration Guide

1. Empezar con blanco — el contenido institucional es el protagonista
2. Primary Blue (#348ceb) es el color de marca — usar para CTAs, links, estados activos
3. Near-black (#1a1a2e) para texto — profesional y legible
4. Sombras sobrias de tres capas — elevación controlada
5. Radius moderado: 6px botones, 12px tarjetas
6. Inter en 400–700 — legibilidad profesional
7. Fondos alternos (blanco / #f9fafb) para ritmo visual entre secciones
8. Gold (#d4a017) como accent sutil — nunca como color dominante

## 10. Reglas de Uso de Tokens

> **OBLIGATORIO**: Todos los colores en componentes y páginas deben usar las utilidades de Tailwind generadas desde los tokens (e.g. `text-text-primary`, `bg-primary-400`, `border-border`) o las variables CSS (e.g. `var(--color-text-primary)`, `var(--color-primary-400)`). **Nunca hardcodear valores hex** como `text-[#1a1a2e]` o `bg-[#348ceb]` en los componentes.

### ¿Por qué?

- **Mantenibilidad**: Si se actualiza la paleta, basta con cambiar el valor en `:root` de `globals.css`. Todos los componentes heredan el cambio automáticamente.
- **Consistencia**: Evita variaciones accidentales de color (e.g. `#1a1a2e` vs `#1b1b2f`).
- **Legibilidad**: `text-text-secondary` es más expresivo que `text-[#374151]`.

### Tokens disponibles como utilidades de Tailwind

| Utilidad Tailwind      | Variable CSS                     | Valor     | Uso                             |
| ---------------------- | -------------------------------- | --------- | ------------------------------- |
| `text-text-primary`    | `var(--color-text-primary)`      | `#1a1a2e` | Texto principal                 |
| `text-text-secondary`  | `var(--color-text-secondary)`    | `#374151` | Texto secundario, descripciones |
| `text-text-tertiary`   | `var(--color-text-tertiary)`     | `#6b7280` | Labels, placeholders            |
| `text-text-disabled`   | `var(--color-text-disabled)`     | `#9ca3af` | Estados deshabilitados          |
| `bg-primary-400`       | `var(--color-primary-400)`       | `#348ceb` | Fondos con color de marca       |
| `text-primary-400`     | `var(--color-primary-400)`       | `#348ceb` | Texto con color de marca        |
| `bg-primary-50`        | `var(--color-primary-50)`        | `#e8f4fd` | Fondos hover sutiles            |
| `bg-surface-secondary` | `var(--color-surface-secondary)` | `#f9fafb` | Fondos alternos de sección      |
| `border-border`        | `var(--color-border)`            | `#e5e7eb` | Bordes de tarjetas y divisores  |
| `text-error`           | `var(--color-error)`             | `#dc2626` | Texto de error                  |
| `text-success`         | `var(--color-success)`           | `#16a34a` | Texto de éxito                  |

### Ejemplo correcto vs incorrecto

```tsx
// ❌ INCORRECTO — hex hardcodeado
<h1 className="text-[#1a1a2e]">Título</h1>
<p className="text-[#374151]">Descripción</p>
<button className="bg-[#348ceb]">Acción</button>

// ✅ CORRECTO — tokens de Tailwind
<h1 className="text-text-primary">Título</h1>
<p className="text-text-secondary">Descripción</p>
<button className="bg-primary-400">Acción</button>

// ✅ CORRECTO — variables CSS (en archivos .css o estilos inline)
.mi-componente {
  color: var(--color-text-primary);
  background: var(--color-primary-400);
}
```
