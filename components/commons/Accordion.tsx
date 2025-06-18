import React, { useState, ReactNode } from "react";

type AccordionItemProps = {
  title: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
};

type AccordionProps = {
  children: ReactNode;
  collapseAllOnToggle?: boolean; // Propiedad para controlar el comportamiento de colapsado
};

const AccordionItem = ({
  title,
  children,
  isOpen,
  onToggle,
}: AccordionItemProps) => {
  return (
    <div className="border-b last:border-b-0">
      <div
        className="cursor-pointer py-3 px-4 flex justify-between items-center"
        onClick={onToggle}
      >
        <div className="font-semibold">{title}</div>
        <div className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </div>
      </div>
      {isOpen && <div className="py-2 px-4">{children}</div>}
    </div>
  );
};

const Accordion = ({
  children,
  collapseAllOnToggle = true, // Valor por defecto para colapsar todos
}: AccordionProps) => {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

  const handleToggle = (key: string) => {
    setExpandedKeys((prevExpandedKeys) => {
      const newExpandedKeys = new Set(prevExpandedKeys);

      // Si collapseAllOnToggle es true, cerramos todos y luego abrimos el elemento seleccionado
      if (collapseAllOnToggle) {
        newExpandedKeys.clear(); // Cerrar todos los elementos
        if (!newExpandedKeys.has(key)) {
          newExpandedKeys.add(key); // Solo abrir el seleccionado
        }
      } else {
        // Si collapseAllOnToggle es false, solo abrir o cerrar el elemento
        if (newExpandedKeys.has(key)) {
          newExpandedKeys.delete(key); // Cerrar el elemento
        } else {
          newExpandedKeys.add(key); // Abrir el elemento
        }
      }
      return newExpandedKeys;
    });
  };

  return (
    <div className="shadow-md rounded-md">
      {React.Children.map(children, (child, index) => {
        const key = `item-${index}`;
        const isOpen = expandedKeys.has(key);
        return React.cloneElement(child as React.ReactElement, {
          isOpen,
          onToggle: () => handleToggle(key),
        });
      })}
    </div>
  );
};

export { Accordion, AccordionItem };
