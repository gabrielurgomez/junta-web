import AvisoNuevaImagen from "@/app/components/AvisoNuevaImagen.client";
import { Hero } from "@/app/components/Hero";
import { MisionQuienesSomos } from "@/app/components/MisionQuienesSomos";
import { Derechos } from "@/app/components/Derechos";
import { Deberes } from "@/app/components/Deberes";

export default function HomePage() {
  return (
    <>
      <AvisoNuevaImagen />
      <Hero />
      <MisionQuienesSomos />
      <Derechos />
      <Deberes />
    </>
  );
}
