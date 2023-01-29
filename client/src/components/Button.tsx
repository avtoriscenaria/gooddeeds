interface PropTypes {
  onClick: () => void;
  label: string;
}

export const Button = ({ onClick, label }: PropTypes) => {
  return (
    <button
      className="py-2 px-6 border border-black rounded-md cursor-pointer hover:opacity-60"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
