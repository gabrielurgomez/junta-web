import type { SVGProps } from "react";

function IconoEstrategia(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

const pilares = [
  {
    numero: "01",
    texto: "Cumplimiento de la normatividad legal aplicable a la entidad",
  },
  {
    numero: "02",
    texto:
      "Garantizar la seguridad de trabajadores, Integrantes, Directora Administrativa, proveedores y actores del Sistema de Seguridad Social Integral",
  },
  {
    numero: "03",
    texto:
      "Garantizar la satisfacción en el servicio de las partes interesadas",
  },
];

export function PerspectivaEstrategica() {
  return (
    <section className="bg-surface-secondary py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="bg-primary-50 text-primary-400 mb-5 flex h-12 w-12 items-center justify-center rounded-full">
            <IconoEstrategia className="h-6 w-6" />
          </div>

          <h2 className="text-text-primary mb-4 text-[1.50rem] leading-[1.33] font-bold tracking-[-0.3px]">
            Perspectiva Estratégica
          </h2>

          <p className="text-text-secondary max-w-[720px] text-[1.00rem] leading-[1.625] font-normal">
            En el Periodo 2023-2030 La Junta Regional de Calificación de
            Invalidez de Santander establece su perspectiva estratégica en el
            cumplimiento de 3 pilares fundamentales:
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pilares.map((pilar) => (
            <article
              key={pilar.numero}
              className="bg-surface shadow-card flex flex-col items-start rounded-[12px] p-8 transition-shadow duration-200 hover:shadow-[rgba(0,0,0,0.1)_0px_4px_16px]"
            >
              <h3 className="sr-only">Pilar {pilar.numero}</h3>
              <span className="text-primary-400 mb-4 text-[2.00rem] leading-none font-bold" aria-hidden="true">
                {pilar.numero}
              </span>
              <p className="text-text-secondary text-[1.00rem] leading-[1.625] font-normal">
                {pilar.texto}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
