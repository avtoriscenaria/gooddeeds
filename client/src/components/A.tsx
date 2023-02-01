import Link from "next/link";
import { ReactNode } from "react";

interface PropTypes {
  href: string;
  label: string | ReactNode;
  className?: string;
}

export const A = ({ href, label, className }: PropTypes) => {
  return (
    <Link
      href={href}
      className={`text-blue-400 text-sm hover:opacity-80 hover:underline${
        className ? " " + className : ""
      }`}
    >
      {label}
    </Link>
  );
};
