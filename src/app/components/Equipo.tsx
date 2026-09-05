import Image from "next/image";
import BotonEstudios from "@/app/components/BotonEstudios.client";
import { integrantes } from "@/app/components/equipo.data";

export function Equipo() {
  return (
    <section
      aria-labelledby="equipo-titulo"
      className="bg-surface-secondary py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2
            id="equipo-titulo"
            className="text-text-primary text-[1.50rem] leading-[1.33] font-bold tracking-[-0.3px]"
          >
            Nuestro Equipo
          </h2>
          <p className="text-text-secondary mt-4 max-w-[720px] text-[1.00rem] leading-[1.625] font-normal">
            Conoce a los profesionales que integran nuestra Junta
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* La tarjeta se renderiza en el servidor; solo el botón que abre el
              modal de estudios se hidrata en el cliente. */}
          {integrantes.map((integrante) => (
            <article
              key={integrante.id}
              className="bg-surface shadow-card flex flex-col overflow-hidden rounded-[12px] transition-shadow duration-200 hover:shadow-[rgba(0,0,0,0.1)_0px_4px_16px]"
            >
              <div className="relative h-[280px] w-full">
                <Image
                  src={integrante.foto}
                  alt={`Fotografía de ${integrante.nombre}`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              <div className="flex flex-1 flex-col items-center p-6 text-center">
                <h3 className="text-text-primary text-[1.13rem] leading-[1.40] font-semibold">
                  {integrante.nombre}
                </h3>
                <p className="text-text-secondary mt-2 text-[0.88rem] leading-[1.50] font-normal">
                  {integrante.cargo}
                </p>

                <div className="mt-auto w-full pt-5">
                  <BotonEstudios integrante={integrante} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
