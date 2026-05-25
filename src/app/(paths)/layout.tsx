import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/app/components/NavBar";
import { Footer } from "@/app/components/Footer";
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
    <html lang="es-CO" className={`${inter.variable} antialiased`}>
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#contenido-principal"
          className="bg-primary-400 sr-only absolute top-2 left-2 z-50 rounded-md px-4 py-2 text-white focus:not-sr-only focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white"
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
