import type { SVGProps } from "react";

interface CanalPago {
  titulo: string;
  descripcion: string;
  href: string;
}

const CANALES_PAGO: CanalPago[] = [
  {
    titulo: "Pagos (Entidades)",
    descripcion:
      "Acceda al canal de pago para entidades y realice el proceso correspondiente.",
    href: "https://www.pagosvirtualesavvillas.com.co/personal/pagos/",
  },
  {
    titulo: "Pagos (Persona natural)",
    descripcion: "Consulte las instrucciones de pago para personas naturales.",
    href: "https://jrci.com.co/persona-natural/",
  },
];

function IconoPago(props: SVGProps<SVGSVGElement>) {
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
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <path d="M2 10h20" />
      <path d="M6 15h3" />
    </svg>
  );
}

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

/*
  WCAG 2.2 — 2.4.4 (A), 2.4.13 (AA) y 2.5.8 (AA):
  el enlace tiene un nombre descriptivo, cubre la tarjeta completa y conserva
  un indicador de foco visible para su uso con teclado.
*/
function CanalPagoCard({ canal }: { canal: CanalPago }) {
  return (
    <li>
      <article className="bg-surface border-border shadow-card has-[a:focus-visible]:outline-primary-400 relative flex h-full items-start gap-4 rounded-xl border p-6 transition-shadow duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] has-[a:focus-visible]:shadow-[0_4px_16px_rgba(0,0,0,0.1)] has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 md:p-8">
        <span
          aria-hidden="true"
          className="bg-primary-50 text-primary-600 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
        >
          <IconoPago className="h-6 w-6" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-text-primary text-xl leading-[1.3] font-semibold tracking-[-0.2px]">
            <a
              href={canal.href}
              className="hover:text-primary-700 focus-visible:outline-primary-400 after:absolute after:inset-0 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {canal.titulo}
            </a>
          </h3>
          <p className="text-text-secondary mt-2 text-base leading-relaxed">
            {canal.descripcion}
          </p>
        </div>
      </article>
    </li>
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

        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {CANALES_PAGO.map((canal) => (
            <CanalPagoCard key={canal.href} canal={canal} />
          ))}
        </ul>

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
