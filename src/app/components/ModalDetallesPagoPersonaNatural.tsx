"use client";

import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/app/components/ui/Modal";

const CORREO_CONTABILIDAD = "contabilidad@jrci.com.co";

interface DetallesPagoPersonaNaturalProps {
  isOpen: boolean;
  onClose: () => void;
}
/*
  WCAG 2.2 — 1.3.1 (A), 2.4.3 (A) y 2.4.13 (AA):
  el título nombra el diálogo, el orden del contenido es lógico y las acciones
  conservan controles nativos y foco visible. Modal gestiona la trampa y retorno del foco.
*/
const DetallesPagoPersonaNatural = ({
  isOpen,
  onClose,
}: DetallesPagoPersonaNaturalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-xl"
      ariaLabelledBy="detalles-pago-persona-natural-titulo"
    >
      <ModalHeader>
        <h2
          id="detalles-pago-persona-natural-titulo"
          className="text-text-primary pr-6 text-xl leading-[1.3] font-semibold tracking-[-0.2px]"
        >
          Pago para persona natural
        </h2>
      </ModalHeader>

      <ModalBody className="space-y-5">
        <p className="text-text-secondary text-base leading-relaxed">
          Solicite las instrucciones de pago directamente al área de
          Contabilidad de la Junta.
        </p>

        <div className="border-primary-200 bg-primary-50 rounded-xl border p-4 sm:p-5">
          <p className="text-primary-700 text-sm leading-relaxed font-medium sm:text-base">
            Recibirá por correo la información requerida para completar el
            trámite y expedir la factura.
          </p>
        </div>

        <div>
          <h3 className="text-text-primary text-lg leading-[1.4] font-semibold">
            Correo de Contabilidad
          </h3>
          <p className="text-text-secondary mt-2 text-sm leading-relaxed">
            Envíe su solicitud a la siguiente dirección:
          </p>
          <p className="text-primary-700 mt-2 text-base font-semibold break-all">
            {CORREO_CONTABILIDAD}
          </p>
        </div>
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

export default DetallesPagoPersonaNatural;
