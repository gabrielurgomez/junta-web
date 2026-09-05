import React from "react";

function IconoMision(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function IconoVision(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="4" />
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

export function MisionVision() {
  return (
    <section className="bg-surface-secondary py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Card Misión */}
          <article className="bg-surface shadow-card hover:shadow-card-hover flex flex-col items-start rounded-[12px] p-8 transition-shadow duration-200">
            <div className="bg-primary-50 text-primary-400 mb-5 flex h-12 w-12 items-center justify-center rounded-full">
              <IconoMision className="h-6 w-6" />
            </div>
            <h2 className="text-text-primary mb-3 text-[1.25rem] leading-[1.30] font-semibold tracking-[-0.2px]">
              Misión
            </h2>
            <p className="text-text-secondary text-[0.88rem] leading-[1.50] font-normal">
              La Junta Regional de Calificación de Invalidez de Santander es una
              entidad que garantiza su imparcialidad, objetividad y
              transparencia en la emisión de los dictámenes técnico-científicos
              frente a las inconformidades y controversias del Sistema General
              de Seguridad Social Integral, y las solicitudes de peritazgo en
              donde se define el origen, la pérdida de capacidad laboral u
              ocupacional y la fecha de estructuración respecto de las
              solicitudes presentadas por las entidades de Seguridad Social (
              ARL, AFP, EPS), trabajadores, empleadores así como por las
              entidades que requieren Peritazgo.
            </p>
          </article>

          {/* Card Visión */}
          <article className="bg-surface shadow-card hover:shadow-card-hover flex flex-col items-start rounded-[12px] p-8 transition-shadow duration-200">
            <div className="bg-primary-50 text-primary-400 mb-5 flex h-12 w-12 items-center justify-center rounded-full">
              <IconoVision className="h-6 w-6" />
            </div>
            <h2 className="text-text-primary mb-3 text-[1.25rem] leading-[1.30] font-semibold tracking-[-0.2px]">
              Visión
            </h2>
            <p className="text-text-secondary text-[0.88rem] leading-[1.50] font-normal">
              La Junta Regional de Calificación de Invalidez de Santander busca
              para el año 2030 ser reconocida como una entidad imparcial y
              confiable, que realiza los procesos con eficiencia, eficacia y con
              la más alta calidad, contando con profesionales idóneos,
              encargados de la emisión de dictámenes técnico-científicos bajo
              los parámetros establecidos en la reglamentación vigente y bajo
              los lineamientos del Sistema de Gestión de Calidad.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
