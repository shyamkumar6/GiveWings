import React from "react";

interface Props {
  title: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function CategoryCard({
  title,
  selected,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        px-5
        py-4
        rounded-2xl
        border
        transition-all
        font-medium

        ${
          selected
            ? "bg-green-500 text-black border-green-500"
            : "bg-white border-gray-200 hover:border-green-400"
        }
      `}
    >
      {title}
    </button>
  );
}