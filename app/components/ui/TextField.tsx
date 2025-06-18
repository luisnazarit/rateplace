import { Field, FieldProps } from "formik";
import React from "react";

interface TextFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  required = false,
}) => {
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <div>
          <label className="block text-sm font-medium text-gray-500" htmlFor={name}>{label}</label>
          <input
            {...field}
            id={name}
            type={type}
            required={required}
            className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${
              meta.touched && meta.error 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-500 focus:border-blue-500 focus:ring-blue-500'
            } placeholder-gray-500 text-white/80 focus:outline-none focus:z-10`}
            placeholder={placeholder}
          />
          {meta.touched && meta.error && (
            <div className="text-red-500 text-sm mt-1">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
};
