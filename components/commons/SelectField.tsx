"use client"
import React from "react";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value?: string; label: string }[];
  label?: string;
  value?: string | number;
  className?: string;
  hintError?: string;
  inputClass?: string;
  isInvalid?: boolean;
}

export default function SelectField({
  options,
  className = "",
  value,
  label,
  hintError,
  inputClass,
  isInvalid,
  ...rest
}: Props) {
  return (
    <div className={className}>
      <div className="custom-select">
        {label && <label className="block mb-1 text-sm">{label}</label>}
        <select
          value={value}
          className={`block w-full rounded p-2 border focus:outline-1 text-white 
            disabled:bg-slate-400 disabled:text-slate-600 ${inputClass} ${
               isInvalid ? "border-red-500 focus:outline-red-300" : "border-slate-600 focus:outline-blue-300"
             }`}
          {...rest}
        >
          {!value && <option value="">Seleccione una opción</option>}
          {options.map((e) => (
            <option
              key={e.value || Math.random()}
              value={e.value}
            >
              {e.label}
            </option>
          ))}
        </select>
        {hintError && (
          <span className="text-red-500 text-xs">{hintError}</span>
        )}
      </div>
    </div>
  );
}
