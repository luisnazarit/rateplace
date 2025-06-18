"use client"

import Select from "react-select";
import { customStyles } from "./custom/react-select";

interface Item {
  label: string;
  value: string;
}

interface Props {
  hint?: string;
  label?: string;
  className?: string;
  placeholder?: string;
  name?: string;
  isInvalid?: boolean;
  hintError?: string;
  isMulti?: boolean;
  options: Item[];
  value?: Item['value'];
  onChange?: (items: string | number) => void;
}

export default function SimpleSelect({
  value,
  className,
  placeholder,
  label,
  isInvalid,
  isMulti,
  hint,
  name,
  onChange,
  hintError,
  options,
  ...rest
}: Props) {

  const selected = options.find((item) => item.value === value);

  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block mb-2">{label}</label>}
      <Select
        placeholder={placeholder}
        onChange={(e: any) => {
          if (onChange) onChange(e.value);
        }}
        styles={customStyles(isInvalid)}
        isMulti={isMulti}
        value={selected}
        options={options}
        name={name}
        {...rest}
      />
      {hintError && <p className="my-2 text-sm text-red-500">{hintError}</p>}
      <small className="block text-gray-500">{hint}</small>
    </div>
  );
}
