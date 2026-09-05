"use client";

import { useEffect, useId, useState } from "react";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/app/components/ui/Modal";
import { IconoAjustesVisualizacion } from "@/app/components/iconos/IconoAjustesVisualizacion";
import {
  CLAVE_VISUALIZACION,
  PREFERENCIAS_POR_DEFECTO,
  aplicarPreferencias,
  guardarPreferencias,
  leerPreferencias,
  leerPreferenciasAlmacenadas,
  olvidarPreferencias,
  type Espaciado,
  type PreferenciasVisualizacion,
  type Tamano,
  type Tema,
} from "@/app/libs/utils/visualizacion.utils";

interface Opcion<T extends string> {
  valor: T;
  etiqueta: string;
  descripcion?: string;
}

const OPCIONES_TAMANO: Opcion<Tamano>[] = [
  { valor: "normal", etiqueta: "Normal" },
  { valor: "grande", etiqueta: "Grande", descripcion: "Un 25 % más" },
  { valor: "mayor", etiqueta: "Muy grande", descripcion: "Un 50 % más" },
];

const OPCIONES_TEMA: Opcion<Tema>[] = [
  {
    valor: "sistema",
    etiqueta: "Según el sistema",
    descripcion: "Usa la configuración de su equipo",
  },
  { valor: "claro", etiqueta: "Claro" },
  {
    valor: "alto-contraste",
    etiqueta: "Alto contraste",
    descripcion: "Negro sobre blanco, con bordes marcados",
  },
];

const OPCIONES_ESPACIADO: Opcion<Espaciado>[] = [
  { valor: "normal", etiqueta: "Normal" },
  {
    valor: "amplio",
    etiqueta: "Amplio",
    descripcion: "Más separación entre líneas, letras y palabras",
  },
];

