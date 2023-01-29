import React, { useEffect, useState } from "react";
import { useApi } from "src/hooks";
import { useAppSelector, useAppDispatch } from "src/redux/hooks";
import { GetStaticProps } from "next";
import { setDeeds } from "src/redux/reducers/deeds";

export default function Home(props: any) {
  const { request } = useApi();
  const { deeds } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  return <div>MAIN</div>;
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
