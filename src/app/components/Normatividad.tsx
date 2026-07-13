import { statSync } from "node:fs";
import { join } from "node:path";
import type { SVGProps } from "react";

/* ============================================================
   Normatividad — Políticas institucionales y marco normativo
   Cada documento es un PDF que se abre en una nueva pestaña.
   ============================================================ */

interface DocumentoNormativoBase {
  titulo: string;
  /** Epígrafe oficial de la norma (opcional en políticas). */
  descripcion?: string;
  /** Ruta del PDF en /public. */
  archivo: string;
}

interface DocumentoNormativo extends DocumentoNormativoBase {
  /** Tamaño legible calculado desde el archivo real en /public. */
  tamano: string;
}

function formatearTamanoDocumento(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  const megabytes = bytes / (1024 * 1024);
  return `${megabytes.toFixed(1).replace(".", ",")} MB`;
}

function enriquecerDocumentosConTamano(
  documentos: DocumentoNormativoBase[],
): DocumentoNormativo[] {
  return documentos.map((documento) => {
    const archivoRelativo = documento.archivo.replace(/^\/+/, "");
    const rutaArchivo = join(process.cwd(), "public", archivoRelativo);

    try {
      const tamanoEnBytes = statSync(rutaArchivo).size;

      return {
        ...documento,
        tamano: formatearTamanoDocumento(tamanoEnBytes),
      };
    } catch {
      return {
        ...documento,
        tamano: "tamaño no disponible",
      };
    }
  });
}

const POLITICAS: DocumentoNormativo[] = enriquecerDocumentosConTamano([
  {
    titulo: "Política de Seguridad y Salud en el Trabajo",
    archivo: "/documentos/normatividad/politica-seguridad-salud-trabajo.pdf",
  },
  {
    titulo: "Política de Prevención del Acoso Laboral",
    archivo: "/documentos/normatividad/politica-prevencion-acoso-laboral.pdf",
  },
  {
    titulo:
      "Política de Prevención del Consumo de Alcohol, Vapeadores y Drogas",
    archivo:
      "/documentos/normatividad/politica-prevencion-consumo-alcohol-drogas.pdf",
  },
  {
    titulo: "Política de Desconexión Laboral",
    archivo: "/documentos/normatividad/politica-desconexion-laboral.pdf",
  },
  {
    titulo: "Política de Prevención del Acoso Sexual",
    archivo: "/documentos/normatividad/politica-acoso-sexual.pdf",
  },
  {
    titulo: "Política de Gestión de Calidad",
    archivo: "/documentos/normatividad/politica-gestion-calidad.pdf",
  },
  {
    titulo: "Política de Protección de Datos",
    archivo: "/documentos/normatividad/politica-proteccion-datos.pdf",
  },
  {
    titulo: "Política de Equidad de Género",
    archivo: "/documentos/normatividad/politica-equidad-genero.pdf",
  },
  {
    titulo:
      "Política Interna para el Uso Responsable de Audífonos, Dispositivos de Audio y Video y Control del Ruido en el Lugar de Trabajo",
    archivo: "/documentos/normatividad/politica-uso-responsable-audifonos.pdf",
  },
  {
    titulo: "Política del Sistema de Gestión de Seguridad de la Información",
    archivo: "/documentos/normatividad/politica-seguridad-informacion.pdf",
  },
]);

