import { useEffect, useState } from "react";
import { A, Button } from "src/components";
import { useObserver } from "src/hooks";

interface PropTypes {
  deed: any;
  isEditable?: boolean;
  onDelete: (deed: any) => () => void;
}

export const Accordion = ({ deed, isEditable, onDelete }: PropTypes) => {
  const { containerRef, isShow } = useObserver();
  const [isOpen, setIsOpen] = useState(false);
  const { name, text } = deed;

  useEffect(() => {
    if (!isShow && isOpen) {
      setIsOpen(false);
    }
  }, [isShow, isOpen]);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border rounded-md p-2 m-3 h-min" ref={containerRef}>
      {!isShow ? (
        "Loading..."
      ) : (
        <>
          <div onClick={onClick} className="cursor-pointer">
            <div className="text-xl">{name}</div>
            {isOpen && (
              <div className="overflow-hidden text-ellipsis">{text}</div>
            )}
          </div>
          {isEditable && (
            <div className="flex items-center justify-end">
              <Button label="Delete" onClick={onDelete(deed)} />
              <Button
                label={<A href={`/deed/${deed._id}`} label="Edit" />}
                onClick={() => {}}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
