import React from 'react';
import { TriangleAlert, XCircle, Info, CheckCircle, Circle } from 'lucide-react';

type AlertProps = {
  children: React.ReactNode;
  color?: 'warning' | 'error' | 'info' | 'primary' | 'secondary';
  isIcon?: boolean;
  className?: string;
  variant?: 'solid' | 'outlined';
};

const alertStyles = {
  warning: {
    border: 'border-yellow-500',
    text: 'text-yellow-700',
    bg: 'bg-yellow-100',
    icon: <TriangleAlert size={20} className="mr-2" />,
  },
  error: {
    border: 'border-red-500',
    text: 'text-red-700',
    bg: 'bg-red-100',
    icon: <XCircle size={20} className="mr-2" />,
  },
  info: {
    border: 'border-blue-500',
    text: 'text-blue-700',
    bg: 'bg-blue-100',
    icon: <Info size={20} className="mr-2" />,
  },
  primary: {
    border: 'border-blue-600',
    text: 'text-blue-700',
    bg: 'bg-blue-100',
    icon: <CheckCircle size={20} className="mr-2" />,
  },
  secondary: {
    border: 'border-gray-500',
    text: 'text-gray-700',
    bg: 'bg-gray-100',
    icon: <Circle size={20} className="mr-2" />,
  },
};

const Alert: React.FC<AlertProps> = ({
  children,
  color = 'primary',
  isIcon = true,
  className = '',
  variant = 'outlined',
}) => {
  const style = alertStyles[color] || alertStyles.primary;

  const variantClass =
    variant === 'solid'
      ? `${style.bg} ${style.text}`
      : `bg-transparent ${style.text} border-2 ${style.border}`;

  return (
    <div
      role="alert"
      className={`flex items-center p-3 rounded-md ${variantClass} ${className}`}
    >
      {isIcon && style.icon}
      <span>{children}</span>
    </div>
  );
};

export default Alert;
