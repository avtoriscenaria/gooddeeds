import Link from "next/link";

interface PropTypes {
  href: string;
  label: string;
}

export const A = ({ href, label }: PropTypes) => {
  return (
    <Link
      href={href}
      className="text-blue-400 text-sm hover:opacity-80 hover:underline"
    >
      {label}
    </Link>
  );
};
