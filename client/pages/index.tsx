import React from "react";

import { MainContainer } from "src/components";
import { FriendsView } from "src/modules/home/FriendsView";
import { DeedsView } from "src/modules/home/DeedsView";

export default function Home() {
  return (
    <MainContainer>
      <div className="flex h-full">
        <FriendsView />
        <DeedsView />
      </div>
    </MainContainer>
  );
}
