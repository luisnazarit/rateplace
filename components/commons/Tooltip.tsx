"use client"
import React, { useState } from 'react';
import '../commons/css/tooltip.css';

// Definimos las propiedades del componente
interface CustomTooltipProps {
  content: React.ReactNode; // Contenido del tooltip
  position?: 'top' | 'bottom' | 'left' | 'right'; // Posición del tooltip
  children: React.ReactNode; // Elemento que activa el tooltip
  className?: string; // Clases CSS personalizadas
}

const Tooltip: React.FC<CustomTooltipProps> = (props) => {
  const { content, position = 'top', children, className = '' } = props;
  const [isVisible, setIsVisible] = useState(false); // Estado para controlar la visibilidad

  // Manejar el evento de hover
  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  // Combinamos las clases CSS internas con las clases personalizadas
  const tooltipClassName = `custom-tooltip ${className}`.trim();

  return (
    <div
      className="custom-tooltip-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Elemento que activa el tooltip */}
      {children}

      {/* Tooltip */}
      {isVisible && (
        <div className={`${tooltipClassName} ${position}`}>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;