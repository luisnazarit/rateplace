import React, { useRef, useEffect } from "react";

type AutoResizingTextareaProps = {
  onSubmit: (value: string) => void;
  placeholder?: string;
  initialValue?: string;
  onChange: (value: string) => void;
  value?: string;
  maxLength?: number;
  disabled?: boolean;
};

const AutoResizingTextarea: React.FC<AutoResizingTextareaProps> = ({
  onSubmit,
  placeholder = "Escribe algo...",
  onChange,
  disabled,
  maxLength = 300,
  value,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // Ajusta la altura cuando el valor cambia
  useEffect(() => {
    adjustHeight();
  }, [value]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSubmit(value || "");
      onChange("");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    if (newValue.length <= maxLength) {
      onChange(newValue);
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      disabled={disabled}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      rows={1}
      style={{
        resize: "none",
        overflow: "hidden",
        width: "100%",
      }}
      className="bg-transparent outline-none border-none p-0"
    />
  );
};

export default AutoResizingTextarea;
