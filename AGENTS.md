# Junta Regional de Calificación de Invalidez de Santander — Sitio Web

## Acerca de la Entidad

La Junta Regional de Calificación de Invalidez de Santander es un organismo del Sistema de la Seguridad Social Integral del Orden Nacional, de creación legal, adscrito al Ministerio del Trabajo. Tiene personería jurídica, de derecho privado, sin ánimo de lucro, de carácter interdisciplinario, sujeta a revisoría fiscal, con autonomía técnica y científica en los dictámenes periciales, cuyas decisiones son de carácter obligatorio.

Su función principal es la calificación de pacientes con presuntas discapacidades a través de un equipo interdisciplinario compuesto por médicos y una psicóloga, con el fin de determinar el origen, la pérdida de capacidad laboral u ocupacional y la fecha de estructuración.

---

## Stack Tecnológico

| Tecnología          | Versión | Notas                         |
| ------------------- | ------- | ----------------------------- |
| **Next.js**         | 16.2.4  | App Router, Server Components |
| **React**           | 19.2.4  |                               |
| **React DOM**       | 19.2.4  |                               |
| **TypeScript**      | ^5      |                               |
| **Tailwind CSS**    | ^4      | Con `@tailwindcss/postcss`    |
| **ESLint**          | ^9      | Con `eslint-config-next`      |
| **Package Manager** | pnpm    |                               |

---

## Renderizado

En **Next.js App Router**, las páginas son **Server Components por defecto**. Esto significa que su renderizado se resuelve en el servidor, pero **no todas las rutas son SSR en cada visita**.

Dependiendo del uso de datos y de la configuración de la ruta, una página puede renderizarse de forma:

- **Estática** por defecto, cuando Next.js puede prerenderizarla y servirla desde caché.
- **Dinámica**, si la ruta o sus datos requieren renderizado por solicitud.
- **Revalidada o cacheada**, según opciones como `revalidate`, `dynamic` y la estrategia de caché de `fetch`.

Esto permite combinar:

- Buen SEO (el contenido llega renderizado en el HTML).
- Buen rendimiento y tiempos de carga percibidos más rápidos.
- Flexibilidad para servir contenido estático o actualizado según las necesidades de cada ruta.

Solo se usa `"use client"` cuando es estrictamente necesario para interactividad del lado del cliente.

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
7. **Documentación de Next.js**: La documentación instalada localmente es la fuente de la verdad. Antes de codificar, proponer soluciones o hacer revisiones de código (code review) relacionadas con Next.js, **SIEMPRE debes buscar y leer la documentación oficial relevante ubicada en `node_modules/next/dist/docs/`**.
8. **Accesibilidad Web**: Para garantizar la accesibilidad web y cumplir con los estándares requeridos, se deben revisar y aplicar estrictamente las instrucciones descritas en el skill de accesibilidad que está ubicado en `.agents/skills/accesibilidad/SKILL.md`.
9. **Diseño y UI**: Cuando vayas a crear o modificar componentes, estilos o cualquier aspecto visual (UI), debes revisar y apegarte estrictamente a las directrices establecidas en el archivo `DESIGN.md`.
