import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "src/constants/api";
import { useApi } from "src/hooks";

export const useFriendDeeds = () => {
  const router = useRouter();
  const friend_id: any = router.query.id;
  const { request: getFriendDeeds, data: deeds }: any = useApi();
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    if (friend_id && !isLoad) {
      getFriendDeeds(api.deeds.getUserDeeds(friend_id));
      setIsLoad(true);
    }
  }, [friend_id, isLoad]);

  return { deeds: deeds || [] };
};