const NORMAS: DocumentoNormativo[] = enriquecerDocumentosConTamano([
  {
    titulo: "Ley 100 de 1993",
    descripcion:
      "Por la cual se crea el sistema de seguridad social integral y se dictan otras disposiciones.",
    archivo: "/documentos/normatividad/ley-100-1993.pdf",
  },
  {
    titulo:
      "Reglamento Interno de la Junta Regional de Calificación de Invalidez 2025",
    descripcion:
      "Reglamento de funcionamiento de la Junta Regional de Calificación de Invalidez de Santander, año 2025.",
    archivo: "/documentos/normatividad/reglamento-interno-jrcis-2025.pdf",
  },
  {
    titulo: "Decreto 1040 de 2022",
    descripcion:
      "Valor de los honorarios para las víctimas del conflicto armado.",
    archivo: "/documentos/normatividad/decreto-1040-2022.pdf",
  },
  {
    titulo: "Ley 1562 de 2012",
    descripcion:
      "Por la cual se modifica el sistema de riesgos laborales y se dictan otras disposiciones en materia de salud ocupacional.",
    archivo: "/documentos/normatividad/ley-1562-2012.pdf",
  },
  {
    titulo: "Resolución 0312 de 2019",
    descripcion:
      "Por la cual se definen los estándares mínimos del Sistema de Gestión de Seguridad y Salud en el Trabajo.",
    archivo: "/documentos/normatividad/resolucion-0312-2019.pdf",
  },
  {
    titulo: "Decreto 1295 de 1994",
    descripcion:
      "Por el cual se determina la organización y administración del Sistema General de Riesgos Profesionales.",
    archivo: "/documentos/normatividad/decreto-1295-1994.pdf",
  },
  {
    titulo: "Decreto 917 de 1999",
    descripcion: "Por el cual se modifica el Decreto 692 de 1995.",
    archivo: "/documentos/normatividad/decreto-917-1999.pdf",
  },
  {
    titulo: "Decreto 2566 de 2009",
    descripcion:
      "Por el cual se adopta la tabla de enfermedades profesionales.",
    archivo: "/documentos/normatividad/decreto-2566-2009.pdf",
  },
  {
    titulo: "Decreto 019 de 2012",
    descripcion:
      "Por el cual se dictan normas para suprimir o reformar regulaciones, procedimientos y trámites innecesarios existentes en la administración pública.",
    archivo: "/documentos/normatividad/decreto-019-2012.pdf",
  },
  {
    titulo: "Decreto 1352 de 2013",
    descripcion:
      "Por el cual se reglamenta la organización y funcionamiento de las juntas de calificación de invalidez y se dictan otras disposiciones.",
    archivo: "/documentos/normatividad/decreto-1352-2013.pdf",
  },
  {
    titulo: "Decreto 1507 de 2014",
    descripcion:
      "Por el cual se expide el manual único para la calificación de la pérdida de la capacidad laboral y ocupacional.",
    archivo: "/documentos/normatividad/decreto-1507-2014.pdf",
  },
  {
    titulo: "Decreto 1477 de 2014",
    descripcion: "Por el cual se expide la tabla de enfermedades laborales.",
    archivo: "/documentos/normatividad/decreto-1477-2014.pdf",
  },
  {
    titulo: "Resolución 2050 de 2022",
    descripcion:
      "Por la cual se establece el Manual de Funcionamiento de las Juntas de Calificación.",
    archivo: "/documentos/normatividad/resolucion-2050-2022.pdf",
  },
  {
    titulo: "Resolución 2051 de 2022",
    descripcion:
      "Por la cual se establecen los estándares mínimos del Sistema Obligatorio de Garantía de la Calidad del Sistema General de Riesgos Laborales para las Juntas de Calificación.",
    archivo: "/documentos/normatividad/resolucion-2051-2022.pdf",
  },
  {
    titulo: "Decreto 1072 de 2015",
    descripcion:
      "Por el cual se expide el Decreto Único Reglamentario del Sector Trabajo.",
    archivo: "/documentos/normatividad/decreto-1072-2015.pdf",
  },
]);

/* Ícono de documento PDF (decorativo). */
function IconoDocumento(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6" />
      <path d="M9 17h4" />
    </svg>
  );
}

