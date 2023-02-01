import React from "react";
import DeedView from "src/modules/deed/DeedView";
import { MainContainer } from "src/components";
import { DEED_EDITOR_TYPE } from "src/constants";

export default function DeedEditing() {
  return (
    <MainContainer>
      <DeedView type={DEED_EDITOR_TYPE} />
    </MainContainer>
  );
}
