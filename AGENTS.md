<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

---

# Junta Regional de Calificación de Invalidez de Santander — Sitio Web

## Acerca de la Entidad

La Junta Regional de Calificación de Invalidez de Santander es un organismo del Sistema de la Seguridad Social Integral del Orden Nacional, de creación legal, adscrito al Ministerio del Trabajo. Tiene personería jurídica, de derecho privado, sin ánimo de lucro, de carácter interdisciplinario, sujeta a revisoría fiscal, con autonomía técnica y científica en los dictámenes periciales, cuyas decisiones son de carácter obligatorio.

Su función principal es la calificación de pacientes con presuntas discapacidades a través de un equipo interdisciplinario compuesto por médicos y una psicóloga, con el fin de determinar el origen, la pérdida de capacidad laboral u ocupacional y la fecha de estructuración.

---

## Stack Tecnológico

| Tecnología          | Versión | Notas                                   |
| ------------------- | ------- | --------------------------------------- |
| **Next.js**         | 16.2.4  | App Router, Server-Side Rendering (SSR) |
| **React**           | 19.2.4  |                                         |
| **React DOM**       | 19.2.4  |                                         |
| **TypeScript**      | ^5      |                                         |
| **Tailwind CSS**    | ^4      | Con `@tailwindcss/postcss`              |
| **ESLint**          | ^9      | Con `eslint-config-next`                |
| **Package Manager** | pnpm    |                                         |

---

## Renderizado (SSR)

Todas las páginas soportan **Server-Side Rendering (SSR)**. Cuando un usuario visita una ruta, la página se renderiza desde el servidor antes de enviarse al navegador. Esto garantiza:

- Mejor SEO (el contenido ya está en el HTML).
- Tiempos de carga percibidos más rápidos.
- Contenido siempre actualizado en cada visita.

Las páginas son **Server Components por defecto** (Next.js App Router). Solo se usa `"use client"` cuando es estrictamente necesario para interactividad del lado del cliente.

---

## Estructura de Navegación

El sitio web tiene un **navbar** con las siguientes secciones/páginas:

| Página                  | Ruta                   | Descripción                                                                                        |
| ----------------------- | ---------------------- | -------------------------------------------------------------------------------------------------- |
| **Inicio**              | `/`                    | Página principal. Hero, misión, visión, perspectiva estratégica, información general de la entidad |
| **Entidad**             | `/entidad`             | Información institucional: quiénes somos, equipo, estructura organizacional                        |
| **Normatividad**        | `/normatividad`        | Marco normativo y legal aplicable a la entidad                                                     |
| **Dictámenes**          | `/dictamenes`          | Información sobre el proceso de dictámenes periciales y calificación de invalidez                  |
| **Atención al usuario** | `/atencion-al-usuario` | Canales de atención, horarios, PQRS, contacto                                                      |
| **Pagos**               | `/pagos`               | Información y canales de pago para los servicios de la entidad                                     |
| **Contratación**        | `/contratacion`        | Procesos de contratación, convocatorias, documentos de contratación                                |

### Estructura de Archivos (App Router)

```
src/app/
├── layout.tsx                  # Layout raíz con navbar y footer
├── page.tsx                    # Página de Inicio (/)
├── globals.css                 # Estilos globales + Tailwind
├── favicon.ico
│
├── entidad/
│   └── page.tsx                # /entidad
│
├── normatividad/
│   └── page.tsx                # /normatividad
│
├── dictamenes/
│   └── page.tsx                # /dictamenes
│
├── atencion-al-usuario/
│   └── page.tsx                # /atencion-al-usuario
│
├── pagos/
│   └── page.tsx                # /pagos
│
└── contratacion/
    └── page.tsx                # /contratacion
```

---

## Convenciones del Proyecto

1. **Idioma del contenido**: Español (Colombia).
2. **Idioma del código**: Variables, funciones y componentes en inglés. Contenido (textos, labels) en español.
3. **Componentes compartidos** (navbar, footer, etc.) se ubican en `src/components/`.
4. **Cada página es un Server Component** a menos que requiera interactividad del lado del cliente.
5. **Rutas en español con kebab-case**: `/atencion-al-usuario`, `/contratacion`, etc.
6. **Tailwind CSS v4** se usa para estilos. Consultar la configuración via `@tailwindcss/postcss`.
