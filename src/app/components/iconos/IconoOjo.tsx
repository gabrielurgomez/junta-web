import type { SVGProps } from "react";

export function IconoOjo(props: SVGProps<SVGSVGElement>) {
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
      <path d="M2.1 12a10.4 10.4 0 0 1 19.8 0 10.4 10.4 0 0 1-19.8 0Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
