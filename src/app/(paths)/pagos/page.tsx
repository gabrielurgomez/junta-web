import type { Metadata } from "next";
import { Hero } from "@/app/components/Hero";
import { Pagos } from "@/app/components/Pagos";

export const metadata: Metadata = {
  title: "Pagos | Junta Regional de Calificación de Invalidez de Santander",
  description:
    "Canales, valor de honorarios y cuentas bancarias para realizar pagos a la Junta Regional de Calificación de Invalidez de Santander.",
};

export default function PagosPage() {
  return (
    <>
      <Hero
        title="Pagos"
        subtitle="Consulta los canales de pago y la información bancaria para los trámites de la Junta Regional de Calificación de Invalidez de Santander."
        imageSrc="/imagenes/dy_ma.webp"
        imageAlt="Equipo de atención de la Junta Regional de Calificación de Invalidez de Santander"
        badgeText="Canales e información de pago"
        priority={true}
      />
      <Pagos />
    </>
  );
}
