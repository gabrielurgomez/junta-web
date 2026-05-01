export const logger = ({
  level,
  message,
}: {
  level: "error" | "info" | "warn";
  message: string;
}) => {
  // Railway parsea logs JSON y los muestra con colores según el level
  console.log(JSON.stringify({ level, message }));
};
