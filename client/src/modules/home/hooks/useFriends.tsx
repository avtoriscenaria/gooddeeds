import { useEffect } from "react";
import { api } from "src/constants/api";
import { useApi } from "src/hooks";

export const useFriends = () => {
  const { request: getFriends, data: friends }: any = useApi();

  useEffect(() => {
    getFriends(api.friends.getFriends);
  }, []);

  return { friends: friends || [] };
};
