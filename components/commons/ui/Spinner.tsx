import React from "react";

const buttonStyles = {
  primary: "border-white",
  secondary: "border-white",
  error: "border-white",
  warning: "border-white",
  info: "border-white",
  success: "border-white",
};

export default function Spinner({
  color,
  className,
}: {
  color?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`w-4 h-4 border-2 ${
          buttonStyles[color || "primary"]
        } border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
}
