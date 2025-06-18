import React from 'react';
import '../commons/css/button.css';
import Spinner from './ui/Spinner';

// Definimos las propiedades del componente
interface CustomButtonProps {
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'inherit' | 'white';
  href?: string; // Propiedad "href"
  children: React.ReactNode; // Contenido del botón
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; // Manejo de clics
  disabled?: boolean; // Estado deshabilitado
  type?: 'button' | 'submit' | 'reset'; // Tipo de botón
  isLoading?: boolean;
  className?: string;
  isIcon?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
  style?: React.CSSProperties;
}

const buttonStyles = {
  primary: 'custom-button primary',
  secondary: 'custom-button secondary',
  error: 'custom-button error',
  warning: 'custom-button warning',
  info: 'custom-button info',
  success: 'custom-button success',
  white: 'custom-button white',
};

const Button: React.FC<CustomButtonProps> = (props) => {
  const {
    color = 'secondary',
    href,
    children,
    onClick,
    disabled = false,
    type = 'button',
    isLoading,
    className,
    isIcon,
    variant = 'solid',
    style,
  } = props;

  const getButtonStyle = () => buttonStyles[color] || buttonStyles.primary;

  const combinedClassName = `${ variant !== 'text' ? getButtonStyle() : ''} ${variant} ${className || ''} ${isIcon ? 'button-icon' : ''}`.trim();

  // Si se proporciona "href", renderizamos un enlace (<a>)
  if (href) {
    return (
      <a href={href} className={combinedClassName} style={style}>
        {children}
      </a>
    );
  }

  // Si no hay "href", renderizamos un botón (<button>)
  return (
    <button
      type={type}
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled || isLoading}
      style={style}
    >
      {isLoading && <Spinner className="me-2" color={props.color} />}
      {children}
    </button>
  );
};

export default Button;