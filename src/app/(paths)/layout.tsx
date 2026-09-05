import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/app/components/NavBar";
import { Footer } from "@/app/components/Footer";
import { SCRIPT_VISUALIZACION } from "@/app/libs/utils/visualizacion.utils";
import "./../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Junta Regional de Calificación de Invalidez de Santander",
  description:
    "Organismo del Sistema de la Seguridad Social Integral del Orden Nacional, adscrito al Ministerio del Trabajo. Calificación de invalidez, dictámenes periciales y pérdida de capacidad laboral.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /*
      `suppressHydrationWarning` cubre únicamente los atributos de este elemento
      y sus hijos de texto directos: React lo lee del fiber concreto que hidrata
      y no lo propaga al árbol. Aquí sirve para que los `data-tamano`,
      `data-tema`, `data-espaciado` y `data-js` que escribe el script de abajo no
      ensucien la consola en desarrollo.

      Por eso mismo, NO conviertas `lang` ni `className` en valores dinámicos:
      son los únicos atributos cuya divergencia servidor/cliente quedaría oculta.
    */
    <html
      lang="es-CO"
      className={`${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Debe ejecutarse durante el parseo del HTML, antes del primer pintado:
          con `useEffect` el usuario vería la página en tamaño normal y luego un
          salto, que es justo lo que no puede pasarle a alguien con baja visión.

          Depende de `'unsafe-inline'` en la directiva `script-src` de la CSP
          (next.config.ts). Si algún día se endurece, este script necesitará un
          nonce o dejará de aplicarse en silencio.
        */}
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_VISUALIZACION }} />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#contenido-principal"
          className="bg-primary-600 sr-only absolute top-2 left-2 z-50 rounded-md px-4 py-2 text-white focus-visible:not-sr-only focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Saltar al contenido principal
        </a>
        <NavBar />
        <main id="contenido-principal" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
