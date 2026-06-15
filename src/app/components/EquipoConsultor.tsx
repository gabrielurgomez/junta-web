type Caso = {
  n: number;
  expediente: string;
  paciente: string;
  cc: number;
  fechaSolicitud: string;
  tipoSolicitud: string;
  solicitudCotizaciones: string;
  entidadPago: string;
  especialista: string;
  valor: number;
  estado: string;
};

const casos: Caso[] = [
  {
    n: 1,
    expediente: "2618-2025",
    paciente: "EDILMA BLANCO RODRIGUEZ",
    cc: 63497478,
    fechaSolicitud: "05/01/2026",
    tipoSolicitud: "APT ERGONOMICO",
    solicitudCotizaciones: "07/01/2026",
    entidadPago: "SURA ARL",
    especialista: "ESLABONAR",
    valor: 1249500,
    estado: "PASA A DR SERGIO 16/04/2026 SURA ARL REALIZO EL PAGO",
  },
  {
    n: 2,
    expediente: "2434-2025",
    paciente: "YOHANA CONSUELO RAMIREZ CORZO",
    cc: 52152442,
    fechaSolicitud: "07/01/2026",
    tipoSolicitud: "APT CON RIESGO PSICOSOCIAL",
    solicitudCotizaciones: "09/01/2026",
    entidadPago: "POSITIVA ARL",
    especialista: "ESLABONAR",
    valor: 1606500,
    estado: "PASA A DR SERGIO 10/02/2026 POSITIVA NO REALIZA PAGO",
  },
  {
    n: 3,
    expediente: "2435-2025",
    paciente: "WANDA LISZERRE FERNANDEZ ALFONSO",
    cc: 1095797940,
    fechaSolicitud: "09/01/2026",
    tipoSolicitud:
      "APT CON ENFASIS EN CALIFICACION DE ORIGEN DE LAS ENFERMEDAD MIEMBROS SUPERIORES EN CARGO AUX DE FACTURACION - HOMOLOGACION",
    solicitudCotizaciones: "15/01/2026",
    entidadPago: "POSITIVA ARL",
    especialista: "ESLABONAR",
    valor: 1249500,
    estado: "PASA A DRA MYRIAM 10/02/2026 POSITIVA ARL NO PAGA",
  },
  {
    n: 4,
    expediente: "2625-2025",
    paciente: "DAYSY PAOLA SUAREZ GUTIERREZ",
    cc: 6356348,
    fechaSolicitud: "03/02/2026",
    tipoSolicitud:
      "APT CARGO DESEMPEÑADO POR LA SEÑORA - HOMOLOGACION OBSERVANDO TRABAJADOR ACTUAL",
    solicitudCotizaciones: "05/02/2026",
    entidadPago: "SURA ARL",
    especialista: "ESLABONAR",
    valor: 1368500,
    estado: "PASA A DRA MYRIAM 06/03/2025 SURA NO REALIZA PAGO",
  },
  {
    n: 5,
    expediente: "2839-2025",
    paciente: "GERZON ALBERTO LOPEZ FONSECA",
    cc: 1098633172,
    fechaSolicitud: "05/02/2026",
    tipoSolicitud: "APT ERGONOMICO",
    solicitudCotizaciones: "05/02/2026",
    entidadPago: "PROTECCION",
    especialista: "ESLABONAR",
    valor: 1368500,
    estado: "PASA A DR SERGIO 06/03/2026 PROTECCION NO REALIZA PAGO",
  },
  {
    n: 6,
    expediente: "2339-2025",
    paciente: "JOSE JAIMES MORA",
    cc: 91297351,
    fechaSolicitud: "23/02/2026",
    tipoSolicitud: "AMPLIACION ANALISIS PUESTO DE TRABAJO",
    solicitudCotizaciones: "24/02/2026",
    entidadPago: "COLMENA ARL",
    especialista: "ESLABONAR",
    valor: 1368500,
    estado: "",
  },
  {
    n: 7,
    expediente: "2801-2025",
    paciente: "GLADYS TORRES ARGUELLO",
    cc: 37705660,
    fechaSolicitud: "03/03/2026",
    tipoSolicitud:
      "APT ENFOQUE EN RIESGO BIOMECANICO PATOLOGIA MS Y COLUMNA LUMBAR",
    solicitudCotizaciones: "03/03/2026",
    entidadPago: "COLPENSIONES",
    especialista: "ESLABONAR",
    valor: 1606500,
    estado: "PASA A DR MOISES 14/04/2026 COLPENSIONES NO REALIZO PAGO",
  },
  {
    n: 8,
    expediente: "2859-2025",
    paciente: "DORIS BAUTISTA PABON",
    cc: 27751774,
    fechaSolicitud: "05/03/2026",
    tipoSolicitud:
      "APT CON ENFOQUE EN CALIFICACION DE ORIGEN DE ENFERMEDAD, DEL CARGO AUXILIAR OPERATIVA CAFETERIA",
    solicitudCotizaciones: "06/03/2026",
    entidadPago: "AXA COLPATRIA",
    especialista: "ESLABONAR",
    valor: 1368500,
    estado: "",
  },
  {
    n: 9,
    expediente: "2927-2025",
    paciente: "LINA MARIA DURAN HERNANDEZ",
    cc: 60391778,
    fechaSolicitud: "12/03/2026",
    tipoSolicitud:
      "APT CON ENFOQUE EN CALIFICACION DE ORIGEN DE ENFERMEDAD PATOLOGIA MIEMBROS SUPERIORES EN EL CARGO AUXILIAR DE COCINA, DEBER REALIZARSE HOMOOGACION",
    solicitudCotizaciones: "13/03/2026",
    entidadPago: "ALFA",
    especialista: "ESLABONAR",
    valor: 1368500,
    estado: "",
  },
  {
    n: 10,
    expediente: "2746-2025",
    paciente: "SILEIDY KATHERINE PEÑA PALENCIA",
    cc: 1098625361,
    fechaSolicitud: "24/03/2026",
    tipoSolicitud: "APT ORIGEN DE ENFERMEDADES DERIVADAS DEL ESTRÉS",
    solicitudCotizaciones: "24/03/2026",
    entidadPago: "POSITIVA ARL",
    especialista: "ESLABONAR",
    valor: 1808800,
    estado: "",
  },
  {
    n: 11,
    expediente: "291-2026",
    paciente: "URIEL OSWALDO GOMEZ ACOSTA",
    cc: 910795782,
    fechaSolicitud: "28/03/2026",
    tipoSolicitud: "APT PSICOSOCIAL",
    solicitudCotizaciones: "01/04/2026",
    entidadPago: "POSITIVA ARL",
    especialista: "ESLABONAR",
    valor: 1796900,
    estado: "",
  },
  {
    n: 12,
    expediente: "261-2026",
    paciente: "JOSE ALEXANDER ESPINOSA ZAPATA",
    cc: 98661942,
    fechaSolicitud: "21/04/2026",
    tipoSolicitud: "APT MIEMBROS SUPERIORES",
    solicitudCotizaciones: "21/04/2026",
    entidadPago: "SEGUROS ALFA",
    especialista: "ESLABONAR",
    valor: 1428000,
    estado: "",
  },
  {
    n: 13,
    expediente: "233-2026",
    paciente: "CARMEN DELIA MUÑOZ GARCIA",
    cc: 28334594,
    fechaSolicitud: "21/04/2026",
    tipoSolicitud: "APT RIESGO BIOMECANICO MMS ENFASIS EN RUIDO - DOSIMETRIA",
    solicitudCotizaciones: "21/04/2026",
    entidadPago: "COLPENSIONES",
    especialista: "ESLABONAR",
    valor: 1511300,
    estado: "",
  },
  {
    n: 14,
    expediente: "2812-2025",
    paciente: "JUAN MANUEL CONCHA SANCHEZ",
    cc: 91253573,
    fechaSolicitud: "21/04/2026",
    tipoSolicitud: "APT ORIGEN ENFERMEDAD 2015-2017",
    solicitudCotizaciones: "21/04/2026",
    entidadPago: "COLPENSIONES",
    especialista: "ESLABONAR",
    valor: 1428000,
    estado: "",
  },
  {
    n: 15,
    expediente: "2855-2025",
    paciente: "ANA ILSE GARCIA RODRIGUEZ",
    cc: 37328765,
    fechaSolicitud: "21/04/2026",
    tipoSolicitud: "APT ENFASIS CALIFICACION ORIGEN",
    solicitudCotizaciones: "21/04/2026",
    entidadPago: "COLPENSIONES",
    especialista: "ESLABONAR",
    valor: 1428000,
    estado: "PASA A DR MOISES 22/05/2026 APORTAN PRUEBAS",
  },
];

