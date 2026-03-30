import React, { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  touched?: boolean;
};

export const Textarea = ({
  label,
  error,
  touched,
  ...textareaProps
}: Props) => {
  return (
    <div>
      {label && (
        <label className="text-sm text-gray-500">
          {label}
        </label>
      )}

      <textarea
        {...textareaProps}
        className={`border p-2 w-full text-black rounded-md resize-none ${
          error && touched ? "border-red-500" : "border-gray-300"
        }`}
      />

      {touched && error && (
        <p className="text-red-500 text-[12px]">
          {error}
        </p>
      )}
    </div>
  );
};