import TarjetaIntegrante from "@/app/components/TarjetaIntegrante.client";
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
          {integrantes.map((integrante) => (
            <TarjetaIntegrante key={integrante.id} integrante={integrante} />
          ))}
        </div>
      </div>
    </section>
  );
}
