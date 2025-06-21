"use client";
import { Eye, EyeClosed } from "lucide-react";
import React, { useState, useId } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  id?: string;
  type?: string;
  className?: string;
  inputClass?: string;
  isInvalid?: boolean;
  hintError?: string;
  IconStart?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export default function TextField(props: Props) {
  const idDefault = useId();
  const {
    label,
    className,
    hint,
    disabled,
    type = "text",
    inputClass = "w-full",
    isInvalid,
    hintError,
    IconStart,
    style,
    ...args
  } = props;

  const [showPass, setShowPass] = useState(false);
  const [typeInput, setTypeInput] = useState(type);
  const id = useId();
  return (
    <div className={className}>
      {label && (
        <label
          className={`block text-sm mb-1 ${disabled ? "text-gray-500" : "text-slate-300"}`}
          htmlFor={id}
        >
          {label} {args.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        style={style}
        className={`relative items-center gap-2 flex rounded p-2 border focus:outline-1 
         disabled:bg-slate-400 disabled:text-slate-600 ${inputClass} ${
          isInvalid
            ? "border-red-500 focus:outline-red-300"
            : "border-slate-600 focus:outline-blue-300"
        } ${disabled ? "cursor-not-allowed bg-slate-800 text-slate-600" : "text-white bg-slate-800"}`}
      >
        {IconStart && <div><IconStart className="w-4 h-4" /></div>}
        <input
          className="focus:outline-none w-full"
          id={id || idDefault}
          style={{
            lineHeight: "1.55",
          }}
          type={typeInput}
          disabled={disabled}
          {...args}
        />
        {type === "password" && (
          <span
            onClick={() => {
              setShowPass((showPass) => !showPass);
              setTypeInput(showPass ? "password" : "text");
            }}
            className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPass ? <Eye /> : <EyeClosed />}
          </span>
        )}
      </div>
      {hintError && <p className="my-2 text-sm text-red-500">{hintError}</p>}
      {hint && <p className="mt-2 text-sm text-gray-500">{hint}</p>}
    </div>
  );
}
