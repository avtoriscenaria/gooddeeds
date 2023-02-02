import React from "react";
import { MainContainer } from "src/components";
import { DeedsView } from "src/modules/home/DeedsView";
import { FriendsView } from "src/modules/home/FriendsView";

export default function FriendDeeds() {
  return (
    <MainContainer>
      <div className="flex h-full">
        <FriendsView />
        <DeedsView isFriend />
      </div>
    </MainContainer>
  );
}
