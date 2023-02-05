import { useEffect, useState } from "react";
import { A, Button } from "src/components";
import { useObserver } from "src/hooks";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

interface PropTypes {
  deed: any;
  isEditable?: boolean;
  isFriend?: boolean;
  onDelete: (deed: any) => () => void;
}

export const DeedCard = ({
  deed,
  isEditable,
  onDelete,
  isFriend,
}: PropTypes) => {
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
            <div className="text-xl text-cyan-500 hover:opacity-70 flex justify-start items-center">
              {name} {isOpen ? <AiFillCaretDown /> : <AiFillCaretUp />}
            </div>
            {isOpen && (
              <div className="overflow-hidden text-ellipsis">{text}</div>
            )}
          </div>
          {isEditable && (
            <div className="flex items-center justify-end">
              <Button label="Delete" onClick={onDelete(deed)} />
              <A
                className="text-black text-base ml-4"
                href={`/deed/${deed._id}`}
                label={<Button label="Edit" onClick={() => {}} />}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
