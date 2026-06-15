interface CardProps {
  id: string;
  title: string;
  text: string;
}

export const Card = ({ id, title, text }: CardProps) => {
  // Sanitize the ID to ensure it's valid for use in HTML attributes
  return (
    <article
      className="bg-surface border-border flex flex-col rounded-xl border p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_8px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] md:p-8"
      aria-labelledby={id}
    >
      <h2
        id={id}
        className="text-text-primary mb-4 text-xl font-semibold md:text-2xl"
      >
        {title}
      </h2>
      <p className="text-text-secondary text-base leading-relaxed">{text}</p>
    </article>
  );
};
