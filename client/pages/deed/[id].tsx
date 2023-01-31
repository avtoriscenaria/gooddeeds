import React from "react";
import DeedView from "src/modules/deed/DeedView";
import { MainContainer } from "src/components";

export default function DeedEditing() {
  return (
    <MainContainer>
      <DeedView type="editor" />
    </MainContainer>
  );
}
