import React from "react";

interface Props {
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export default function Input({
  placeholder,
  type = "text",
  value,
  onChange,
}: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        w-full
        px-5
        py-4
        rounded-2xl
        border
        border-gray-200
        bg-white
        focus:outline-none
        focus:ring-2
        focus:ring-green-500
        transition
      "
    />
  );
}