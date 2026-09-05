"use client";

import { useState } from "react";
import { IconoBirrete } from "@/app/components/iconos/IconoBirrete";
import ModalEstudiosIntegrante from "@/app/components/ModalEstudiosIntegrante";
import type { Integrante } from "@/app/components/equipo.data";

/*
  Único fragmento de la tarjeta que necesita estado de cliente: la foto, el
  nombre y el cargo se quedan en el árbol de servidor (Equipo.tsx).

  WCAG 2.2 — 2.4.4 (A), 2.4.13 (AA) y 2.5.8 (AA):
  control nativo con nombre accesible único ("Ver estudios de <nombre>"), foco
  visible y objetivo táctil de 44 px. El texto sr-only evita que los cuatro
  botones se anuncien igual en la lista de controles del lector de pantalla.
*/
const BotonEstudios = ({ integrante }: { integrante: Integrante }) => {
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setModalAbierto(true)}
        className="border-primary-400 text-primary-700 hover:bg-primary-50 focus-visible:outline-primary-700 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border px-5 py-3 text-[0.9375rem] leading-tight font-semibold tracking-[0.2px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <IconoBirrete className="h-5 w-5" />
        Ver estudios
        <span className="sr-only"> de {integrante.nombre}</span>
      </button>

      <ModalEstudiosIntegrante
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        integrante={integrante}
      />
    </>
  );
};

export default BotonEstudios;
