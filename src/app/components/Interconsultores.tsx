import { interconsultores } from "./interconsultores.data";

// Renderiza la lista de correos como texto plano (sin enlaces mailto). Cada
// correo se muestra en una sola línea; varios se apilan verticalmente.
function Correos({ valores }: { valores: string[] }) {
  if (valores.length === 0) {
    return <span className="text-text-tertiary">—</span>;
  }

  return (
    <span className="flex flex-col gap-1">
      {valores.map((valor) => (
        <span key={valor} className="whitespace-nowrap">
          {valor}
        </span>
      ))}
    </span>
  );
}

// Muestra un valor de texto simple o un guion cuando el dato está vacío,
// para no dejar celdas en blanco sin significado.
function Texto({ valor }: { valor: string }) {
  if (!valor) {
    return <span className="text-text-tertiary">—</span>;
  }
  return <span className="break-words">{valor}</span>;
}

export function Interconsultores() {
  return (
    <section
      id="interconsultores"
      aria-labelledby="interconsultores-titulo"
      className="bg-surface-secondary py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        {/* Encabezado — mismo patrón que Organigrama */}
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="bg-primary-50 text-primary-700 mb-4 inline-flex rounded-full px-3 py-1 text-[0.75rem] font-medium tracking-[0.3px]">
            Red de apoyo
          </span>
          <h2
            id="interconsultores-titulo"
            className="text-text-primary text-[1.50rem] leading-[1.33] font-bold tracking-[-0.3px]"
          >
            Directorio de interconsultores
          </h2>
          <p className="text-text-secondary mt-4 max-w-[720px] text-[1.00rem] leading-[1.625] font-normal">
            Profesionales y entidades interconsultoras que apoyan a la Junta
            Regional de Santander en la valoración especializada de los
            pacientes durante el proceso de calificación.
          </p>
        </div>

        {/*
          Tabla de datos accesible (WCAG 1.3.1 A). El contenedor es una región
          desplazable operable por teclado (WCAG 2.1.1 A / 2.4.13 AA + skill §13):
          role="region", aria-label, tabIndex y foco visible. La tabla conserva
          su semántica nativa (no se convierte en divs) y se asocia al encabezado
          de la sección mediante <caption>.
        */}
        <div
          className="bg-surface focus-visible:outline-primary-400 shadow-card overflow-x-auto rounded-[12px] focus-visible:outline-2 focus-visible:outline-offset-2"
          role="region"
          aria-label="Directorio de interconsultores"
          tabIndex={0}
        >
          <table className="w-full min-w-[880px] border-collapse text-left text-[0.875rem]">
            <caption className="sr-only">
              Directorio de profesionales o entidades interconsultores de la
              Junta Regional de Calificación de Invalidez de Santander, con su
              especialidad, dirección, teléfono y correo electrónico.
            </caption>
            <thead>
              <tr className="bg-primary-600 text-white">
                <th
                  scope="col"
                  className="px-4 py-3 font-semibold tracking-[0.2px]"
                >
                  Profesional o entidad
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 font-semibold tracking-[0.2px]"
                >
                  Especialidad
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 font-semibold tracking-[0.2px]"
                >
                  Dirección
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 font-semibold tracking-[0.2px]"
                >
                  Teléfono
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 font-semibold tracking-[0.2px]"
                >
                  Correo electrónico
                </th>
              </tr>
            </thead>
            <tbody>
              {interconsultores.map((item, indice) => (
                <tr
                  key={`${item.nombre}-${indice}`}
                  className="border-border even:bg-surface-secondary border-b align-top last:border-b-0"
                >
                  <th
                    scope="row"
                    className="text-text-primary px-4 py-3 text-left font-medium"
                  >
                    {item.nombre}
                  </th>
                  <td className="text-text-secondary px-4 py-3">
                    <Texto valor={item.especialidad} />
                  </td>
                  <td className="text-text-secondary px-4 py-3">
                    <Texto valor={item.direccion} />
                  </td>
                  <td className="text-text-secondary px-4 py-3 whitespace-nowrap">
                    <Texto valor={item.telefono} />
                  </td>
                  <td className="text-text-secondary px-4 py-3">
                    <Correos valores={item.correos} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
