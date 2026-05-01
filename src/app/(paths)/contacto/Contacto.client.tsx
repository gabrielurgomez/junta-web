"use client";

import { useEffect, useRef, useState } from "react";
import { enviarFormularioContacto } from "./contacto.actions";

type EstadoEnvio = "enviando" | "error" | null;

interface FormState {
  nombre: string;
  correo: string;
  telefono: string;
  mensaje: string;
}

const FORM_INICIAL: FormState = {
  nombre: "",
  correo: "",
  telefono: "",
  mensaje: "",
};

const ContactoClient = () => {
  const [form, setForm] = useState<FormState>(FORM_INICIAL);
  const [estadoEnvio, setEstadoEnvio] = useState<EstadoEnvio>(null);
  const [mensajeRespuesta, setMensajeRespuesta] = useState<string>("");
  const [alertaExito, setAlertaExito] = useState<string | null>(null);
  const [exitoTicket, setExitoTicket] = useState(0);
  const [erroresCampo, setErroresCampo] = useState<Partial<FormState>>({});
  const exitoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const limpiarTimerExito = () => {
    if (exitoTimerRef.current) {
      clearTimeout(exitoTimerRef.current);
      exitoTimerRef.current = null;
    }
  };

  const cerrarAlertaExito = () => {
    limpiarTimerExito();
    setAlertaExito(null);
  };

  useEffect(() => {
    if (!alertaExito) return;
    limpiarTimerExito();
    exitoTimerRef.current = setTimeout(() => {
      setAlertaExito(null);
      exitoTimerRef.current = null;
    }, 5000);
    return () => limpiarTimerExito();
  }, [alertaExito, exitoTicket]);

  const actualizarCampo =
    (campo: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((prev) => ({ ...prev, [campo]: e.target.value }));
      if (erroresCampo[campo]) {
        setErroresCampo((prev) => ({ ...prev, [campo]: "" }));
      }
    };

  const validarFormulario = (): boolean => {
    const errores: Partial<FormState> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.nombre.trim()) errores.nombre = "El nombre es requerido.";
    if (!form.correo.trim()) {
      errores.correo = "El correo electrónico es requerido.";
    } else if (!emailRegex.test(form.correo.trim())) {
      errores.correo = "El correo electrónico no es válido.";
    }
    if (!form.mensaje.trim()) {
      errores.mensaje = "El mensaje es requerido.";
    } else if (form.mensaje.trim().length < 20) {
      errores.mensaje = "El mensaje debe tener al menos 20 caracteres.";
    }

    setErroresCampo(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    setEstadoEnvio("enviando");
    setMensajeRespuesta("");
    setAlertaExito(null);

    const resultado = await enviarFormularioContacto({
      nombre: form.nombre,
      correo: form.correo,
      telefono: form.telefono,
      mensaje: form.mensaje,
    });

    if (resultado.status === 200) {
      setEstadoEnvio(null);
      setForm(FORM_INICIAL);
      setErroresCampo({});
      setExitoTicket((t) => t + 1);
      setAlertaExito(resultado.message);
    } else {
      setEstadoEnvio("error");
    }

    setMensajeRespuesta(resultado.message);
  };

  const inputBaseClasses =
    "w-full rounded-md border px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-disabled bg-white transition-all duration-200 outline-none focus:ring-3 focus:ring-primary-400/20 focus:border-primary-400";

  const labelClasses = "block text-sm font-medium text-text-secondary mb-1.5";

  return (
    <section className="mx-auto w-full max-w-300 px-4 py-16 md:px-8 md:py-24">
      <div className="grid gap-12 lg:grid-cols-5">
        {/* Panel izquierdo — información de contacto */}
        <aside className="lg:col-span-2">
          <h1 className="text-text-primary text-3xl font-bold tracking-tight md:text-4xl">
            Contáctenos
          </h1>
          <p className="text-text-secondary mt-4 text-base leading-relaxed">
            Estamos disponibles para atender sus solicitudes, preguntas y
            sugerencias. Complete el formulario y nos comunicaremos con usted a
            la brevedad posible.
          </p>

          <div className="mt-10 space-y-6">
            <ContactInfoItem
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              label="Dirección"
              value="Calle 36 # 26-38 Of. 501, Bucaramanga, Santander"
            />
            <ContactInfoItem
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              label="Teléfono"
              value="(607) 630 8050"
            />
            <ContactInfoItem
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
              }
              label="Correo electrónico"
              value="juntasantander@gmail.com"
            />
            <ContactInfoItem
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              label="Horario de atención"
              value="Lunes a viernes, 8:00 a.m. – 12:00 m. y 2:00 p.m. – 6:00 p.m."
            />
          </div>
        </aside>

        {/* Panel derecho — formulario */}
        <div className="lg:col-span-3">
          <div
            className="rounded-2xl bg-white p-8 md:p-10"
            style={{
              boxShadow:
                "rgba(0,0,0,0.03) 0px 0px 0px 1px, rgba(0,0,0,0.05) 0px 2px 8px, rgba(0,0,0,0.08) 0px 4px 12px",
            }}
          >
            {alertaExito && (
              <div
                role="alert"
                className="border-success/25 bg-success/8 text-text-primary mb-6 flex items-start gap-3 rounded-lg border px-4 py-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="text-success mt-0.5 h-4 w-4 shrink-0"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="min-w-0 flex-1 text-sm leading-relaxed">
                  {alertaExito}
                </p>
                <button
                  type="button"
                  onClick={cerrarAlertaExito}
                  className="text-text-secondary hover:text-text-primary focus-visible:ring-primary-400/30 -m-1 shrink-0 rounded-md p-1 transition-colors focus-visible:ring-3 focus-visible:outline-none"
                  aria-label="Cerrar notificación"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                  </svg>
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Nombre */}
                  <div className="sm:col-span-2">
                    <label htmlFor="nombre" className={labelClasses}>
                      Nombre completo{" "}
                      <span className="text-error" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      autoComplete="name"
                      value={form.nombre}
                      onChange={actualizarCampo("nombre")}
                      placeholder="Ingrese su nombre completo"
                      className={`${inputBaseClasses} ${erroresCampo.nombre ? "border-error" : "border-border"}`}
                      aria-describedby={
                        erroresCampo.nombre ? "nombre-error" : undefined
                      }
                      aria-invalid={!!erroresCampo.nombre}
                    />
                    {erroresCampo.nombre && (
                      <ErrorCampo
                        id="nombre-error"
                        mensaje={erroresCampo.nombre}
                      />
                    )}
                  </div>

                  {/* Correo */}
                  <div>
                    <label htmlFor="correo" className={labelClasses}>
                      Correo electrónico{" "}
                      <span className="text-error" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="correo"
                      type="email"
                      autoComplete="email"
                      value={form.correo}
                      onChange={actualizarCampo("correo")}
                      placeholder="ejemplo@correo.com"
                      className={`${inputBaseClasses} ${erroresCampo.correo ? "border-error" : "border-border"}`}
                      aria-describedby={
                        erroresCampo.correo ? "correo-error" : undefined
                      }
                      aria-invalid={!!erroresCampo.correo}
                    />
                    {erroresCampo.correo && (
                      <ErrorCampo
                        id="correo-error"
                        mensaje={erroresCampo.correo}
                      />
                    )}
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label htmlFor="telefono" className={labelClasses}>
                      Teléfono{" "}
                      <span className="text-text-disabled text-xs font-normal">
                        (opcional)
                      </span>
                    </label>
                    <input
                      id="telefono"
                      type="tel"
                      autoComplete="tel"
                      value={form.telefono}
                      onChange={actualizarCampo("telefono")}
                      placeholder="Ej. 300 123 4567"
                      className={`${inputBaseClasses} border-border`}
                    />
                  </div>

                  {/* Mensaje */}
                  <div className="sm:col-span-2">
                    <label htmlFor="mensaje" className={labelClasses}>
                      Mensaje{" "}
                      <span className="text-error" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <textarea
                      id="mensaje"
                      rows={5}
                      value={form.mensaje}
                      onChange={actualizarCampo("mensaje")}
                      placeholder="Describa con detalle su solicitud o consulta..."
                      className={`${inputBaseClasses} resize-none ${erroresCampo.mensaje ? "border-error" : "border-border"}`}
                      aria-describedby={
                        erroresCampo.mensaje ? "mensaje-error" : undefined
                      }
                      aria-invalid={!!erroresCampo.mensaje}
                    />
                    <div className="mt-1 flex items-start justify-between">
                      {erroresCampo.mensaje ? (
                        <ErrorCampo
                          id="mensaje-error"
                          mensaje={erroresCampo.mensaje}
                        />
                      ) : (
                        <span />
                      )}
                      <span className="text-text-disabled text-xs tabular-nums">
                        {form.mensaje.length} / 1000
                      </span>
                    </div>
                  </div>
                </div>

                {/* Error global */}
                {estadoEnvio === "error" && mensajeRespuesta && (
                  <div
                    role="alert"
                    className="border-error/20 bg-error/5 flex items-start gap-3 rounded-lg border px-4 py-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="text-error mt-0.5 h-4 w-4 shrink-0"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-error text-sm">{mensajeRespuesta}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <p className="text-text-tertiary text-xs">
                    <span className="text-error">*</span> Campos obligatorios
                  </p>
                  <button
                    type="submit"
                    disabled={estadoEnvio === "enviando"}
                    className="bg-primary-400 hover:bg-primary-500 focus:ring-primary-400/30 inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-200 focus:ring-3 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {estadoEnvio === "enviando" ? (
                      <>
                        <svg
                          className="h-4 w-4 animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Enviando…
                      </>
                    ) : (
                      <>
                        Enviar mensaje
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-4 w-4"
                          aria-hidden="true"
                        >
                          <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactInfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-4">
    <div className="bg-primary-50 text-primary-400 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
      {icon}
    </div>
    <div>
      <p className="text-text-tertiary text-xs font-semibold tracking-wider uppercase">
        {label}
      </p>
      <p className="text-text-primary mt-0.5 text-sm font-medium">{value}</p>
    </div>
  </div>
);

const ErrorCampo = ({ id, mensaje }: { id: string; mensaje: string }) => (
  <p
    id={id}
    role="alert"
    className="text-error mt-1.5 flex items-center gap-1 text-xs"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-3.5 w-3.5 shrink-0"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm-.75-9.25a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5Zm.75 6.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        clipRule="evenodd"
      />
    </svg>
    {mensaje}
  </p>
);

export default ContactoClient;
