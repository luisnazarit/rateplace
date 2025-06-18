import React, { useEffect, useState } from "react";

const switchStyles = {
  switchContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  switch: {
    position: "relative",
    display: "inline-block",
    width: "35px",
    height: "20px",
  },
  slider: {
    position: "absolute",
    cursor: "pointer",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "#ccc",
    transition: "0.4s",
    borderRadius: "20px",
  },
  sliderBefore: {
    position: "absolute",
    content: '""',
    height: "16px",
    width: "16px",
    left: "3px",
    bottom: "2px",
    backgroundColor: "white",
    transition: "0.4s",
    borderRadius: "50%",
  },
  input: {
    opacity: "0",
    width: "0",
    height: "0",
  },
  disabled: {
    opacity: "0.6",
    cursor: "not-allowed",
  },
};

type Props = {
  label: string;
  checked?: boolean | null;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
  className?: string;
};

const SwitchField = ({
  label,
  checked,
  onChange,
  disabled,
  name,
  className,
}: Props) => {
  const [isChecked, setIsChecked] = useState(checked || false);
  const handleToggle = () => {
    if (!disabled) {
      const newChecked = !isChecked;
      setIsChecked(newChecked);
      if (onChange) {
        onChange(newChecked);
      }
    }
  };

  useEffect(() => {
    setIsChecked(checked || false);
  }, [checked]);

  return (
    <div className={className}>
      <label
        className={`flex items-center gap-2 ${
          disabled ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        <div
          style={{
            ...switchStyles.switch,
            ...(disabled ? switchStyles.disabled : {}),
          }}
        >
          <input
            type="checkbox"
            checked={isChecked}
            name={name}
            onChange={handleToggle}
            disabled={disabled}
            style={switchStyles.input}
          />
          <span
            style={{
              ...switchStyles.slider,
              backgroundColor: isChecked ? "var(--color-primary-500)" : "#ccc",
            }}
          >
            <span
              style={{
                ...switchStyles.sliderBefore,
                transform: isChecked ? "translateX(12px)" : "translateX(0)",
              }}
            />
          </span>
        </div>
        {label && <span>{label}</span>}
      </label>
    </div>
  );
};

export default SwitchField;
