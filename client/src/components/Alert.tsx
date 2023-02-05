import { createPortal } from "react-dom";

interface PropTypes {
  messageData?: {
    message: string;
    color?: string;
  };
}

export const Alert = ({ messageData }: PropTypes) => {
  return (
    <div>
      {Boolean(messageData) &&
        createPortal(
          <div
            className="absolute top-8 right-8 p-2 bg-green-400 text-white text-sm"
            style={{ width: 180, backgroundColor: messageData?.color }}
          >
            {messageData?.message}
          </div>,
          document.getElementsByTagName("body")[0]
        )}
    </div>
  );
};
