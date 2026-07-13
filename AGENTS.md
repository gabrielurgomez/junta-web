# Junta Regional de Calificación de Invalidez de Santander — Sitio Web

## Reglas Operativas

> **Leer esta sección antes de escribir código.**

### Uso obligatorio de `.codegraph` (búsqueda semántica)

Este proyecto tiene un grafo de código indexado en `.codegraph/`. **Siempre que la tarea implique** localizar dónde está definida una función, tipo, constante o módulo; entender las relaciones / dependencias entre archivos; refactorizar código existente; o responder preguntas del tipo _"¿dónde se usa X?"_ / _"¿qué archivos se verían afectados si cambio Y?"_, el agente **debe usar la herramienta de búsqueda semántica del codegraph como primer paso** antes de explorar manualmente con `grep` o listar directorios.

> **Por qué:** el codegraph indexa símbolos, relaciones y dependencias del proyecto de forma semántica, lo que lo hace más preciso y rápido que una búsqueda textual para tareas de navegación y comprensión del código.

---

## Acerca de la Entidad

La Junta Regional de Calificación de Invalidez de Santander es un organismo del Sistema de la Seguridad Social Integral del Orden Nacional, de creación legal, adscrito al Ministerio del Trabajo. Tiene personería jurídica, de derecho privado, sin ánimo de lucro, de carácter interdisciplinario, sujeta a revisoría fiscal, con autonomía técnica y científica en los dictámenes periciales, cuyas decisiones son de carácter obligatorio.

Su función principal es la calificación de pacientes con presuntas discapacidades a través de un equipo interdisciplinario compuesto por médicos y una psicóloga, con el fin de determinar el origen, la pérdida de capacidad laboral u ocupacional y la fecha de estructuración.

---

## Stack Tecnológico

**Next.js:** la versión instalada está en `package.json`. Antes de cualquier trabajo en Next.js, leer el fragmento pertinente en `node_modules/next/dist/docs/`; ahí está la documentación acorde a esa versión (no sustituir por conocimiento genérico del modelo).

| Tecnología          | Versión | Notas                      |
| ------------------- | ------- | -------------------------- |
| **React**           | 19.2.4  |                            |
| **React DOM**       | 19.2.4  |                            |
| **TypeScript**      | ^5      |                            |
| **Tailwind CSS**    | ^4      | Con `@tailwindcss/postcss` |
| **ESLint**          | ^9      |                            |
| **Package Manager** | pnpm    |                            |

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

### Estructura de Archivos (`src/app/`)

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
2. **Idioma del código**: Variables, funciones y componentes en español. Contenido (textos, labels) en español.
3. **Componentes compartidos** (navbar, footer, etc.) se ubican en `src/components/`.
4. **Componentes cliente vs servidor**: seguir las convenciones del framework según `node_modules/next/dist/docs/` (no duplicar aquí reglas de renderizado).
5. **Rutas en español con kebab-case**: `/atencion-al-usuario`, `/contratacion`, etc.
6. **Tailwind CSS v4** se usa para estilos. Consultar la configuración via `@tailwindcss/postcss`.
7. **Documentación de Next.js**: La documentación instalada localmente es la fuente de la verdad. Antes de codificar, proponer soluciones o hacer revisiones de código (code review) relacionadas con Next.js, **SIEMPRE debes buscar y leer la documentación oficial relevante ubicada en `node_modules/next/dist/docs/`**.
8. **Accesibilidad Web**: Para garantizar la accesibilidad web y cumplir con los estándares requeridos, se deben revisar y aplicar estrictamente las instrucciones descritas en el skill de accesibilidad que está ubicado en `.agents/skills/accesibilidad/SKILL.md`.
9. **Diseño y UI**: Cuando vayas a crear o modificar componentes, estilos o cualquier aspecto visual (UI), debes revisar y apegarte estrictamente a las directrices establecidas en el archivo `DESIGN.md`.
