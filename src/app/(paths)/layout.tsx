import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/app/components/NavBar";
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
    <html lang="es" className={`${inter.variable} antialiased`}>
      <body className="flex min-h-screen flex-col font-sans">
        <NavBar />
        <main className="flex flex-1 flex-col">{children}</main>
      </body>
    </html>
  );
}
