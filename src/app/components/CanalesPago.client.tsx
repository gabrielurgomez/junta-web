"use client";

import { useState, type ReactNode, type SVGProps } from "react";
import DetallesPagoPersonaNatural from "@/app/components/ModalDetallesPagoPersonaNatural";

const URL_PAGO_ENTIDADES =
  "https://www.pagosvirtualesavvillas.com.co/personal/pagos/";

function IconoPago(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <path d="M2 10h20" />
      <path d="M6 15h3" />
    </svg>
  );
}

function IconoEnlaceExterno(props: SVGProps<SVGSVGElement>) {
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

function IconoOjo(props: SVGProps<SVGSVGElement>) {
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
      <path d="M2.1 12a10.4 10.4 0 0 1 19.8 0 10.4 10.4 0 0 1-19.8 0Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

interface CanalPagoCardProps {
  titulo: string;
  descripcion: string;
  accion: ReactNode;
}

function CanalPagoCard({ titulo, descripcion, accion }: CanalPagoCardProps) {
  return (
    <li>
      <article className="bg-surface border-border shadow-card flex h-full flex-col rounded-xl border p-6 md:p-8">
        <div className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className="bg-primary-50 text-primary-600 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
          >
            <IconoPago className="h-6 w-6" />
          </span>

          <div className="min-w-0 flex-1">
            <h3 className="text-text-primary text-xl leading-[1.3] font-semibold tracking-[-0.2px]">
              {titulo}
            </h3>
            <p className="text-text-secondary mt-2 text-base leading-relaxed">
              {descripcion}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-1 items-end">{accion}</div>
      </article>
    </li>
  );
}

/*
  WCAG 2.2 — 2.4.4 (A), 2.4.13 (AA) y 2.5.8 (AA):
  las acciones usan controles nativos, texto descriptivo, foco visible y un
  objetivo táctil mínimo de 44 px. El enlace externo avisa el cambio de pestaña.
*/
const CanalesPagoClient = () => {
  const [modalPersonaNaturalAbierto, setModalPersonaNaturalAbierto] =
    useState(false);

  const clasesAccion =
    "bg-primary-600 hover:bg-primary-700 focus-visible:outline-primary-700 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-[0.9375rem] leading-tight font-semibold tracking-[0.2px] text-white transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto";

  return (
    <>
      <ul className="mt-8 grid gap-5 md:grid-cols-2">
        <CanalPagoCard
          titulo="Pagos (Entidades)"
          descripcion="Acceda al canal de pago para entidades y realice el proceso correspondiente."
          accion={
            <a
              href={URL_PAGO_ENTIDADES}
              target="_blank"
              rel="noopener noreferrer"
              className={clasesAccion}
            >
              <IconoEnlaceExterno className="h-5 w-5" />
              Ir al sitio
              <span className="sr-only">
                {" "}
                de pago para entidades (se abre en una nueva pestaña)
              </span>
            </a>
          }
        />

        <CanalPagoCard
          titulo="Pagos (Persona natural)"
          descripcion="Consulte las instrucciones de pago para personas naturales."
          accion={
            <button
              type="button"
              onClick={() => setModalPersonaNaturalAbierto(true)}
              className={clasesAccion}
            >
              <IconoOjo className="h-5 w-5" />
              Ver detalles
              <span className="sr-only"> de pago para persona natural</span>
            </button>
          }
        />
      </ul>

      <DetallesPagoPersonaNatural
        isOpen={modalPersonaNaturalAbierto}
        onClose={() => setModalPersonaNaturalAbierto(false)}
      />
    </>
  );
};

export default CanalesPagoClient;
