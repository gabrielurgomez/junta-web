"use client";

import Image from "next/image";
import { useState } from "react";
import { IconoBirrete } from "@/app/components/iconos/IconoBirrete";
import ModalEstudiosIntegrante from "@/app/components/ModalEstudiosIntegrante";
import type { Integrante } from "@/app/components/equipo.data";

/*
  WCAG 2.2 — 2.4.4 (A), 2.4.13 (AA) y 2.5.8 (AA):
  el botón es un control nativo con nombre accesible único ("Ver estudios de
  <nombre>"), foco visible y objetivo táctil de 44 px. El texto sr-only evita
  que cuatro botones compartan el mismo nombre en la lista de enlaces/botones
  del lector de pantalla.
*/
const TarjetaIntegrante = ({ integrante }: { integrante: Integrante }) => {
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <article className="bg-surface shadow-card flex flex-col overflow-hidden rounded-[12px] transition-shadow duration-200 hover:shadow-[rgba(0,0,0,0.1)_0px_4px_16px]">
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
          <button
            type="button"
            onClick={() => setModalAbierto(true)}
            className="border-primary-400 text-primary-700 hover:bg-primary-50 focus-visible:outline-primary-700 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border px-5 py-3 text-[0.9375rem] leading-tight font-semibold tracking-[0.2px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <IconoBirrete className="h-5 w-5" />
            Ver estudios
            <span className="sr-only"> de {integrante.nombre}</span>
          </button>
        </div>
      </div>

      <ModalEstudiosIntegrante
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        integrante={integrante}
      />
    </article>
  );
};

export default TarjetaIntegrante;
