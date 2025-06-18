import React, { useState, useRef, useEffect } from "react";
import Portal from "./Portal";

const Popover = ({ trigger, children, placement = "bottom", className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);

  // Función para manejar el clic fuera del Popover
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Verificar si el clic está fuera del trigger o del popover
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target) &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Estilos dinámicos según el placement
  const getPopoverStyle = () => {
    if (!triggerRef.current) return {};

    const triggerRect = triggerRef.current.getBoundingClientRect();

    switch (placement) {
      case "top":
        return {
          position: "absolute",
          top: triggerRect.top - 10, // Ajusta según sea necesario
          left: triggerRect.left + triggerRect.width / 2,
          transform: "translateX(-50%)",
        };
      case "bottom":
        return {
          position: "absolute",
          top: triggerRect.bottom + 10, // Ajusta según sea necesario
          left: triggerRect.left + triggerRect.width / 2,
          transform: "translateX(-50%)",
        };
      case "left":
        return {
          position: "absolute",
          top: triggerRect.top + triggerRect.height / 2,
          left: triggerRect.left - 10, // Ajusta según sea necesario
          transform: "translateY(-50%)",
        };
      case "right":
        return {
          position: "absolute",
          top: triggerRect.top + triggerRect.height / 2,
          left: triggerRect.right + 10, // Ajusta según sea necesario
          transform: "translateY(-50%)",
        };
      default:
        return {};
    }
  };

  return (
    <div style={{ display: "inline-block" }}>
      {/* Trigger */}
      <div
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: "pointer" }}
      >
        {trigger}
      </div>

      {/* Popover usando Portal */}
      {isOpen && (
        <Portal>
          <div
            ref={popoverRef}
            className={className || "bg-gray-800 rounded-lg p-2 shadow-lg"}
            style={{
              ...getPopoverStyle(),
              zIndex: 3000,
            }}
          >
            {children}
          </div>
        </Portal>
      )}
    </div>
  );
};

export default Popover;
