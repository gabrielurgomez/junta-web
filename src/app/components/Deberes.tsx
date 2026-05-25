import React from "react";

function IconoDeberes(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  );
}

const deberes = [
  {
    titulo: "Aportar la documentación",
    descripcion:
      "Es su deber aportar toda la información y documentación médica, laboral y personal requerida para el proceso de calificación de invalidez, esto incluye su documento de identidad para el registro a valoración.",
  },
  {
    titulo: "Consentimiento informado",
    descripcion:
      "Otorgar el consentimiento informado para la validación de su expediente.",
  },
  {
    titulo: "Asistir a las valoraciones",
    descripcion:
      "Deben asistir a la hora y fecha indicada a las valoraciones médicas, citas y exámenes que la Junta de Calificación o los interconsultores designen, según lo establece el manual de procedimientos.",
  },
  {
    titulo: "Seguir las instrucciones",
    descripcion:
      "Deben seguir las indicaciones y recomendaciones de los profesionales de la salud que participan en el proceso de calificación, aportando la documentación solicitada.",
  },
  {
    titulo: "Actuar de buena fe",
    descripcion:
      "Tienen el deber de actuar con honestidad y transparencia durante todo el proceso, proporcionando información veraz y completa.",
  },
  {
    titulo: "Notificaciones a las entidades",
    descripcion:
      "Deben notificar a las entidades competentes (EPS, ARL o AFP) cualquier cambio en su situación médica o laboral que pueda afectar el proceso de calificación.",
  },
  {
    titulo: "Buen trato",
    descripcion:
      "Tratar con respeto al personal administrativo de la Junta.",
  },
];

export function Deberes() {
  return (
    <section className="bg-surface-secondary py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-400">
            <IconoDeberes className="h-6 w-6" />
          </div>

          <h2 className="text-[1.50rem] font-bold leading-[1.33] tracking-[-0.3px] text-text-primary">
            Deberes
          </h2>
        </div>

        <ul className="grid gap-x-8 gap-y-6 md:grid-cols-2">
          {deberes.map((item) => (
            <li key={item.titulo} className="flex gap-3">
              <span className="mt-2.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary-400" />
              <div>
                <h3 className="mb-1 text-[0.94rem] font-semibold uppercase tracking-[0.2px] text-text-primary">
                  {item.titulo}
                </h3>
                <p className="text-[0.88rem] leading-[1.50] font-normal text-text-secondary">
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
