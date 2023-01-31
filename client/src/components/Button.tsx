import { ReactNode } from "react";

interface PropTypes {
  onClick: () => void;
  label: string | ReactNode;
  className?: string;
}

export const Button = ({ onClick, label, className }: PropTypes) => {
  return (
    <button
      className={`py-2 px-6 border border-black rounded-md cursor-pointer hover:opacity-60${
        className ? " " + className : ""
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
