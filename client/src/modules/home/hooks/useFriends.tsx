import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { api } from "src/constants/api";
import { useApi } from "src/hooks";
import { setFriends } from "src/redux/reducers/friends";
import { getFriends as getFriendsSelector } from "src/redux/selectors";

export const useFriends = () => {
  const router = useRouter();
  const selectedUserId: any = router.query.id;
  const friends = useSelector(getFriendsSelector);

  const { request, isLoading }: any = useApi();
  const dispatch = useDispatch();

  const getFriends = async () => {
    const res = await request(api.friends.getFriends);
    if (res.ok) {
      dispatch(setFriends(res.data));
    }
  };

  useEffect(() => {
    if (friends === null) {
      getFriends();
    }
  }, [friends]);

  return { friends: friends || [], isLoading, selectedUserId };
};
