import type { Metadata } from "next";
import { Hero } from "@/app/components/Hero";
import { Normatividad } from "@/app/components/Normatividad";

export const metadata: Metadata = {
  title:
    "Normatividad | Junta Regional de Calificación de Invalidez de Santander",
  description:
    "Marco normativo y políticas institucionales de la Junta Regional de Calificación de Invalidez de Santander: leyes, decretos y resoluciones aplicables, disponibles en PDF.",
};

export default function NormatividadPage() {
  return (
    <>
      <Hero
        title="Normatividad"
        subtitle="Marco legal y políticas institucionales que rigen la actuación de la Junta Regional de Calificación de Invalidez de Santander."
        imageSrc="/imagenes/recepcion.webp"
        imageAlt="Recepción de la Junta Regional de Calificación de Invalidez de Santander"
        badgeText="Marco legal y políticas"
        priority={true}
      />
      <Normatividad />
    </>
  );
}
