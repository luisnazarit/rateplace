import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface CollapseProps {
  title: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  className?: string
}

const Collapse: React.FC<CollapseProps> = ({
  title,
  children,
  isOpen: externalIsOpen,
  className
}) => {
  const [isOpen, setIsOpen] = useState(externalIsOpen || false);
  const [height, setHeight] = useState<number | string>(0);
  const contentRef = useRef<HTMLDivElement>(null);


  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen && contentRef.current) {
      // Establece la altura al valor real del contenido para la animación
      setHeight(contentRef.current.scrollHeight);
      // Elimina overflow: hidden después de que la animación termine
      const timeout = setTimeout(() => {
        setHeight('auto');
      }, 300); // 300ms coincide con la duración de la transición
      return () => clearTimeout(timeout);
    } else {
      // Vuelve a establecer la altura a 0 para la animación de cierre
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className={`p-4 rounded-xl ${className}`}>
      <div
        onClick={toggleCollapse}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        <div>{title}</div>
        <ChevronDown
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease-in-out",
          }}
        />
      </div>
      <div
        ref={contentRef}
        style={{
          overflow: height === 'auto' ? 'visible' : 'hidden',
          height: height,
          transition: 'height 0.3s ease-in-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Collapse;
