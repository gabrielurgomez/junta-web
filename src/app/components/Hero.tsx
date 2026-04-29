import Image from "next/image";
export const Hero = () => {
  return (
    <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden text-center text-sm md:px-2">
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/fachada_junta.webp"
          alt="Fachada de la Junta Regional de Calificación de Invalidez de Santander"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Overlay gradient para asegurar la legibilidad del texto */}
        <div className="bg-primary-900/80 absolute inset-0 mix-blend-multiply" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex w-full flex-col items-center px-4 md:px-8">
        <div className="mt-8 flex flex-wrap items-center justify-center rounded-full border border-white/30 bg-white/10 p-1.5 text-xs text-white backdrop-blur-sm md:mt-12">
          <span className="px-3 py-1 font-medium tracking-wide">
            Misión médica interdisciplinaria de la región
          </span>
        </div>

        <h1 className="mt-6 max-w-4xl text-4xl leading-tight font-bold text-balance text-white md:text-5xl lg:text-[4rem]">
          Calificando con Ética, Equidad y{" "}
          <span className="text-accent">Transparencia</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base text-white/90 md:text-lg">
          Junta Regional de Calificación de Invalidez de Santander. Organismo
          del Sistema de la Seguridad Social Integral del Orden Nacional.
        </p>

        <p className="mt-3 max-w-xl text-sm text-white/80 md:mt-4 md:text-base">
          Dictámenes periciales con autonomía técnica y científica sobre
          evaluación de origen y pérdida de capacidad laboral u ocupacional.
        </p>
      </div>
    </section>
  );
};
