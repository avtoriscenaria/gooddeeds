interface PropTypes {
  className?: string;
}

export const Loader = ({ className }: PropTypes) => {
  return <div className={className}>Loading...</div>;
};
