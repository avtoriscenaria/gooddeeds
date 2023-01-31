import React from "react";
import { GetStaticProps } from "next";

import { MainContainer } from "src/components";
import { FriendsView } from "src/modules/home/FriendsView";
import { DeedsView } from "src/modules/home/DeedsView";

export default function Home(props: any) {
  return (
    <MainContainer>
      <div className="flex h-full">
        <FriendsView />
        <DeedsView />
      </div>
    </MainContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  //const deeds = _fetch(api.deads.getDeeds);
  // console.log(
  //   "deeds",
  //   window.localStorage.getItem(LSGetter(LSItems.ACCESS_KEY))
  // );
  return {
    props: {},
  };
};
