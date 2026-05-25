import React from "react";

function IconoDerechos(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

const derechos = [
  {
    titulo: "Debido proceso",
    descripcion:
      "Tienen derecho a que su caso sea tratado con imparcialidad, celeridad, objetividad, independencia e idoneidad.",
  },
  {
    titulo: "Notificación del dictamen",
    descripcion:
      "Las Juntas de Calificación de Invalidez tienen el deber de notificar los dictámenes de pérdida de capacidad laboral a los interesados.",
  },
  {
    titulo: "Recurso de inconformidad",
    descripcion:
      "Una vez notificado el dictamen, las partes interesadas del Sistema de Seguridad Social tiene 10 días hábiles para interponer un recurso de inconformidad si no está de acuerdo con la calificación.",
  },
  {
    titulo: "Demanda judicial",
    descripcion:
      "Si la inconformidad persiste después de la calificación de la Junta Nacional, puede demandar ante la Justicia Laboral Ordinaria dentro de los tres años siguientes a la notificación.",
  },
  {
    titulo: "Evaluación completa",
    descripcion:
      "Tienen derecho a una valoración médica completa, que determine el origen (común o laboral), la fecha de estructuración y el porcentaje de pérdida de capacidad laboral.",
  },
  {
    titulo: "Garantía de derechos",
    descripcion:
      "La calificación garantiza el derecho a la seguridad social, a una vida digna y al mínimo vital, en caso de que se configure un estado de invalidez.",
  },
  {
    titulo: "Buen trato",
    descripcion:
      "Recibir trato digno por parte del personal médico y administrativo de la Junta.",
  },
  {
    titulo: "Facilidad de acceso",
    descripcion:
      "Contar con una sede de fácil acceso a los usuarios de la Junta.",
  },
  {
    titulo: "Horario",
    descripcion:
      "Que sean respetados los horarios de atención al público y los horarios de citación a valoración.",
  },
  {
    titulo: "Política de tratamiento de datos",
    descripcion:
      "Que se garantice el derecho a la intimidad, la honra, el buen nombre y la confidencialidad de la historia clínica, sin perjuicio de la posibilidad de acceso a la historia con su autorización o por parte de las autoridades.",
  },
];

export function Derechos() {
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="bg-primary-50 text-primary-400 mb-5 flex h-12 w-12 items-center justify-center rounded-full">
            <IconoDerechos className="h-6 w-6" />
          </div>

          <h2 className="text-text-primary text-[1.50rem] leading-[1.33] font-bold tracking-[-0.3px]">
            Derechos
          </h2>
        </div>

        <ul className="grid gap-x-8 gap-y-6 md:grid-cols-2">
          {derechos.map((item) => (
            <li key={item.titulo} className="flex gap-3">
              <span className="bg-primary-400 mt-2.5 h-2 w-2 flex-shrink-0 rounded-full" />
              <div>
                <h3 className="text-text-primary mb-1 text-[0.94rem] font-semibold tracking-[0.2px] uppercase">
                  {item.titulo}
                </h3>
                <p className="text-text-secondary text-[0.88rem] leading-[1.50] font-normal">
                  {item.descripcion}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
