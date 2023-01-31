import React from "react";
import { A, Button, Input } from "src/components";
import { useDeed } from "src/modules/deed/hooks";

interface PropTypes {
  type?: string;
}

export default function DeedView({ type }: PropTypes) {
  const { deedName, deedText, onChange, onSubbmit } = useDeed(type);

  return (
    <div className="flex flex-col min-h-screen bg-slate-500">
      <A href="/" label="Back" />
      <Input name="deedName" value={deedName} onChange={onChange} />
      <Input isTextArea name="deedText" value={deedText} onChange={onChange} />
      <Button label="Subbmit" onClick={onSubbmit} />
    </div>
  );
}
