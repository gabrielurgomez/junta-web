"use client";

import { useEffect, useRef, useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { enviarFormularioContacto } from "./contacto.actions";
import PoliticaTratamientoDatos from "@/app/components/PoliticaTratamientoDatos";
import { emailEsValido } from "@/app/libs/utils/strings.utils";

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
  const [aceptaPolitica, setAceptaPolitica] = useState(false);
  const [errorPolitica, setErrorPolitica] = useState("");
  const [modalPoliticaAbierto, setModalPoliticaAbierto] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const exitoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  /* WCAG 2.2 — 3.3.1 Error Identification (A):
     Refs a cada campo del formulario para mover el foco
     al primer campo inválido cuando la validación falla. */
  const nombreRef = useRef<HTMLInputElement>(null);
  const correoRef = useRef<HTMLInputElement>(null);
  const mensajeRef = useRef<HTMLTextAreaElement>(null);
  const politicaRef = useRef<HTMLInputElement>(null);

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

  /* Mapa de campos a sus refs para la gestión del foco.
     El orden del Map determina la prioridad de enfoque
     (primer campo inválido en el orden visual del formulario). */
  const campoRefs: Record<string, React.RefObject<HTMLElement | null>> = {
    nombre: nombreRef,
    correo: correoRef,
    mensaje: mensajeRef,
    politica: politicaRef,
  };

  const validarFormulario = (): boolean => {
    const errores: Partial<FormState> = {};

    if (!form.nombre.trim()) errores.nombre = "El nombre es requerido.";
    if (!form.correo.trim()) {
      errores.correo = "El correo electrónico es requerido.";
    } else if (!emailEsValido(form.correo.trim())) {
      errores.correo = "El correo electrónico no es válido.";
    }
    if (!form.mensaje.trim()) {
      errores.mensaje = "El mensaje es requerido.";
    } else if (form.mensaje.trim().length < 20) {
      errores.mensaje = "El mensaje debe tener al menos 20 caracteres.";
    } else if (form.mensaje.trim().length > 1000) {
      errores.mensaje = "El mensaje no puede exceder 1000 caracteres.";
    }

    const tienePoliticaError = !aceptaPolitica;
    if (tienePoliticaError) {
      setErrorPolitica(
        "Debe aceptar la política de tratamiento de datos personales.",
      );
    } else {
      setErrorPolitica("");
    }

    setErroresCampo(errores);

    const esValido = Object.keys(errores).length === 0 && !tienePoliticaError;

    /* WCAG 2.2 — 3.3.1 Error Identification (A):
       Si la validación falla, mueve el foco al primer campo
       inválido para que el usuario sepa dónde corregir. */
    if (!esValido) {
      const primerCampoError =
        Object.keys(errores)[0] ?? (tienePoliticaError ? "politica" : null);
      if (primerCampoError && campoRefs[primerCampoError]) {
        campoRefs[primerCampoError].current?.focus();
      }
    }

    return esValido;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (estadoEnvio === "enviando") return;

    if (!validarFormulario()) return;

    setEstadoEnvio("enviando");
    setMensajeRespuesta("");
    setAlertaExito(null);

    const resultado = await enviarFormularioContacto({
      nombre: form.nombre,
      correo: form.correo,
      telefono: form.telefono,
      mensaje: form.mensaje,
      turnstileToken: turnstileToken ?? "",
    });

    if (resultado.status === 200) {
      setEstadoEnvio(null);
      setForm(FORM_INICIAL);
      setErroresCampo({});
      setAceptaPolitica(false);
      setErrorPolitica("");
      setTurnstileToken(null);
      turnstileRef.current?.reset();
      setExitoTicket((t) => t + 1);
      setAlertaExito(resultado.message);
    } else {
      setEstadoEnvio("error");
      // Resetear el widget para que el usuario pueda intentar de nuevo
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }

    setMensajeRespuesta(resultado.message);
  };

  const inputBaseClasses =
    "w-full rounded-md border px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-disabled bg-surface transition-all duration-200 outline-none focus-visible:border-primary-600 focus-visible:outline-border-focus focus-visible:outline-2 focus-visible:outline-offset-2";

  const labelClasses = "block text-sm font-medium text-text-secondary mb-1.5";

  return (
    <>
      <section className="mx-auto w-full max-w-300 px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Panel izquierdo — información de contacto */}
          <div className="lg:col-span-2">
            <h1 className="text-text-primary text-3xl font-bold tracking-tight md:text-4xl">
              Contáctenos
            </h1>
            <p className="text-text-secondary mt-4 text-base leading-relaxed">
              Estamos disponibles para atender sus solicitudes, preguntas y
              sugerencias. Complete el formulario y nos comunicaremos con usted
              a la brevedad posible.
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
                value="Carrera 37 # 44-74, Bucaramanga, Santander"
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
                value="60-7-577195"
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
                value="info@jrci.com.co"
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
          </div>

          {/* Panel derecho — formulario */}
          <div className="lg:col-span-3">
            <div className="shadow-card bg-surface rounded-2xl p-8 md:p-10">
              <div role="status" aria-live="polite" aria-atomic="true">
                {alertaExito && (
                  <div className="border-success/25 bg-success/8 text-text-primary mb-6 flex items-start gap-3 rounded-lg border px-4 py-3">
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
                      className="text-text-secondary hover:text-text-primary focus-visible:outline-border-focus -m-1 shrink-0 rounded-md p-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
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
              </div>

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
                      ref={nombreRef}
                      id="nombre"
                      type="text"
                      maxLength={100}
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
                      ref={correoRef}
                      id="correo"
                      type="email"
                      maxLength={100}
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
                      maxLength={20}
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
                    {/* WCAG 2.2 — 3.3.2 Labels or Instructions (A):
                        Texto de ayuda visible que anuncia los requisitos de
                        longitud antes del envío, no solo en el mensaje de error.
                        Se vincula al textarea vía aria-describedby. */}
                    <p
                      id="mensaje-hint"
                      className="text-text-tertiary mb-1.5 text-xs"
                    >
                      Mínimo 20 caracteres, máximo 1000.
                    </p>
                    <textarea
                      ref={mensajeRef}
                      id="mensaje"
                      rows={5}
                      maxLength={1000}
                      value={form.mensaje}
                      onChange={actualizarCampo("mensaje")}
                      placeholder="Describa con detalle su solicitud o consulta..."
                      className={`${inputBaseClasses} resize-none ${erroresCampo.mensaje ? "border-error" : "border-border"}`}
                      aria-describedby={[
                        "mensaje-hint",
                        erroresCampo.mensaje ? "mensaje-error" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
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

                {/* Política de tratamiento de datos */}
                <div>
                  <div className="flex items-start gap-3">
                    <input
                      ref={politicaRef}
                      id="acepta-politica"
                      type="checkbox"
                      checked={aceptaPolitica}
                      onChange={(e) => {
                        setAceptaPolitica(e.target.checked);
                        if (e.target.checked) setErrorPolitica("");
                      }}
                      aria-describedby={
                        errorPolitica ? "politica-error" : undefined
                      }
                      aria-invalid={!!errorPolitica}
                      className="border-border text-primary-600 focus-visible:outline-border-focus mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded accent-(--color-primary-600) focus-visible:outline-2 focus-visible:outline-offset-2"
                    />
                    <div className="flex flex-col gap-0.5">
                      <label
                        htmlFor="acepta-politica"
                        className="text-text-secondary cursor-pointer text-sm leading-snug select-none"
                      >
                        Acepto la política de tratamiento de datos personales de
                        la Junta Regional de Invalidez de Santander
                      </label>
                      <button
                        type="button"
                        onClick={() => setModalPoliticaAbierto(true)}
                        className="text-primary-600 hover:text-primary-700 focus-visible:outline-border-focus w-fit rounded-sm text-xs font-medium underline underline-offset-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                      >
                        Ver Política
                      </button>
                    </div>
                  </div>
                  {errorPolitica && (
                    <p
                      id="politica-error"
                      role="alert"
                      className="text-error mt-2 flex items-center gap-1 text-xs"
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
                      {errorPolitica}
                    </p>
                  )}
                </div>

                {/* Cloudflare Turnstile */}
                {/*No se debe importar el NEXT_PUBLIC_TURNSTILE_SITE_KEY desde el .config.ts ya que obligaria a Next.js (y al bundler) a procesar todo el archivo en el contexto del navegador.*/}
                <Turnstile
                  ref={turnstileRef}
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
                  onSuccess={(token) => setTurnstileToken(token)}
                  onExpire={() => setTurnstileToken(null)}
                  onError={() => setTurnstileToken(null)}
                  options={{ theme: "light", language: "es" }}
                />

                <div className="flex items-center justify-between pt-2">
                  <p className="text-text-tertiary text-xs">
                    <span className="text-error">*</span> Campos obligatorios
                  </p>
                  <button
                    type="submit"
                    aria-disabled={estadoEnvio === "enviando"}
                    className={`focus-visible:outline-border-focus inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      estadoEnvio === "enviando"
                        ? "bg-primary-600 cursor-not-allowed opacity-60"
                        : "bg-primary-600 hover:bg-primary-700"
                    }`}
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

      <PoliticaTratamientoDatos
        isOpen={modalPoliticaAbierto}
        onClose={() => setModalPoliticaAbierto(false)}
      />
    </>
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
    <div className="bg-primary-50 text-primary-600 border-border flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border">
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
