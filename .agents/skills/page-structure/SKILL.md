---
name: page-structure
description: Estructura estándar de páginas en el proyecto Next.js de la Junta Regional de Calificación de Invalidez de Santander. Define cuándo usar una página estática simple (solo page.tsx) y cuándo usar la estructura de 3 archivos (page.tsx + Client + actions) para páginas con interactividad y lógica de servidor.
---

# Estructura de Páginas

El proyecto distingue dos tipos de páginas según su naturaleza:

1. **Página estática**: solo contenido informativo, sin interactividad ni funciones de servidor. Un único archivo `page.tsx` es suficiente.
2. **Página interactiva**: tiene un componente de UI interactivo (formularios, acciones del usuario) y/o funciones que se ejecutan del lado del servidor. Requiere la estructura de **3 archivos**.

---

## Tipo 1 — Página estática (`page.tsx` únicamente)

Se usa cuando la página solo muestra contenido: texto, imágenes, tarjetas informativas. No hay formularios, no hay llamadas a servidor desde el cliente, no hay estados.

**Cuándo usar este tipo:**
- Páginas institucionales de solo lectura (quiénes somos, normatividad, etc.)
- Contenido que no cambia en función de la interacción del usuario
- No se necesitan Server Actions

**Ejemplo real:** `/entidad`

```tsx
// src/app/(paths)/entidad/page.tsx
import { Hero2 } from "@/app/components/Hero2";
import { Card } from "@/app/components/Card";

export default function EntidadPage() {
  return (
    <>
      <Hero2
        title="Conoce la entidad"
        subtitle="Somos un organismo del Sistema de Seguridad Social Integral."
        imageSrc="/doc-sergio.webp"
        imageAlt="Fachada Institucional"
        badgeText="Sobre Nosotros"
        priority={true}
      />
      <div className="mx-auto w-full max-w-300 px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-8 md:grid-cols-2">
          <Card id="card-creacion" title="Creación de las Juntas" text="..." />
          <Card id="card-importancia" title="Importancia" text="..." />
        </div>
      </div>
    </>
  );
}
```

---

## Tipo 2 — Página interactiva (estructura de 3 archivos)

Se usa cuando la página tiene alguna de estas características:
- Un componente de UI interactivo (formularios, toggles, búsquedas, tablas con filtros, etc.)
- Funciones que se ejecutan del lado del servidor (consultas a API, validaciones de servidor, envío de datos)
- Lógica de negocio que no pertenece al cliente

La estructura se compone de **3 archivos** dentro de la carpeta de la ruta:

```
src/app/(paths)/contacto/
├── page.tsx               ← Server Component (punto de entrada de la ruta)
├── Contacto.client.tsx    ← Client Component (UI interactiva)
└── contacto.actions.ts    ← Server Actions (lógica de servidor)
```

---

### Archivo 1 — `page.tsx` (Server Component)

- **Se ejecuta en el servidor.**
- Es el punto de entrada de la ruta (Next.js App Router).
- **No tiene `"use client"`.**
- Responsabilidades:
  - Si la ruta es pública: renderiza directamente el componente Client.
  - Si la ruta es privada: obtiene el usuario con `getUserFromHeaders()`, redirige al login si no hay sesión, valida permisos, obtiene datos del servidor y los pasa como props al Client.
  - Maneja errores de consultas (loguear y mostrar mensaje).

**Ejemplo (ruta pública — sin autenticación):**

```tsx
// src/app/(paths)/contacto/page.tsx
import ContactoClient from "./Contacto.client";

const ContactoPage = () => {
  return <ContactoClient />;
};

export default ContactoPage;
```

**Ejemplo (ruta privada — con autenticación y datos del servidor):**

```tsx
import NombreClient from "./Nombre.client";
import { getUserFromHeaders } from "@/lib/utils/auth.server";
import { consultarDatos } from "./nombre.actions";
import { logger } from "@/lib/utils/logger";
import { PATHS } from "@/lib/constants/global";
import { redirect } from "next/navigation";

const NombrePage = async () => {
  const usuarioLogueado = await getUserFromHeaders();

  if (!usuarioLogueado) {
    redirect(PATHS.iniciarSesion);
  }

  if (!usuarioLogueado.permisos?.permisoRequerido) {
    return <div>No tiene permiso para acceder a esta sección.</div>;
  }

  const resultado = await consultarDatos();
  if (resultado.status !== 200) {
    logger({
      level: "error",
      message: `ruta/page.tsx => Error al consultar datos: ${resultado.message}`,
    });
    return (
      <div className="p-4">
        <p>Error: {resultado.message}</p>
      </div>
    );
  }

  return <NombreClient datos={resultado.datos} usuarioLogueado={usuarioLogueado} />;
};

export default NombrePage;
```

---

### Archivo 2 — `Nombre.client.tsx` (Client Component)

- **Se ejecuta en el browser.** Debe tener `"use client"` al inicio.
- Nomenclatura: nombre de la carpeta en **PascalCase** + `.client.tsx`.
  - Carpeta `contacto/` → `Contacto.client.tsx`
  - Carpeta `ajuste/` → `Ajuste.client.tsx`
