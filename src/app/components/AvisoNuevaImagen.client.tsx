"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/app/components/ui/Modal";

/*
  Clave de localStorage. Cambiar el sufijo de versión vuelve a mostrar el aviso
  a todos los visitantes, incluidos los que ya lo cerraron.
*/
const CLAVE_AVISO = "aviso-nueva-imagen-v1";
const EVENTO_AVISO = "aviso-nueva-imagen:cambio";

// Respaldo cuando el navegador bloquea el almacenamiento (modo privado): al
// menos el aviso no reaparece dentro de la misma sesión de navegación.
let cerradoEnMemoria = false;

const suscribir = (alCambiar: () => void) => {
  window.addEventListener(EVENTO_AVISO, alCambiar);
  return () => window.removeEventListener(EVENTO_AVISO, alCambiar);
};

// En el servidor el aviso siempre está cerrado: el HTML inicial no lo incluye y
// aparece tras la hidratación, cuando ya se puede consultar localStorage.
const leerEnServidor = () => false;

const leerEnCliente = () => {
  if (cerradoEnMemoria) return false;
  try {
    return window.localStorage.getItem(CLAVE_AVISO) !== "cerrado";
  } catch {
    return true;
  }
};

/*
  El aviso usa Modal, así que es un diálogo modal real: mientras está abierto
  aplica aria-modal, atrapa el Tab dentro del panel y deja fuera del alcance el
  skip link y la navegación. Es deliberado —el anuncio debe verse en la primera
  visita— y por eso ofrece cuatro salidas inmediatas: la X, el botón
  "Entendido", Escape y pulsar fuera del panel.

  WCAG 2.2 — 2.1.2 (A): no hay trampa de teclado, el foco siempre puede
  liberarse con Escape. 2.4.13 (AA): Modal gestiona el foco y lo devuelve al
  cerrar. 1.4.4 (AA): el texto usa unidades relativas y soporta zoom al 200 %.
*/
const AvisoNuevaImagen = () => {
  const abierto = useSyncExternalStore(
    suscribir,
    leerEnCliente,
    leerEnServidor,
  );

  const cerrar = () => {
    cerradoEnMemoria = true;
    try {
      window.localStorage.setItem(CLAVE_AVISO, "cerrado");
    } catch {
      // Sin almacenamiento disponible: basta con el respaldo en memoria.
    }
    window.dispatchEvent(new Event(EVENTO_AVISO));
  };

  return (
    <Modal
      isOpen={abierto}
      onClose={cerrar}
      maxWidth="max-w-lg"
      ariaLabelledBy="aviso-nueva-imagen-titulo"
    >
      <ModalHeader>
        <h2
          id="aviso-nueva-imagen-titulo"
          className="text-text-primary pr-6 text-xl leading-[1.3] font-semibold tracking-[-0.2px]"
        >
          Renovamos nuestra imagen
        </h2>
      </ModalHeader>

      <ModalBody className="space-y-5">
        <div className="bg-surface-secondary border-border flex justify-center rounded-xl border p-6">
          <Image
            src="/imagenes/logo.webp"
            alt="Nuevo logo de la Junta Regional de Calificación de Invalidez de Santander"
            width={250}
            height={165}
            className="h-auto w-40 object-contain"
          />
        </div>

        <p className="text-text-secondary text-base leading-relaxed">
          La Junta Regional de Calificación de Invalidez de Santander actualizó
          su logo y estrenó este sitio web.
        </p>

        <div className="border-primary-200 bg-primary-50 rounded-xl border p-4 sm:p-5">
          <p className="text-primary-700 text-sm leading-relaxed font-medium sm:text-base">
            Seguimos siendo la misma entidad: nuestros servicios, dirección,
            teléfonos y correos de contacto no cambian.
          </p>
        </div>
      </ModalBody>

      <ModalFooter className="flex-col sm:flex-row">
        <button
          type="button"
          onClick={cerrar}
          className="bg-primary-600 hover:bg-primary-700 focus-visible:outline-primary-700 min-h-11 w-full rounded-md px-5 py-3 text-sm font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto"
        >
          Entendido
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default AvisoNuevaImagen;
