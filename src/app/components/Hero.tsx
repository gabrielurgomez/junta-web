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
        <div className="absolute inset-0 bg-primary-900/80 mix-blend-multiply" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex w-full flex-col items-center px-4 md:px-8">
        <div className="mt-8 flex flex-wrap items-center justify-center rounded-full border border-white/30 bg-white/10 p-1.5 text-xs text-white backdrop-blur-sm md:mt-12">
          <span className="px-3 py-1 font-medium tracking-wide">
            Misión médica interdisciplinaria de la región
          </span>
        </div>

        <h1 className="mt-6 max-w-4xl text-balance text-4xl font-bold leading-tight text-white md:text-5xl lg:text-[4rem]">
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

        <form action="/consultar" className="mt-10 flex h-14 w-full max-w-lg items-center rounded-full border border-white/30 bg-white/10 shadow-lg backdrop-blur-md transition-all focus-within:border-white/50 focus-within:bg-white/20 md:mt-12 md:h-16">
          <input
            type="text"
            name="q"
            aria-label="Número de documento o radicado a consultar"
            placeholder="Ingrese No. de documento o radicado"
            className="h-full w-full rounded-full bg-transparent pl-6 pr-2 text-white placeholder:text-white/70 outline-none"
          />
          <button
            type="submit"
            className="mr-1.5 h-10 whitespace-nowrap rounded-full bg-primary-400 px-6 font-semibold text-white shadow-md transition hover:bg-primary-500 hover:shadow-lg focus:ring-4 focus:ring-primary-400/30 md:mr-2 md:h-12 md:px-8"
          >
            Consultar
          </button>
        </form>
      </div>
    </section>
  );
};
