import React from "react";
import { MainContainer } from "src/components";
import DeedView from "src/modules/deed/DeedView";
import { Accordion } from "src/modules/home/components";
import { useFriendDeeds } from "src/modules/home/hooks";

export default function FriendDeeds() {
  const { deeds } = useFriendDeeds();
  return (
    <MainContainer>
      <div>
        {deeds.length
          ? deeds.map((deed: any, i: number) => <Accordion deed={deed} />)
          : "NO DEEDS ("}
      </div>
    </MainContainer>
  );
}