/*
  Grupo de radios nativo dentro de <fieldset>/<legend>: el lector de pantalla
  anuncia el nombre del grupo al entrar y el propio control informa del cambio
  de selección, así que el panel no necesita narrar nada por su cuenta.
*/
function GrupoOpciones<T extends string>({
  titulo,
  nombre,
  opciones,
  valor,
  alCambiar,
}: {
  titulo: string;
  nombre: string;
  opciones: Opcion<T>[];
  valor: T;
  alCambiar: (valor: T) => void;
}) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="text-text-primary mb-2 text-sm font-semibold">
        {titulo}
      </legend>
      <div className="flex flex-col gap-1">
        {opciones.map((opcion) => (
          <label
            key={opcion.valor}
            className="border-border hover:bg-surface-secondary has-[:checked]:border-primary-600 has-[:checked]:bg-primary-50 has-[:focus-visible]:outline-border-focus flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2"
          >
            <input
              type="radio"
              name={nombre}
              value={opcion.valor}
              checked={valor === opcion.valor}
              onChange={() => alCambiar(opcion.valor)}
              className="h-4 w-4 shrink-0 accent-(--color-primary-600)"
            />
            <span className="flex flex-col">
              <span className="text-text-primary text-sm font-medium">
                {opcion.etiqueta}
              </span>
              {opcion.descripcion && (
                <span className="text-text-secondary text-xs">
                  {opcion.descripcion}
                </span>
              )}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/*
  WCAG 2.2 — 1.4.4 (AA) y 1.4.12 (AA): permite ampliar texto y espaciado sin
  depender del zoom del navegador. 1.4.3 / 1.4.6: ofrece una paleta de alto
  contraste. 3.2.6 (A): el disparador ocupa la misma posición en todas las
  páginas, al vivir en la cabecera compartida.

  El estado inicial se lee del DOM con un inicializador perezoso, no de
  localStorage: cuando este componente se monta, el script en línea del layout
  ya escribió los atributos, así que el DOM y React coinciden siempre. No se usa
  `useSyncExternalStore` porque su snapshot debe ser referencialmente estable y
  aquí el estado es un objeto: devolver uno nuevo en cada llamada provocaría un
  bucle de renders.
*/
const PanelVisualizacion = () => {
  const [abierto, setAbierto] = useState(false);
  const [preferencias, setPreferencias] =
    useState<PreferenciasVisualizacion>(leerPreferencias);
  const [anuncio, setAnuncio] = useState("");
  const idTitulo = useId();

  /*
    Sincronización entre pestañas. El evento `storage` solo llega a las OTRAS
    pestañas del mismo origen, nunca a la que escribió, así que no hay bucle.
    Hay que reaplicar los atributos además de actualizar el estado, o esta
    pestaña se seguiría viendo con el ajuste anterior. `key === null` es un
    `localStorage.clear()` y equivale a volver a los valores por defecto.
  */
  useEffect(() => {
    const alCambiarAlmacenamiento = (evento: StorageEvent) => {
      if (evento.key !== null && evento.key !== CLAVE_VISUALIZACION) return;
      const siguientes =
        evento.key === null
          ? PREFERENCIAS_POR_DEFECTO
          : leerPreferenciasAlmacenadas();
      aplicarPreferencias(siguientes);
      setPreferencias(siguientes);
    };

    window.addEventListener("storage", alCambiarAlmacenamiento);
    return () => window.removeEventListener("storage", alCambiarAlmacenamiento);
  }, []);

  const actualizar = (cambio: Partial<PreferenciasVisualizacion>) => {
    const siguientes = { ...preferencias, ...cambio };
    aplicarPreferencias(siguientes);
    guardarPreferencias(siguientes);
    setPreferencias(siguientes);
    setAnuncio("");
  };

  const restablecer = () => {
    aplicarPreferencias(PREFERENCIAS_POR_DEFECTO);
    olvidarPreferencias();
    setPreferencias(PREFERENCIAS_POR_DEFECTO);
    setAnuncio("Ajustes de visualización restablecidos.");
  };

  return (
    <>
      <button
        type="button"
        className="boton-visualizacion"
        title="Ajustes de visualización"
        aria-haspopup="dialog"
        aria-expanded={abierto}
        onClick={() => setAbierto(true)}
      >
        <IconoAjustesVisualizacion className="h-6 w-6" />
        <span className="sr-only">Ajustes de visualización</span>
      </button>

      {/*
        Región viva fuera del diálogo y montada siempre: una live region dentro
        de un componente que se monta y desmonta no llega a anunciarse. Solo se
        usa para "Restablecer", cuyo efecto es difícil de percibir; los radios
        ya se anuncian solos al cambiar de selección.
      */}
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {anuncio}
      </p>

      <Modal
        isOpen={abierto}
        onClose={() => setAbierto(false)}
        maxWidth="max-w-md"
        ariaLabelledBy={idTitulo}
      >
        <ModalHeader>
          <h2
            id={idTitulo}
            className="text-text-primary pr-6 text-xl leading-[1.3] font-semibold tracking-[-0.2px]"
          >
            Ajustes de visualización
          </h2>
        </ModalHeader>

        <ModalBody className="space-y-6">
          <GrupoOpciones
            titulo="Tamaño del texto"
            nombre="visualizacion-tamano"
            opciones={OPCIONES_TAMANO}
            valor={preferencias.tamano}
            alCambiar={(tamano) => actualizar({ tamano })}
          />

          <GrupoOpciones
            titulo="Contraste"
            nombre="visualizacion-tema"
            opciones={OPCIONES_TEMA}
            valor={preferencias.tema}
            alCambiar={(tema) => actualizar({ tema })}
          />

          <GrupoOpciones
            titulo="Espaciado del texto"
            nombre="visualizacion-espaciado"
            opciones={OPCIONES_ESPACIADO}
            valor={preferencias.espaciado}
            alCambiar={(espaciado) => actualizar({ espaciado })}
          />

          {/*
            Muestra en vivo: el diálogo tapa la página, así que sin ella habría
            que cerrar y volver a abrir para comparar el efecto de cada opción.
          */}
          <div
            className="border-border bg-surface-secondary rounded-xl border p-4"
            aria-hidden="true"
          >
            <p className="text-text-primary mb-1 text-base font-semibold">
              Así se verá el sitio
            </p>
            <p className="text-text-secondary text-sm">
              Las juntas de calificación determinan el origen y la pérdida de
              capacidad laboral.
            </p>
          </div>
        </ModalBody>

        {/*
          Ambos extremos de la trampa de foco del Modal son botones (la X arriba
          y estos abajo): el recorrido con Tab no cae nunca en un radio no
          seleccionado, que en un grupo nativo está fuera de la secuencia.
        */}
        <ModalFooter className="flex-col sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={restablecer}
            className="border-border text-text-secondary hover:bg-surface-secondary focus-visible:outline-border-focus min-h-11 w-full rounded-md border px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto"
          >
            Restablecer
          </button>
          <button
            type="button"
            onClick={() => setAbierto(false)}
            className="bg-primary-600 hover:bg-primary-700 focus-visible:outline-border-focus min-h-11 w-full rounded-md px-5 py-3 text-sm font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto"
          >
            Cerrar
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default PanelVisualizacion;