const pesoCOP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const thBase =
  "border-b border-border px-3 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.3px] text-text-secondary";
const tdBase =
  "border-b border-border px-3 py-2.5 align-top text-[0.8rem] leading-[1.5] text-text-secondary";

export function EquipoConsultor() {
  return (
    <section id="interconsultores" className="bg-surface-secondary py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        {/* Encabezado */}
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="bg-primary-50 text-primary-700 mb-4 inline-flex rounded-full px-3 py-1 text-[0.75rem] font-medium tracking-[0.3px]">
            Gestión de casos
          </span>
          <h2 className="text-text-primary text-[1.50rem] leading-[1.33] font-bold tracking-[-0.3px]">
            Interconsultores
          </h2>
          <p className="text-text-secondary mt-4 max-w-[720px] text-[1.00rem] leading-[1.625] font-normal">
            Relación de casos remitidos a interconsulta con especialistas
            externos durante el I semestre de 2026.
          </p>
        </div>

        {/* Solo la tabla hace scroll horizontal; la página no se ensancha */}
        <div
          className="border-border bg-surface shadow-card focus-visible:outline-primary-400 overflow-x-auto rounded-[12px] border focus-visible:outline-2 focus-visible:outline-offset-2"
          role="region"
          aria-label="Tabla de interconsultores del I semestre de 2026"
          tabIndex={0}
        >
          <table className="w-full min-w-[1180px] border-collapse text-left">
            <caption className="sr-only">
              Interconsultores I semestre de 2026: relación de casos remitidos a
              especialistas externos, con expediente, paciente, tipo de
              solicitud, entidad encargada del pago, valor y estado.
            </caption>
            <thead>
              <tr className="bg-surface-secondary">
                <th scope="col" className={`${thBase} text-center`}>
                  N°
                </th>
                <th scope="col" className={`${thBase} whitespace-nowrap`}>
                  Expediente
                </th>
                <th scope="col" className={`${thBase} whitespace-nowrap`}>
                  Nombre del paciente
                </th>
                <th
                  scope="col"
                  className={`${thBase} whitespace-nowrap text-right`}
                >
                  C.C.
                </th>
                <th scope="col" className={`${thBase} whitespace-nowrap`}>
                  Fecha solicitud
                </th>
                <th scope="col" className={thBase}>
                  Tipo de solicitud
                </th>
                <th scope="col" className={`${thBase} whitespace-nowrap`}>
                  Solicitud cotizaciones
                </th>
                <th scope="col" className={thBase}>
                  Entidad encargada del pago
                </th>
                <th scope="col" className={`${thBase} whitespace-nowrap`}>
                  Especialista que interviene
                </th>
                <th
                  scope="col"
                  className={`${thBase} whitespace-nowrap text-right`}
                >
                  Valor
                </th>
                <th scope="col" className={thBase}>
                  Estado actual y/o final
                </th>
              </tr>
            </thead>
            <tbody>
              {casos.map((c) => (
                <tr
                  key={c.n}
                  className="even:bg-surface-secondary hover:bg-primary-50 transition-colors"
                >
                  <td
                    className={`${tdBase} text-text-primary text-center font-medium`}
                  >
                    {c.n}
                  </td>
                  <td className={`${tdBase} whitespace-nowrap`}>
                    {c.expediente}
                  </td>
                  <td
                    className={`${tdBase} text-text-primary min-w-[190px] font-medium`}
                  >
                    {c.paciente}
                  </td>
                  <td
                    className={`${tdBase} tabular-nums whitespace-nowrap text-right`}
                  >
                    {c.cc.toLocaleString("es-CO")}
                  </td>
                  <td className={`${tdBase} whitespace-nowrap`}>
                    {c.fechaSolicitud}
                  </td>
                  <td className={`${tdBase} min-w-[280px]`}>
                    {c.tipoSolicitud}
                  </td>
                  <td className={`${tdBase} whitespace-nowrap`}>
                    {c.solicitudCotizaciones}
                  </td>
                  <td className={`${tdBase} min-w-[140px]`}>{c.entidadPago}</td>
                  <td className={`${tdBase} whitespace-nowrap`}>
                    {c.especialista}
                  </td>
                  <td
                    className={`${tdBase} text-text-primary tabular-nums whitespace-nowrap text-right font-medium`}
                  >
                    {pesoCOP.format(c.valor)}
                  </td>
                  <td className={`${tdBase} min-w-[240px]`}>
                    {c.estado || "—"}
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