- El componente exportado usa el mismo nombre con sufijo `Client` (ej. `ContactoClient`, `AjusteClient`).
- Responsabilidades:
  - Recibir datos como props desde `page.tsx` (si los hay).
  - Manejar estados locales, formularios, eventos y validaciones del cliente.
  - Llamar a las **Server Actions** del archivo `.actions.ts` para operaciones de escritura o consultas interactivas.
  - Manejar feedback al usuario (estados de carga, mensajes de éxito/error, etc.).

```tsx
"use client";

import { useState } from "react";
import { enviarFormularioContacto } from "./contacto.actions";

const ContactoClient = () => {
  const [nombre, setNombre] = useState("");
  // ... más estados

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultado = await enviarFormularioContacto({ nombre, /* ... */ });
    // manejar resultado
  };

  return <form onSubmit={handleSubmit}>{/* UI */}</form>;
};

export default ContactoClient;
```

---

### Archivo 3 — `nombre.actions.ts` (Server Actions)

- **Se ejecuta en el servidor.** Debe tener `"use server"` al inicio.
- Nomenclatura: nombre de la carpeta en **minúscula** + `.actions.ts`.
  - Carpeta `contacto/` → `contacto.actions.ts`
  - Carpeta `ajuste/` dentro de `cajas/` → `cajas.ajuste.actions.ts`
- Responsabilidades:
  - Contener las funciones que se ejecutan del lado del servidor.
  - Validar los datos de entrada antes de ejecutar lógica de negocio.
  - Llamar a utilidades compartidas de `src/app/libs/utils/` para lógica reutilizable.
  - Cada función retorna al menos `{ status: number; message: string }` y opcionalmente datos adicionales.

```ts
"use server";

import { emailEsValido } from "@/app/libs/utils/strings.utils";

export async function enviarFormularioContacto({
  nombre,
  correo,
  asunto,
  mensaje,
}: {
  nombre: string;
  correo: string;
  asunto: string;
  mensaje: string;
}): Promise<{ status: number; message: string }> {
  if (!nombre?.trim()) {
    return { status: 400, message: "El nombre es requerido." };
  }
  if (!emailEsValido(correo)) {
    return { status: 400, message: "El correo electrónico no es válido." };
  }
  // ... más validaciones y lógica

  console.log("[Contacto] Datos recibidos:", { nombre, correo, asunto, mensaje });

  return { status: 200, message: "Mensaje recibido exitosamente." };
}
```

---

## Utilidades compartidas — `src/app/libs/utils/`

Cuando una función de utilidad (validación, transformación, formateo, etc.) puede ser reutilizada en más de un lugar, **no debe vivir dentro del archivo `.actions.ts`**. Debe extraerse a un archivo `.utils.ts` en `src/app/libs/utils/`.

### Nomenclatura

Los archivos de utilidades siguen el patrón `nombreDominio.utils.ts`:

| Archivo                          | Contenido                                          |
| -------------------------------- | -------------------------------------------------- |
| `strings.utils.ts`               | Utilidades de cadenas de texto (emails, formatos…) |
| `fechas.utils.ts` *(ejemplo)*    | Formateo y validación de fechas                    |
| `numeros.utils.ts` *(ejemplo)*   | Operaciones numéricas reutilizables                |

### Cuándo extraer a utils

- La función es una **validación genérica** (ej. `emailEsValido`, `esNumeroEntero`).
- La función puede ser usada tanto en el **cliente** como en el **servidor** (un utils no tiene `"use server"` ni `"use client"`).
- La función ya existe o es candidata a ser reutilizada en otras páginas o acciones.

### Ejemplo real

```ts
// src/app/libs/utils/strings.utils.ts
export const emailEsValido = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

```ts
// src/app/(paths)/contacto/contacto.actions.ts
"use server";

import { emailEsValido } from "@/app/libs/utils/strings.utils";

