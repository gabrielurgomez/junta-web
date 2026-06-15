import React from "react";

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

export function QuienesSomos() {
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center px-4 text-center md:px-6">
        <div className="bg-primary-50 text-primary-400 mb-6 flex h-12 w-12 items-center justify-center rounded-full">
          <IconoInstitucion className="h-6 w-6" />
        </div>

        <h2 className="text-text-primary mb-6 text-[1.50rem] leading-[1.33] font-bold tracking-[-0.3px]">
          ¿Quiénes Somos?
        </h2>

        <p className="text-text-secondary max-w-[720px] text-[1.00rem] leading-[1.625] font-normal">
          Somos un organismo del Sistema de la Seguridad Social Integral del
          Orden Nacional, de creación legal, adscritos al Ministerio del
          Trabajo, con personería jurídica, de derecho privado, sin ánimo de
          lucro, de carácter interdisciplinario, sujetas a revisoría fiscal, con
          autonomía técnica y científica en los dictámenes periciales, cuyas
          decisiones son de carácter obligatorio.
        </p>
      </div>
    </section>
  );
}
