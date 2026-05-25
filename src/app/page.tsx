import { Hero } from "@/app/components/Hero";
import { MisionVision } from "@/app/components/MisionVision";
import { QuienesSomos } from "@/app/components/QuienesSomos";
import { PerspectivaEstrategica } from "@/app/components/PerspectivaEstrategica";
import { Derechos } from "@/app/components/Derechos";
import { Deberes } from "@/app/components/Deberes";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MisionVision />
      <QuienesSomos />
      <PerspectivaEstrategica />
      <Derechos />
      <Deberes />
    </>
  );
}
