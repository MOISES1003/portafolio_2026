import React, { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  touched?: boolean;
};

export const Input = ({
  label,
  error,
  touched,
  ...inputProps
}: Props) => {
  return (
    <div>
      {label && <label className="text-sm text-gray-500">{label}</label>}

      <input
        {...inputProps}
        className={`border p-2 w-full text-black rounded-md ${
          error && touched ? "border-red-500" : "border-gray-300"
        }`}
      />

      {touched && error && (
        <p className="text-red-500 text-[12px]">{error}</p>
      )}
    </div>
  );
};