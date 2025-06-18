import React, { useId } from "react";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  className?: string;
  inputClass?: string;
  isInvalid?: boolean;
  hintError?: string;
}

export default function TextAreaField(props: Props) {
  const {
    label,
    className,
    hint,
    disabled,
    isInvalid,
    hintError,
    inputClass = "w-full",
    ...args
  } = props;
  const id = useId();
  return (
    <div className={className}>
      {label && (
        <label
          className={`block text-sm mb-1 ${disabled ? "text-gray-500" : ""}`}
          htmlFor={id}
        >
          {label} {args.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        className={`block rounded p-2 border focus:outline-1 
        bg-white disabled:bg-slate-50 disabled:text-slate-400  ${inputClass} ${
          isInvalid ? "border-red-500 focus:outline-red-300" : "border-slate-300 focus:outline-blue-300"
        }`}
        id={id}
        disabled={disabled}
        {...args}
      />
      {hintError && <p className="my-2 text-sm text-red-500">{hintError}</p>}
      {hint && <p className="mt-2 text-sm text-gray-500">{hint}</p>}
    </div>
  );
}
