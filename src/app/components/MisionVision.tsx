import React from "react";

function IconoMision(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
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
          <div className="flex flex-col items-start rounded-[12px] bg-surface p-8 shadow-card transition-shadow duration-200 hover:shadow-[rgba(0,0,0,0.1)_0px_4px_16px]">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-400">
              <IconoMision className="h-6 w-6" />
            </div>
            <h2 className="mb-3 text-[1.25rem] font-semibold leading-[1.30] tracking-[-0.2px] text-text-primary">
              Misión
            </h2>
            <p className="text-[0.88rem] leading-[1.50] font-normal text-text-secondary">
              La Junta Regional de Calificación de Invalidez de Santander es una entidad que garantiza su imparcialidad, objetividad y transparencia en la emisión de los dictámenes técnico-científicos frente a las inconformidades y controversias del Sistema General de Seguridad Social Integral, y las solicitudes de peritazgo en donde se define el origen, la pérdida de capacidad laboral u ocupacional y la fecha de estructuración respecto de las solicitudes presentadas por las entidades de Seguridad Social ( ARL, AFP, EPS), trabajadores, empleadores así como por las entidades que requieren Peritazgo.
            </p>
          </div>

          {/* Card Visión */}
          <div className="flex flex-col items-start rounded-[12px] bg-surface p-8 shadow-card transition-shadow duration-200 hover:shadow-[rgba(0,0,0,0.1)_0px_4px_16px]">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-400">
              <IconoVision className="h-6 w-6" />
            </div>
            <h2 className="mb-3 text-[1.25rem] font-semibold leading-[1.30] tracking-[-0.2px] text-text-primary">
              Visión
            </h2>
            <p className="text-[0.88rem] leading-[1.50] font-normal text-text-secondary">
              La Junta Regional de Calificación de Invalidez de Santander busca para el año 2030 ser reconocida como una entidad imparcial y confiable, que realiza los procesos con eficiencia, eficacia y con la más alta calidad, contando con profesionales idóneos, encargados de la emisión de dictámenes técnico-científicos bajo los parámetros establecidos en la reglamentación vigente y bajo los lineamientos del Sistema de Gestión de Calidad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
