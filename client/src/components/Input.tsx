import { ChangeEvent, LegacyRef, useState } from "react";

interface PropTypes {
  inputRef?: LegacyRef<HTMLInputElement>;
  textareaRef?: LegacyRef<HTMLTextAreaElement>;
  label?: string;
  className?: string;
  type?: string;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isError?: boolean;
  isTextArea?: boolean;
  name?: string;
  value?: string;
}

export const Input = ({
  className,
  label,
  inputRef,
  textareaRef,
  type,
  onChange,
  isError,
  isTextArea,
  name,
  value,
}: PropTypes) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={`my-4 ${className ? " " + className : ""}`}>
      {label && <div className="mr-2 text-sm mb-1">{label}</div>}
      <div className="relative">
        {isTextArea ? (
          <textarea
            name={name}
            value={value}
            ref={textareaRef}
            className={`border h-8 px-3${isError ? " border-rose-600" : ""}`}
            onChange={onChange}
          />
        ) : (
          <input
            name={name}
            value={value}
            ref={inputRef}
            className={`border h-8 px-3${isError ? " border-rose-600" : ""}`}
            type={isVisible ? "default" : type}
            onChange={onChange}
          />
        )}

        {type === "password" && (
          <div
            className="absolute top-0 right-0 h-8 w-8 flex items-center justify-center cursor-pointer bg-sky-800 text-white"
            onClick={() => setIsVisible(!isVisible)}
          >
            O
          </div>
        )}
      </div>
    </div>
  );
};
