import React, { useEffect, useState } from "react";
import { useApi } from "src/hooks";
import { useAppSelector, useAppDispatch } from "src/redux/hooks";
import { GetStaticProps } from "next";
import { setDeeds } from "src/redux/reducers/deeds";
import { A, MainContainer } from "src/components";
import { Accordion } from "src/modules/home/components";
import { _fetch } from "src/helpers/_fetch";
import { api } from "src/constants/api";
import { getUser } from "src/redux/selectors";
import { LSGetter } from "src/helpers";
import { LSItems } from "src/constants";
import { useHome } from "src/modules/home/hooks";
import { FriendsView } from "src/modules/home/FriendsView";

export default function Home(props: any) {
  const { deeds } = useHome();
  return (
    <MainContainer>
      <div>MAIN</div>
      <div className="flex">
        <FriendsView />
        <div>
          <div>DEEDS</div>
          <div>
            <A href="/deed" label="Add deed" />
          </div>
          <div>
            {deeds.map((deed: any, i: number) => (
              <Accordion key={i} deed={deed} />
            ))}
          </div>
        </div>
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
