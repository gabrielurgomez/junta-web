import type { SVGProps } from "react";
import CanalesPagoClient from "@/app/components/CanalesPago.client";

function IconoBanco(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m3 10 9-5 9 5" />
      <path d="M5 10v7" />
      <path d="M9 10v7" />
      <path d="M15 10v7" />
      <path d="M19 10v7" />
      <path d="M3 19h18" />
    </svg>
  );
}

interface CuentaPago {
  concepto: string;
  numero: string;
}

const CUENTAS_PAGO: CuentaPago[] = [
  {
    concepto: "Pago de honorarios por trámite de calificación",
    numero: "903-00965-2",
  },
  {
    concepto: "Pago de honorarios de equipo interconsultor",
    numero: "903-05088-8",
  },
];

export function Pagos() {
  return (
    <>
      <section
        aria-labelledby="canales-pago-titulo"
        className="mx-auto w-full max-w-300 px-4 py-16 md:px-8 md:py-24"
      >
        <div className="max-w-[65ch]">
          <h2
            id="canales-pago-titulo"
            className="text-text-primary text-2xl leading-[1.33] font-bold tracking-[-0.3px]"
          >
            Canales de pago
          </h2>
          <p className="text-text-secondary mt-3 text-base leading-relaxed">
            Seleccione el canal que corresponde a su tipo de trámite.
          </p>
        </div>

        <CanalesPagoClient />

        <aside className="border-primary-200 bg-primary-50 mt-10 rounded-xl border p-6 md:p-8">
          <h3 className="text-primary-700 text-xl leading-[1.3] font-semibold tracking-[-0.2px]">
            Valor de honorarios 2026
          </h3>
          <p className="text-text-secondary mt-3 text-base leading-relaxed">
            El valor de los honorarios para el año 2026 es de{" "}
            <strong className="text-text-primary font-semibold">
              $1.750.905
            </strong>
            , correspondiente a un SMMLV.
          </p>
        </aside>
      </section>

      <section
        aria-labelledby="cuentas-pago-titulo"
        className="bg-surface-secondary"
      >
        <div className="mx-auto w-full max-w-300 px-4 py-16 md:px-8 md:py-24">
          <h2
            id="cuentas-pago-titulo"
            className="text-text-primary text-2xl leading-[1.33] font-bold tracking-[-0.3px]"
          >
            Cuentas para pago de honorarios
          </h2>
          <p className="text-text-secondary mt-3 max-w-[65ch] text-base leading-relaxed">
            Realice la consignación en la cuenta correspondiente al concepto de
            su pago.
          </p>

          <dl className="mt-8 grid gap-5 md:grid-cols-2">
            {CUENTAS_PAGO.map((cuenta) => (
              <div
                key={cuenta.numero}
                className="bg-surface border-border shadow-card flex gap-4 rounded-xl border p-6 md:p-8"
              >
                <span
                  aria-hidden="true"
                  className="bg-primary-50 text-primary-600 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
                >
                  <IconoBanco className="h-6 w-6" />
                </span>
                <div>
                  <dt className="text-text-primary text-lg leading-[1.4] font-semibold">
                    {cuenta.concepto}
                  </dt>
                  <dd className="text-text-secondary mt-3 text-sm leading-relaxed">
                    Cuenta de ahorros Banco AV Villas
                  </dd>
                  <dd className="text-primary-700 mt-1 text-2xl leading-[1.33] font-bold tracking-[-0.3px]">
                    {cuenta.numero}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
