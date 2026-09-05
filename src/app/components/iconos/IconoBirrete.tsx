import type { SVGProps } from "react";

export function IconoBirrete(props: SVGProps<SVGSVGElement>) {
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
      <path d="M12 3 2 8l10 5 10-5-10-5Z" />
      <path d="M6 10.5V15c0 1.66 2.69 3 6 3s6-1.34 6-3v-4.5" />
      <path d="M21 9.5V15" />
    </svg>
  );
}