/* Ícono de nueva ventana / enlace externo (decorativo). */
function IconoNuevaVentana(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

/*
  WCAG 2.2 — 1.1.1 (A), 2.4.4 (A), 1.4.11 (AA), 2.4.13 (AA), 2.5.8 (AA):
  - El nombre accesible del enlace incluye el título, el formato/tamaño y el
    aviso de que se abre en nueva ventana (texto sr-only).
  - El pseudo-elemento `::after` extiende el área activable a toda la tarjeta
    (objetivo ≥ 24×24 px) sin meter la descripción dentro del nombre del enlace.
  - La tarjeta refuerza el foco con `has-[a:focus-visible]`, pero el propio enlace
    conserva un indicador visible como fallback si esa variante CSS no estuviera disponible.
*/
function DocumentoCard({ doc }: { doc: DocumentoNormativo }) {
  return (
    <li>
      <article className="bg-surface border-border shadow-card has-[a:focus-visible]:outline-primary-400 relative flex h-full items-start gap-4 rounded-xl border p-5 transition-shadow duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] has-[a:focus-visible]:shadow-[0_4px_16px_rgba(0,0,0,0.1)] has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2">
        <span
          aria-hidden="true"
          className="bg-primary-50 text-primary-600 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
        >
          <IconoDocumento className="h-6 w-6" />
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="text-text-primary text-xl leading-[1.3] font-semibold tracking-[-0.2px]">
            <a
              href={doc.archivo}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-700 focus-visible:outline-primary-400 after:absolute after:inset-0 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {doc.titulo}
              <span className="sr-only">
                {" "}
                (documento PDF, {doc.tamano}. Se abre en una nueva ventana.)
              </span>
            </a>
            <IconoNuevaVentana className="text-text-tertiary ml-1.5 inline-block h-4 w-4 align-[-2px]" />
          </h3>

          {doc.descripcion && (
            <p className="text-text-secondary mt-1.5 text-sm leading-relaxed">
              {doc.descripcion}
            </p>
          )}

          {/* Metadato visual; el lector de pantalla ya recibe el dato vía sr-only. */}
          <p
            aria-hidden="true"
            className="text-text-secondary mt-3 flex items-center gap-2 text-xs font-medium"
          >
            <span className="bg-primary-50 text-primary-700 rounded px-1.5 py-0.5 text-[0.69rem] font-semibold tracking-wide">
              PDF
            </span>
            {doc.tamano}
          </p>
        </div>
      </article>
    </li>
  );
}

export function Normatividad() {
  return (
    <>
      {/* Introducción + índice de la página */}
      <section className="mx-auto w-full max-w-300 px-4 pt-12 md:px-8 md:pt-16">
        <p className="text-text-secondary max-w-[65ch] text-base leading-relaxed">
          Consulta y descarga las políticas institucionales y el marco normativo
          que rige la actuación de la Junta Regional de Calificación de
          Invalidez de Santander. Todos los documentos están disponibles en
          formato PDF.
        </p>

        {/* WCAG 2.2 — 2.4.1 Bypass Blocks (A): índice para saltar a cada grupo. */}
        <nav aria-label="Secciones de normatividad" className="mt-6">
          <ul className="flex flex-wrap gap-3">
            <li>
              <a
                href="#politicas"
                className="border-border bg-surface text-text-secondary hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700 focus-visible:outline-primary-400 inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Políticas institucionales
              </a>
            </li>
            <li>
              <a
                href="#marco-normativo"
                className="border-border bg-surface text-text-secondary hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700 focus-visible:outline-primary-400 inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Marco normativo
              </a>
            </li>
          </ul>
        </nav>
      </section>

      {/* Políticas institucionales */}
      <section
        id="politicas"
        aria-labelledby="politicas-titulo"
        className="mx-auto w-full max-w-300 scroll-mt-20 px-4 py-12 md:px-8 md:py-16"
      >
        <h2
          id="politicas-titulo"
          className="text-text-primary text-2xl leading-[1.33] font-bold tracking-[-0.3px]"
        >
          Políticas institucionales
        </h2>
        <p className="text-text-secondary mt-3 max-w-[65ch] text-base leading-relaxed">
          Lineamientos internos que orientan la gestión y el comportamiento
          institucional de la entidad.
        </p>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {POLITICAS.map((doc) => (
            <DocumentoCard key={doc.archivo} doc={doc} />
          ))}
        </ul>
      </section>

      {/* Marco normativo — fondo alterno (DESIGN.md §5) */}
      <section
        id="marco-normativo"
        aria-labelledby="marco-titulo"
        className="bg-surface-secondary scroll-mt-20"
      >
        <div className="mx-auto w-full max-w-300 px-4 py-16 md:px-8 md:py-24">
          <h2
            id="marco-titulo"
            className="text-text-primary text-2xl leading-[1.33] font-bold tracking-[-0.3px]"
          >
            Marco normativo
          </h2>
          <p className="text-text-secondary mt-3 max-w-[65ch] text-base leading-relaxed">
            Leyes, decretos y resoluciones que regulan la organización, el
            funcionamiento y las competencias de las Juntas de Calificación de
            Invalidez.
          </p>
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {NORMAS.map((doc) => (
              <DocumentoCard key={doc.archivo} doc={doc} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
