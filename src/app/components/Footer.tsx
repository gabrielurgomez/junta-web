import Link from "next/link";
import type { SVGProps } from "react";

function IconoCorreo(props: SVGProps<SVGSVGElement>) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconoReloj(props: SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function IconoUbicacion(props: SVGProps<SVGSVGElement>) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconoTelefono(props: SVGProps<SVGSVGElement>) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Columna 1: Correos */}
          <div>
            <div className="mb-5 flex items-center gap-2">
              <IconoCorreo className="text-primary-200 h-5 w-5" />
              <h2 className="text-[1.00rem] leading-normal font-semibold">
                Correos electrónicos
              </h2>
            </div>
            <dl className="space-y-4">
              <div>
                <dt className="text-[0.81rem] leading-[1.38] font-medium text-white/60">
                  Correo general
                </dt>
                <dd className="mt-1 text-[0.88rem] leading-normal">
                  <a
                    href="mailto:info@jrci.com.co"
                    className="wrap-anywhere text-white/90 underline underline-offset-2 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    info@jrci.com.co
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.81rem] leading-[1.38] font-medium text-white/60">
                  Correo exclusivo para tramitar recursos
                </dt>
                <dd className="mt-1 text-[0.88rem] leading-normal">
                  <a
                    href="mailto:tramitesrecursos@jrci.com.co"
                    className="wrap-anywhere text-white/90 underline underline-offset-2 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    tramitesrecursos@jrci.com.co
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Columna 2: Horarios */}
          <div>
            <div className="mb-5 flex items-center gap-2">
              <IconoReloj className="text-primary-200 h-5 w-5" />
              <h2 className="text-[1.00rem] leading-normal font-semibold">
                Horarios de atención
              </h2>
            </div>
            <dl className="space-y-4">
              <div>
                <dt className="text-[0.81rem] leading-[1.38] font-medium text-white/60">
                  Lunes a viernes
                </dt>
                <dd className="mt-1 text-[0.88rem] leading-normal text-white/90">
                  7:00 a.m. a 12:00 p.m. y de 1:00 p.m. a 4:00 p.m.
                </dd>
              </div>
              <div>
                <dt className="text-[0.81rem] leading-[1.38] font-medium text-white/60">
                  Sábados
                </dt>
                <dd className="mt-1 text-[0.88rem] leading-normal text-white/90">
                  8:00 a.m. a 12:00 m.
                </dd>
              </div>
            </dl>
          </div>

          {/* Columna 3: Dirección y audiencias */}
          <div>
            <div className="mb-5 flex items-center gap-2">
              <IconoUbicacion className="text-primary-200 h-5 w-5" />
              <h2 className="text-[1.00rem] leading-normal font-semibold">
                Dirección y audiencias
              </h2>
            </div>
            <dl className="space-y-4">
              <div>
                <dt className="text-[0.81rem] leading-[1.38] font-medium text-white/60">
                  Dirección
                </dt>
                <dd className="mt-1 text-[0.88rem] leading-normal text-white/90">
                  Carrera 37 # 44-74 Cabecera
                </dd>
              </div>
              <div>
                <dt className="text-[0.81rem] leading-[1.38] font-medium text-white/60">
                  Horario de audiencias privadas
                </dt>
                <dd className="mt-1 text-[0.88rem] leading-normal text-white/90">
                  Lunes, miércoles y jueves de 7:00 a.m. a 9:00 a.m.
                </dd>
              </div>
            </dl>
          </div>

          {/* Columna 4: Quejas y sugerencias */}
          <div>
            <div className="mb-5 flex items-center gap-2">
              <IconoTelefono className="text-primary-200 h-5 w-5" />
              <h2 className="text-[1.00rem] leading-normal font-semibold">
                Quejas y sugerencias
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-[0.88rem] leading-normal text-white/90">
                Si tiene alguna queja por la prestación del servicio, puede
                radicarla al correo{" "}
                <a
                  href="mailto:diradministrativo@jrci.com.co"
                  className="wrap-anywhere underline underline-offset-2 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  diradministrativo@jrci.com.co
                </a>{" "}
                o dirigirla a la Dirección Territorial de Santander del
                Ministerio del Trabajo.
              </p>
              <dl className="space-y-3">
                <div>
                  <dt className="text-[0.81rem] leading-[1.38] font-medium text-white/60">
                    Dirección
                  </dt>
                  <dd className="mt-0.5 text-[0.88rem] leading-normal text-white/90">
                    Calle 31 # 13-71, Bucaramanga
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.81rem] leading-[1.38] font-medium text-white/60">
                    Teléfono
                  </dt>
                  <dd className="mt-0.5 text-[0.88rem] leading-normal">
                    <a
                      href="tel:+576076302250,,6831"
                      className="text-white/90 underline underline-offset-2 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      6302250 ext. 6831
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.81rem] leading-[1.38] font-medium text-white/60">
                    Línea nacional
                  </dt>
                  <dd className="mt-0.5 text-[0.88rem] leading-normal">
                    <a
                      href="tel:0180000112318"
                      className="text-white/90 underline underline-offset-2 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      0180000112318
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.81rem] leading-[1.38] font-medium text-white/60">
                    Correo electrónico
                  </dt>
                  <dd className="mt-0.5 text-[0.88rem] leading-normal">
                    <a
                      href="mailto:dtsantander@mintrabajo.gov.co"
                      className="wrap-anywhere text-white/90 underline underline-offset-2 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      dtsantander@mintrabajo.gov.co
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.81rem] leading-[1.38] font-medium text-white/60">
                    Horario de atención
                  </dt>
                  <dd className="mt-0.5 text-[0.88rem] leading-normal text-white/90">
                    Lunes a viernes de 7:00 a.m. a 4:00 p.m. (jornada continua)
                  </dd>
                </div>
              </dl>
              <p className="pt-2 text-[0.88rem] leading-normal text-white/90">
                O en nuestro buzón de sugerencias ubicado en la entidad o en
                esta página web en la pestaña{" "}
                <Link
                  href="/contacto"
                  className="text-white/90 underline underline-offset-2 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Contacto
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-white/40">
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6">
          <p className="text-center text-[0.81rem] leading-[1.38] font-normal text-white/70">
            Junta Regional de Calificación de Invalidez de Santander. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
