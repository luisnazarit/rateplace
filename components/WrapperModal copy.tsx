import { cn } from "@/utils/cn";
import { X } from "lucide-react";
import React from "react";
import { Card } from "./commons/ui/Card";

export default function WrapperModal({
  children,
  title,
  closeButton,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
  closeButton?: () => void;
}) {
  return (
    <>
      <button
        className="p-2 fixed top-4 right-4"
        onClick={() => closeButton && closeButton()}
      >
        <X className="h-6 w-6" />
      </button>
      <Card
        onMouseUp={(e: React.MouseEvent) => e.stopPropagation()}
        onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
        className={cn(
          "shadow-lg rounded-lg overflow-hidden",
          `w-auto sm:mx-auto my-8 ${className}`
        )}
      >
        {title && (
          <div className="p-4 bg-dark-300">
            <h2 className="font-bold text-2xl">{title}</h2>
          </div>
        )}
        {children}
      </Card>
    </>
  );
}
