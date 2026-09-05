"use client";

import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/app/components/ui/Modal";
import type { Integrante } from "@/app/components/equipo.data";

interface ModalEstudiosIntegranteProps {
  isOpen: boolean;
  onClose: () => void;
  integrante: Integrante;
}

/*
  WCAG 2.2 — 1.3.1 (A), 2.4.3 (A) y 2.4.13 (AA):
  el diálogo se nombra con el título visible (aria-labelledby), la formación se
  expone como lista para que el lector de pantalla anuncie la cantidad de
  estudios, y el cierre usa un control nativo con foco visible. Modal se encarga
  de la trampa de foco y de devolverlo al botón "Ver estudios" al cerrar.
*/
const ModalEstudiosIntegrante = ({
  isOpen,
  onClose,
  integrante,
}: ModalEstudiosIntegranteProps) => {
  const tituloId = `estudios-${integrante.id}-titulo`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-xl"
      ariaLabelledBy={tituloId}
    >
      <ModalHeader>
        <h2
          id={tituloId}
          className="text-text-primary pr-6 text-xl leading-[1.3] font-semibold tracking-[-0.2px]"
        >
          {integrante.nombre}
        </h2>
        <p className="text-text-secondary mt-1 text-sm leading-relaxed">
          {integrante.cargo}
        </p>
      </ModalHeader>

      <ModalBody className="space-y-4">
        <h3 className="text-text-primary text-lg leading-[1.4] font-semibold">
          Estudios
        </h3>
        <ul className="space-y-3">
          {integrante.estudios.map((estudio) => (
            <li key={estudio} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="bg-primary-400 mt-2 h-2 w-2 shrink-0 rounded-full"
              />
              <span className="text-text-secondary text-base leading-relaxed">
                {estudio}
              </span>
            </li>
          ))}
        </ul>
      </ModalBody>

      <ModalFooter className="flex-col sm:flex-row">
        <button
          type="button"
          onClick={onClose}
          className="border-primary-400 text-primary-700 hover:bg-primary-50 focus-visible:outline-primary-700 min-h-11 w-full rounded-md border px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto"
        >
          Cerrar
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalEstudiosIntegrante;
