import { useRef } from "react";
import { createPortal } from "react-dom";
import { useOnClickOutside } from "src/hooks";
import { Button } from "./Button";

interface PropTypes {
  title: string;
  description: string;
  onSubbmit: () => void;
  onCancel: () => void;
}

export const Dialog = ({
  title,
  description,
  onSubbmit,
  onCancel,
}: PropTypes) => {
  const outsideRef: any = useRef();
  useOnClickOutside(outsideRef, onCancel);

  return createPortal(
    <div className="fixed w-screen h-screen flex items-center justify-center top-0 left-0">
      <div className="w-screen h-screen bg-black opacity-30" />
      <div className="absolute w-screen h-screen top-0 left-0 flex items-center justify-center z-10">
        <div className="bg-white p-10" ref={outsideRef}>
          <div>{title}</div>
          <div>{description}</div>
          <div className="flex items-center justify-between">
            <Button label="Cancel" onClick={onCancel} />
            <Button label="OK" onClick={onSubbmit} />
          </div>
        </div>
      </div>
    </div>,
    document.getElementsByTagName("body")[0]
  );
};
