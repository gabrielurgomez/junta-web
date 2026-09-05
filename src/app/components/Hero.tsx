import Image from "next/image";

export interface HeroProps {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageClassName?: string;
  badgeText?: string;
  priority?: boolean;
}

const CONTENIDO_INICIO = {
  badgeText: "Misión médica interdisciplinaria de la región",
  imageSrc: "/imagenes/fachada_junta.webp",
  imageAlt:
    "Fachada de la Junta Regional de Calificación de Invalidez de Santander",
  subtitle:
    "Junta Regional de Calificación de Invalidez de Santander. Organismo del Sistema de la Seguridad Social Integral del Orden Nacional.",
  subtituloSecundario:
    "Dictámenes periciales con autonomía técnica y científica sobre evaluación de origen y pérdida de capacidad laboral u ocupacional.",
} as const;

export const Hero = ({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  imageClassName,
  badgeText,
  priority,
}: HeroProps = {}) => {
  const esInicio = title === undefined;

  const imagen = imageSrc ?? CONTENIDO_INICIO.imageSrc;
  const altImagen = imageAlt ?? CONTENIDO_INICIO.imageAlt;
  const textoInsignia = badgeText ?? CONTENIDO_INICIO.badgeText;
  const subtitulo = subtitle ?? CONTENIDO_INICIO.subtitle;
  const prioridadImagen = priority ?? esInicio;

  return (
    <section
      className={[
        "relative flex flex-col items-center justify-center overflow-hidden text-center text-sm md:px-2",
        esInicio ? "flex-1" : "py-24 md:py-32",
      ].join(" ")}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={imagen}
          alt={altImagen}
          fill
          priority={prioridadImagen}
          className={["object-cover object-center", imageClassName]
            .filter(Boolean)
            .join(" ")}
          sizes="100vw"
        />
        <div
          className={[
            "absolute inset-0 mix-blend-multiply",
            esInicio ? "bg-primary-900/80" : "bg-primary-900/70",
          ].join(" ")}
        />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center px-4 md:px-8">
        {textoInsignia && (
          <div
            className={[
              "flex flex-wrap items-center justify-center rounded-full border border-white/30 bg-white/10 p-1.5 text-xs text-white backdrop-blur-sm",
              esInicio ? "mt-8 md:mt-12" : "mb-6 md:mb-8",
            ].join(" ")}
          >
            <span className="px-3 py-1 font-medium tracking-wide">
              {textoInsignia}
            </span>
          </div>
        )}

        {esInicio ? (
          <h1 className="mt-6 max-w-4xl text-4xl leading-tight font-bold text-balance text-white md:text-5xl lg:text-[4rem]">
            Calificando con Ética, Equidad y{" "}
            <span className="text-accent-sobre-oscuro">Transparencia</span>
          </h1>
        ) : (
          <h1 className="max-w-4xl text-4xl leading-tight font-bold text-balance text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
        )}

        <p className="mt-6 max-w-2xl text-base text-white/90 md:text-lg">
          {subtitulo}
        </p>

        {esInicio && (
          <p className="mt-3 max-w-xl text-sm text-white/80 md:mt-4 md:text-base">
            {CONTENIDO_INICIO.subtituloSecundario}
          </p>
        )}
      </div>
    </section>
  );
};
