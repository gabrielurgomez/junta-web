import Image from "next/image";

export interface Hero2Props {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt?: string;
  badgeText?: string;
  priority?: boolean;
}

export const Hero2 = ({
  title,
  subtitle,
  imageSrc,
  imageAlt = "Imagen de encabezado",
  badgeText,
  priority = false,
}: Hero2Props) => {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden py-24 text-center text-sm md:px-2 md:py-32">
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Overlay gradient para asegurar la legibilidad del texto */}
        <div className="bg-primary-900/70 absolute inset-0 mix-blend-multiply" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex w-full flex-col items-center px-4 md:px-8">
        {badgeText && (
          <div className="mb-6 flex flex-wrap items-center justify-center rounded-full border border-white/30 bg-white/10 p-1.5 text-xs text-white backdrop-blur-sm md:mb-8">
            <span className="px-3 py-1 font-medium tracking-wide">
              {badgeText}
            </span>
          </div>
        )}

        <h1 className="max-w-4xl text-4xl leading-tight font-bold text-balance text-white md:text-5xl lg:text-6xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-6 max-w-2xl text-base text-white/90 md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};
