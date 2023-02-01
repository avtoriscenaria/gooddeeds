import React from "react";
import { MainContainer } from "src/components";
import DeedView from "src/modules/deed/DeedView";
import { DeedCard } from "src/modules/home/components";
import { DeedsView } from "src/modules/home/DeedsView";
import { FriendsView } from "src/modules/home/FriendsView";
import { useFriendDeeds } from "src/modules/home/hooks";

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
