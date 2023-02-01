import React from "react";
import { A, Button, Input, Loader } from "src/components";
import { DEED_EDITOR_TYPE } from "src/constants";
import { useDeed } from "src/modules/deed/hooks";

interface PropTypes {
  type?: string;
}

export default function DeedView({ type }: PropTypes) {
  const { deedName, deedText, onChange, onSubbmit, isLoading, isSaving } =
    useDeed(type);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {isLoading ? (
        <Loader className="text-xl" />
      ) : (
        <div className="p-8 bg-cyan-600">
          <h1 className="text-white">
            {type === DEED_EDITOR_TYPE ? "Edit good deed" : "Create good deed"}
          </h1>
          <Input name="deedName" value={deedName} onChange={onChange} />
          <Input
            isTextArea
            name="deedText"
            value={deedText}
            onChange={onChange}
          />
          <div className="flex justify-end text-base">
            <Button
              label={isSaving ? <Loader /> : "Subbmit"}
              onClick={onSubbmit}
              disabled={isSaving}
            />
          </div>
        </div>
      )}
    </div>
  );
}
