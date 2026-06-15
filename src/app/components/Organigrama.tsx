import type { ReactNode } from "react";

type NodeVariant = "direccion" | "integrante" | "revisor" | "apoyo";

const variantStyles: Record<NodeVariant, string> = {
  // Cajas de mando — azul institucional, texto blanco
  direccion:
    "bg-primary-400 text-white font-semibold uppercase tracking-[0.3px]",
  // Integrantes (sala de decisión) — acento dorado
  integrante:
    "bg-accent-light border border-accent text-text-primary font-semibold",
  // Revisor Fiscal — control independiente, borde discontinuo (azul claro)
  revisor:
    "bg-primary-100 border border-dashed border-primary-300 text-primary-700 font-medium",
  // Equipo de apoyo y auxiliares — neutro
  apoyo: "bg-surface border border-border text-text-secondary font-medium",
};

interface NodeCardProps {
  variant: NodeVariant;
  children: ReactNode;
  className?: string;
}

function NodeCard({ variant, children, className = "" }: NodeCardProps) {
  return (
    <div
      className={`shadow-card flex items-center justify-center rounded-[8px] px-3 py-2.5 text-center text-[0.78rem] leading-[1.3] ${variantStyles[variant]} ${className}`}
    >
      {children}
    </div>
  );
}

// Cada cargo se parte en varias líneas para ahorrar ancho en las tarjetas
function lineas(partes: string[]) {
  return (
    <span className="flex flex-col items-center">
      {partes.map((parte, i) => (
        <span key={i}>{parte}</span>
      ))}
    </span>
  );
}

const asesoria = [
  "Coordinadora de RRHH y SGI",
  "Asesora Jurídica",
  "Contadora",
];

const auxiliares: string[][] = [
  ["Auxiliar", "Recepción"],
  ["Auxiliar", "Radicación", "y citas"],
  ["Auxiliar", "Registro", "pacientes"],
  ["Auxiliar", "Notificaciones"],
  ["Auxiliar", "Recursos"],
  ["Auxiliar", "Archivo"],
  ["Auxiliar", "Contabilidad"],
  ["Auxiliar", "Médico", "(1) y (2)"],
  ["Auxiliar", "Psicóloga"],
  ["Auxiliar", "Servicios", "Generales"],
  ["Super", "numeraria"],
];

const integrantes = ["Médico (1)", "Médico (2)", "Psicóloga"];

export function Organigrama() {
  return (
    <section id="organigrama" className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        {/* Encabezado */}
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="bg-primary-50 text-primary-700 mb-4 inline-flex rounded-full px-3 py-1 text-[0.75rem] font-medium tracking-[0.3px]">
            Estructura organizacional
          </span>
          <h2 className="text-text-primary text-[1.50rem] leading-[1.33] font-bold tracking-[-0.3px]">
            Organigrama
          </h2>
          <p className="text-text-secondary mt-4 max-w-[720px] text-[1.00rem] leading-[1.625] font-normal">
            Estructura organizacional de la Junta Regional de Calificación de
            Invalidez de Santander. Los Integrantes conforman la sala de decisión
            y actúan con independencia, junto al equipo de apoyo administrativo
            que garantiza la operación.
          </p>
        </div>

        {/* Solo este contenedor hace scroll horizontal: la página no se ensancha */}
        <div className="overflow-x-auto pb-4">
          <figure className="m-0 mx-auto w-max">
            <figcaption className="sr-only">
              Organigrama de la Junta Regional de Calificación de Invalidez de
              Santander.
            </figcaption>

            {/* Nivel raíz: une la Dirección con los Integrantes */}
            <ul className="org-comb">
              {/* ── Rama: Dirección Administrativa y Financiera ── */}
              <li>
                <div className="flex flex-col items-center">
                  <NodeCard variant="direccion" className="max-w-[240px]">
                    Director Administrativo y Financiero
                  </NodeCard>

                  {/* Asesoría y apoyo. La línea baja desde Director y cruza
                      este nivel para seguir hasta los auxiliares. */}
                  <span className="org-trunk" aria-hidden="true" />
                  <ul className="org-comb org-comb--through">
                    <li>
                      <NodeCard
                        variant="revisor"
                        className="min-h-[64px] w-[150px]"
                      >
                        Revisor Fiscal
                      </NodeCard>
                    </li>
                    {asesoria.map((cargo) => (
                      <li key={cargo}>
                        <NodeCard
                          variant="apoyo"
                          className="min-h-[64px] w-[150px]"
                        >
                          {cargo}
                        </NodeCard>
                      </li>
                    ))}
                  </ul>

                  {/* Auxiliares */}
                  <span className="org-trunk" aria-hidden="true" />
                  <ul className="org-comb">
                    {auxiliares.map((cargo) => (
                      <li key={cargo.join("-")}>
                        <NodeCard
                          variant="apoyo"
                          className="min-h-[92px] w-[100px] px-1 text-[0.68rem] leading-[1.3] break-words"
                        >
                          {lineas(cargo)}
                        </NodeCard>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {/* ── Rama: Integrantes (Sala de decisión) ── */}
              <li>
                <div className="flex flex-col items-center">
                  <NodeCard variant="direccion" className="max-w-[160px]">
                    Integrantes
                  </NodeCard>

                  <span className="org-trunk" aria-hidden="true" />
                  <ul className="org-comb">
                    {integrantes.map((cargo) => (
                      <li key={cargo}>
                        <NodeCard variant="integrante" className="w-[104px]">
                          {cargo}
                        </NodeCard>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </figure>
        </div>
      </div>
    </section>
  );
}
