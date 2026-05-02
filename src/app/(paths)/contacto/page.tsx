import type { Metadata } from "next";
import ContactoClient from "./Contacto.client";

export const metadata: Metadata = {
  title: "Contacto | Junta Regional de Calificación de Invalidez de Santander",
  description: "Formulario de contacto, dirección, horarios y canales de atención de la Junta Regional de Calificación de Invalidez de Santander.",
};

const ContactoPage = () => {
  return <ContactoClient />;
};

export default ContactoPage;
