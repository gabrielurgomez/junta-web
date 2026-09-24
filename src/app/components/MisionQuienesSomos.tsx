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

function IconoInstitucion(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 21h18" />
      <path d="M5 21V7l8-4 8 4v14" />
      <path d="M9 21v-6h6v6" />
    </svg>
  );
}

export function MisionQuienesSomos() {
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

          {/* Card Quiénes Somos */}
          <article className="bg-surface shadow-card hover:shadow-card-hover flex flex-col items-start rounded-[12px] p-8 transition-shadow duration-200">
            <div className="bg-primary-50 text-primary-400 mb-5 flex h-12 w-12 items-center justify-center rounded-full">
              <IconoInstitucion className="h-6 w-6" />
            </div>
            <h2 className="text-text-primary mb-3 text-[1.25rem] leading-[1.30] font-semibold tracking-[-0.2px]">
              ¿Quiénes Somos?
            </h2>
            <p className="text-text-secondary text-[0.88rem] leading-[1.50] font-normal">
              Somos un organismo del Sistema de la Seguridad Social Integral del
              Orden Nacional, de creación legal, adscritos al Ministerio del
              Trabajo, con personería jurídica, de derecho privado, sin ánimo de
              lucro, de carácter interdisciplinario, sujetas a revisoría fiscal,
              con autonomía técnica y científica en los dictámenes periciales,
              cuyas decisiones son de carácter obligatorio.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
