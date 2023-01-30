import { A } from "src/components";

interface PropTypes {
  deed: any;
}

export const Accordion = ({ deed }: PropTypes) => {
  const { name, text } = deed;
  return (
    <div>
      Accordion
      <div>{name}</div>
      <div>{text}</div>
      <A href={`/deed/${deed._id}`} label="Edit deed" />
    </div>
  );
};
