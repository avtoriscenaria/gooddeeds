import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { api } from "src/constants/api";
import { useApi } from "src/hooks";
import { addFriend, deleteFriend } from "src/redux/reducers/user";

export const useFriends = () => {
  const router = useRouter();
  const selectedUserId: any = router.query.id;

  const {
    request: getFriends,
    data: friends,
    isLoading,
    update,
  }: any = useApi();
  const dispatch = useDispatch();

  useEffect(() => {
    getFriends(api.friends.getFriends);
  }, []);

  const onDelete = (friend_id: string) => {
    update((friends || []).filter((friend: any) => friend._id !== friend_id));
    dispatch(deleteFriend(friend_id));
  };

  const onAdd = (data: any) => {
    update([...(friends || []), data]);
    dispatch(addFriend(data._id));
  };

  return { friends: friends || [], isLoading, onDelete, onAdd, selectedUserId };
};
