import { ReactNode } from "react";

interface PropTypes {
  onClick: () => void;
  label: string | ReactNode;
  className?: string;
  disabled?: boolean;
  type?: string;
}

export const Button = ({ onClick, label, className, disabled }: PropTypes) => {
  return (
    <button
      className={`py-1 px-3 border border-black bg-white rounded-md cursor-pointer hover:text-cyan-500 hover:border-cyan-500${
        disabled
          ? " bg-gray hover:text-gray-400 text-gray-400 hover:border-gray-300 border-gray-300 bg-gray-300 cursor-default "
          : ""
      }${className ? " " + className : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
