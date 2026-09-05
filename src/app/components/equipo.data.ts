export interface Integrante {
  /** Identificador estable para vincular el botón y el título del modal */
  id: string;
  nombre: string;
  cargo: string;
  foto: string;
  /** Formación académica, de la profesión base a los estudios de posgrado */
  estudios: string[];
}

export const integrantes: Integrante[] = [
  {
    id: "sergie-rojas",
    nombre: "Dr. SERGIE GERARDO ROJAS RAMIREZ",
    cargo: "Director Administrativo y Financiero",
    foto: "/imagenes/doc-sergie.webp",
    estudios: [
      "Abogado",
      "Especialista en Seguridad Social",
      "Especialista en Derecho Laboral y Relaciones Industriales",
      "Especialista en Gerencia Empresarial",
      "Especialista en Gerencia en Riesgos Laborales, Seguridad y Salud en el Trabajo",
      "Magíster en Prevención de Riesgos Laborales (candidato)",
      "Magíster en Derecho del Trabajo y de la Seguridad Social (candidato)",
    ],
  },
  {
    id: "sergio-ayala",
    nombre: "Dr. SERGIO EDUARDO AYALA MORENO",
    cargo: "Médico Integrante Principal",
    foto: "/imagenes/doc-sergio.webp",
    estudios: [
      "Médico y Cirujano",
      "Especialista en Salud Ocupacional y Medicina Laboral",
      "Especialista en Auditoría en Salud",
      "Magíster en Derecho Médico",
    ],
  },
  {
    id: "myriam-barboza",
    nombre: "Dra. MYRIAM BARBOZA ZARATE",
    cargo: "Médico Integrante Principal",
    foto: "/imagenes/doc-myriam.webp",
    estudios: [
      "Médico Cirujano",
      "Especialista en Salud Ocupacional",
      "Magíster en Derecho Médico",
    ],
  },
  {
    id: "jeannette-duran",
    nombre: "Dra. JEANNETTE DURAN SALAZAR",
    cargo: "Psicóloga Integrante Principal",
    foto: "/imagenes/doc-jeannette.webp",
    estudios: [
      "Psicóloga",
      "Enfermera (1989)",
      "Especialista en Salud Ocupacional",
      "Magíster en Educación",
    ],
  },
];
