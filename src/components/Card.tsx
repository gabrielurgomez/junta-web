import React from "react";

interface CardProps {
  title: string;
  text: string;
}

export const Card = ({ title, text }: CardProps) => {
  // Generamos un ID seguro para propósitos de accesibilidad
  const safeId = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <article
      className="flex flex-col bg-surface rounded-xl border border-border p-6 md:p-8 shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
      aria-labelledby={`card-${safeId}`}
    >
      <h2
        id={`card-${safeId}`}
        className="mb-4 text-xl font-semibold text-text-primary md:text-2xl"
      >
        {title}
      </h2>
      <p className="text-base leading-relaxed text-text-secondary">
        {text}
      </p>
    </article>
  );
};
