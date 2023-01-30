import { useEffect } from "react";
import { api } from "src/constants/api";
import { useApi } from "src/hooks";

export const useHome = () => {
  const { request: getDeeds, data: deeds }: any = useApi();

  useEffect(() => {
    getDeeds(api.deads.getDeeds);
  }, []);

  return { deeds: deeds || [] };
};