export async function enviarFormularioContacto({ correo, ... }) {
  if (!emailEsValido(correo)) {
    return { status: 400, message: "El correo electrónico no es válido." };
  }
  // ...
}
```

---

## Ejemplo de referencia completo

La página de Contacto (`src/app/(paths)/contacto/`) implementa la estructura de 3 archivos para una ruta pública con formulario interactivo:

| Archivo                   | Tipo            | Responsabilidad                                              |
| ------------------------- | --------------- | ------------------------------------------------------------ |
| `page.tsx`                | Server Component | Punto de entrada, renderiza `ContactoClient`                 |
| `Contacto.client.tsx`     | Client Component | Formulario con estados, validación cliente y feedback al usuario |
| `contacto.actions.ts`     | Server Actions   | Valida y procesa los datos del formulario en el servidor      |

Y la utilidad `emailEsValido` vive en `src/app/libs/utils/strings.utils.ts` porque es una función de validación genérica reutilizable.

---

## Resumen — ¿cuándo usar cada estructura?

| Situación                                                    | Estructura a usar                          |
| ------------------------------------------------------------ | ------------------------------------------ |
| Página solo de contenido (texto, imágenes, tarjetas)         | `page.tsx` únicamente                      |
| Página con formulario o interacción del usuario              | `page.tsx` + `Nombre.client.tsx` + `nombre.actions.ts` |
| Página privada que consulta datos del servidor al cargar     | `page.tsx` (async) + `Nombre.client.tsx` + `nombre.actions.ts` |
| Función de validación/transformación reutilizable            | `src/app/libs/utils/nombreDominio.utils.ts` |

---

## Convenciones de nomenclatura

| Archivo          | Formato nombre               | Ejemplo                     |
| ---------------- | ---------------------------- | --------------------------- |
| Página           | `page.tsx`                   | `page.tsx` (siempre igual)  |
| Client Component | `NombrePascalCase.client.tsx`| `Contacto.client.tsx`       |
| Server Actions   | `nombre.actions.ts`          | `contacto.actions.ts`       |
| Utilidades       | `dominio.utils.ts`           | `strings.utils.ts`          |

---

## Páginas con tabs (estructura padre + hijas)

Cuando una sección agrupa varias sub-páginas bajo un sistema de pestañas, se añade un nivel más con un `layout.tsx` y un componente `TabsNombre.client.tsx`. Cada pestaña es una página hija con su propia estructura de 3 archivos. Esta estructura se aplica, por ejemplo, en `src/app/(paths)/insumos/cajas/`.

Ver la sección de **Página Padre** para la documentación completa de esta variante.

---

## Página Padre (con tabs)

Una página padre es una carpeta que contiene **3 archivos propios** más **subcarpetas** para cada página hija (tab). La página padre no tiene lógica de negocio propia; su función es organizar la navegación por tabs y redirigir al tab por defecto.

### Archivos de la página padre

#### 1. `page.tsx` — Redirección al tab por defecto

- **Se ejecuta en el servidor.**
- Su única responsabilidad es redirigir al usuario a la ruta de la página hija por defecto.

```tsx
import { redirect } from "next/navigation";
import { PATHS } from "@/lib/constants/global";

export default function CajasPage() {
  redirect(`${PATHS.insumos.cajas.entrada}`);
}
```

#### 2. `layout.tsx` — Layout compartido con tabs

- **Se ejecuta en el servidor.** Es **async**.
- Obtiene el usuario logueado y le pasa los permisos al componente de tabs.
- Renderiza el componente de tabs y el `{children}` de la página hija activa.

```tsx
import TabsCajasClient from "./TabsCajas.client";
import { getUserFromHeaders } from "@/lib/utils/auth.server";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const usuarioLogueado = await getUserFromHeaders();
  if (!usuarioLogueado) redirect("/iniciar-sesion");

  return (
    <>
      <TabsCajasClient usuarioLogueado={usuarioLogueado} />
      {children}
    </>
  );
}
```

#### 3. `TabsNombre.client.tsx` — Componente de tabs

- **Se ejecuta en el browser.** Tiene `"use client"`.
- Renderiza las pestañas, determina el tab activo por `pathname` y navega con `router.push()`.
- Deshabilita tabs según los permisos del usuario.

```tsx
"use client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useRouter, usePathname } from "next/navigation";
import type { UsuarioLogueado } from "@/lib/types/usuario.type";

const TabsCajasClient = ({ usuarioLogueado }: { usuarioLogueado: UsuarioLogueado }) => {
  const router = useRouter();
  const pathname = usePathname();
  // lógica de tab activo y navegación...

  return (
    <Tabs value={tabActivo} onChange={handleCambiarTab}>
      <Tab value="entrada" label="Crear entrada" disabled={!usuarioLogueado.permisos?.insumosCrearEntrada} />
      <Tab value="consultar" label="Consultar" disabled={!usuarioLogueado.permisos?.insumosConsultar} />
      <Tab value="ajuste" label="Ajuste" disabled={!usuarioLogueado.permisos?.insumosRealizarAjustes} />
    </Tabs>
  );
};

export default TabsCajasClient;
```

### Estructura de carpetas de una página padre

```
src/app/(paths)/insumos/cajas/
├── page.tsx                    ← Redirige al tab por defecto
├── layout.tsx                  ← Layout compartido (tabs + children)
├── TabsCajas.client.tsx        ← Componente de tabs
├── entrada/
│   ├── page.tsx
│   ├── Entrada.client.tsx
│   └── cajas.entrada.actions.ts
├── consultar/
│   ├── page.tsx
│   ├── Consultar.client.tsx
│   └── cajas.consultar.actions.ts
└── ajuste/
    ├── page.tsx
    ├── Ajuste.client.tsx
    └── cajas.ajuste.actions.ts
```

El nombre del archivo de actions en páginas hijas sigue el patrón `padre.hija.actions.ts` para evitar colisiones (ej. `cajas.entrada.actions.ts`, `envases.ajuste.actions.ts`).
