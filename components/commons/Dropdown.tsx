"use client";
import React, { ReactNode, MouseEvent, useState, useRef } from "react";

// Dropdown Item Component
type DropdownItemProps = {
  label: string;
  onClick?: () => void;
  href?: string;
  icon?: ReactNode;
  color?: "secondary" | "primary" | "inherit" | "success" | "error" | "info" | "warning";
};

type DropdownProps = {
  buttonLabel: string | ReactNode; // The button text that triggers the dropdown
  children: ReactNode;
  classNameButton?: string;
  color?: "secondary" | "primary" | "inherit" | "success" | "error" | "info" | "warning";
  size?: "small" | "medium" | "large";
  sx?: React.CSSProperties;
  classNameContainer?: string;
};

const colorText = {
  warning: 'text-amber-500',
  error: 'text-red-500',
  primary: 'text-primary-500',
  secondary: 'text-secondary-500',
  info: 'text-blue-500',
}

// Dropdown Item Component
export const DropdownItem: React.FC<DropdownItemProps> = ({ label, onClick, href, icon, color }) => {
  const Content = href ? "a" : "div";
  return (
    <Content
      role="menuitem"
      href={href}
      onClick={onClick}
      className={`dropdown-item flex gap-2 items-center py-3 px-4 cursor-pointer ${color ? colorText[color]  : ''}`}
    >
      {icon && <span className={`icon ${!color ? 'text-gray-500' : ''}`}>{icon}</span>}
      {label}
    </Content>
  );
};

// Dropdown Component
export const Dropdown: React.FC<DropdownProps> = ({
  buttonLabel,
  children,
  classNameButton,
  classNameContainer,
  sx,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = (event: MouseEvent) => {
    // Close the menu if clicked outside
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    // Listen for click events to close menu when clicking outside
    document.addEventListener("click", handleClose);

    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, []);

  return (
    <div className="dropdown-container relative" style={sx}>
      <button
        ref={buttonRef}
        // className={`dropdown-button ${size ? size : "medium"} ${color ? color : "primary"}`}
        className={classNameButton}
        onClick={toggleMenu}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : "false"}
      >
        {buttonLabel}
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          className={`dropdown-menu absolute bg-dark-300 shadow-md rounded-md z-10 right-0 ${classNameContainer}`}
          aria-labelledby="dropdown-button"
        >
          {React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(child, {
                  onClick: () => {
                    if (child.props.onClick) {
                      child.props.onClick();
                    }
                    setIsOpen(false); // Close menu after item click
                  },
                })
              : child
          )}
        </div>
      )}
    </div>
  );
};
