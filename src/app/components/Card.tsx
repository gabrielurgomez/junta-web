interface CardProps {
  id: string;
  title: string;
  text: string;
}

export const Card = ({ id, title, text }: CardProps) => {
  // Sanitize the ID to ensure it's valid for use in HTML attributes
  return (
    <article
      className="bg-surface border-border shadow-card hover:shadow-card-hover flex flex-col rounded-xl border p-6 transition-all md:p-8"
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
