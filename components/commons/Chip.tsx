type Props = {
  children: string | React.ReactNode;
  className?: string;
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success" | "inherit";
};

export default function Chip({ children, className = "text-tiny", color }: Props) {
  const colorMap: Record<string, string> = {
    primary: "bg-primary-500 text-white",
    secondary: "bg-secondary-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-amber-500 text-black",
    info: "bg-blue-500 text-white",
    success: "bg-green-500 text-white",
    inherit: "bg-transparent text-gray-700", // Default to transparent or you can make this dynamic
  };

  // Get the background and text color based on the provided color prop
  const chipColorClass = color ? colorMap[color] : colorMap.info; // Default to "primary" if no color is provided

  return (
    <span
      style={{
        borderRadius: "4px",
        padding: "4px",
        height: "auto",
        lineHeight: 1,
      }}
      className={`${chipColorClass} text-sm inline-flex items-center gap-1 ${className}`}
    >
      {children}
    </span>
  );
}
