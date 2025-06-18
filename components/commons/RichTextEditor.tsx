"use client"

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/components/commons/Editor"), {
  ssr: false
});
import "quill/dist/quill.snow.css";

type Props = {
  className?: string;
  onChange?: (value: string) => void;
  label?: string;
  required?: boolean;
  value?: string;
  classNameInput?: string;
  isInvalid?: boolean;
  hintError?: string;
  height?: string;
  hint?: string;
  disabled?: boolean;
};

export default function RichTextEditor({
  className,
  onChange,
  label,
  required,
  isInvalid,
  hintError,
  height,
  hint,
  value,
  disabled = false,
  classNameInput,
}: Props) {
  const [lastChange, setLastChange] = useState(value);

  const quillRef = useRef(null);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      if (onChange) onChange(lastChange || "");
    } else {
      isMounted.current = true;
    }
  }, [lastChange]);

  return (
    <div className={className}>
      <Editor
        ref={quillRef}
        classNameInput={`${classNameInput} ${isInvalid ? "editor-error" : ""}`}
        label={label}
        height={height}
        defaultValue={value}
        required={required}
        onTextChange={setLastChange}
        readOnly={disabled}
      />
      {hintError && <p className="my-2 text-sm text-red-500">{hintError}</p>}
      {hint && <p className="mt-2 text-sm text-gray-500">{hint}</p>}
    </div>
  );
};
