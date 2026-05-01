"use client";

import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/app/components/ui/Modal";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PoliticaTratamientoDatosProps {
  isOpen: boolean;
  onClose: () => void;
}

// ─── Componente ───────────────────────────────────────────────────────────────

const PoliticaTratamientoDatos = ({
  isOpen,
  onClose,
}: PoliticaTratamientoDatosProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-2xl"
      ariaLabelledBy="politica-modal-title"
    >
      <ModalHeader>
        <h2
          id="politica-modal-title"
          className="text-text-primary pr-6 text-lg leading-snug font-semibold tracking-tight"
        >
          Política de tratamiento de la información y protección de datos
        </h2>
      </ModalHeader>

      <ModalBody className="space-y-4">
        <p className="text-text-secondary text-sm leading-relaxed">
          La{" "}
          <span className="text-text-primary font-semibold">
            JUNTA REGIONAL DE CALIFICACIÓN DE INVALIDEZ DE SANTANDER
          </span>{" "}
          está comprometida en proteger la veracidad, confidencialidad,
          transparencia, integridad y seguridad de la información personal de
          los pacientes, trabajadores, proveedores y terceros que han confiado
          su información personal dentro de las actividades desarrolladas por la
          Junta en cumplimiento del Decreto 1352 de 2013. Este documento
          corresponde al exigido por la Ley 1581 de 2012 – Ley de Protección de
          datos personales – y el Decreto 1377 de 2013, a través de la cual se
          comunica a los titulares de datos personales las directrices y
          lineamientos bajo los cuales será tratada y protegida su información,
          asegurando el respeto de los principios y normas contenidas en la
          legislación vigente.
        </p>

        <p className="text-text-secondary text-sm leading-relaxed">
          En cumplimiento del artículo 13 del Decreto 1377 de 2013, los
          principios y disposiciones contenidas en esta política son aplicables
          a los datos personales registrados en cualquier base de datos
          susceptibles de tratamiento a través de la recolección,
          almacenamiento, uso, circulación y supresión por parte de la{" "}
          <span className="text-text-primary font-semibold">
            JUNTA REGIONAL DE CALIFICACIÓN DE INVALIDEZ DE SANTANDER
          </span>
          , siendo estos de naturaleza pública, privada, semiprivada y sensible.
          El tratamiento de la información se hará en cumplimiento de las
          finalidades y pautas establecidas en la presente política para
          garantizar el adecuado tratamiento de la información personal.
        </p>

        <p className="text-text-secondary text-sm leading-relaxed">
          Esta política será divulgada a todas las partes interesadas de la
          organización.
        </p>

        <div className="pt-2">
          <p className="text-text-primary text-sm font-semibold">
            Sergie Gerardo Rojas Ramírez
          </p>
          <p className="text-text-tertiary text-xs">
            Director Administrativo y Financiero
          </p>
        </div>
      </ModalBody>

      <ModalFooter>
        <p className="text-text-tertiary mr-auto text-xs">
          Fecha de actualización:{" "}
          <span className="text-text-secondary font-medium">
            23 de febrero de 2026
          </span>
        </p>
      </ModalFooter>
    </Modal>
  );
};

export default PoliticaTratamientoDatos;
