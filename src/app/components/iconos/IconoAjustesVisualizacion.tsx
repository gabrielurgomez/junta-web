import type { SVGProps } from "react";

/* Tipografía y contraste: las dos cosas que el panel ajusta. Se evita a
   propósito el icono universal de accesibilidad, asociado a los widgets de
   superposición comerciales. */
export function IconoAjustesVisualizacion(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3 17 8 6l5 11" />
      <path d="M4.9 14h6.2" />
      <circle cx="17.5" cy="14.5" r="4.5" />
      <path d="M17.5 10v9" />
      <path d="M17.5 10a4.5 4.5 0 0 1 0 9" fill="currentColor" stroke="none" />
    </svg>
  );
}
