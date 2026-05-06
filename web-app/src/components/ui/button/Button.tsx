import React from "react";

interface Props {
  title: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

export default function Button({
  title,
  onClick,
  variant = "primary",
}: Props) {
  const styles = {
    primary:
      "bg-black text-white hover:bg-green-500",

    secondary:
      "bg-green-100 text-green-700 hover:bg-green-200",
  };

  return (
    <button
      onClick={onClick}
      className={`
        w-full
        py-3
        rounded-2xl
        font-medium
        transition-all
        duration-300
        ${styles[variant]}
      `}
    >
      {title}
    </button>
  );
}