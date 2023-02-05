import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { A, Button } from "src/components";
import { api } from "src/constants/api";
import { useApi } from "src/hooks";
import { deleteFriend } from "src/redux/reducers/friends";
import { deleteFriend as deleteFriendFromUser } from "src/redux/reducers/user";
import { AiOutlineClose } from "react-icons/ai";

interface PropTypes {
  friend: any;
  selectedUserId?: string;
}

export const FriendCard = ({ friend, selectedUserId }: PropTypes) => {
  const { request, isLoading } = useApi();
  const dispatch = useDispatch();

  const onDelete = async () => {
    const res = await request(api.friends.deleteFriend(friend._id));
    if (res?.ok) {
      dispatch(deleteFriend(friend._id));
      dispatch(deleteFriendFromUser(friend._id));
    }
  };

  return (
    <div
      key={friend._id}
      className={`my-2 py-2 px-2 w-full flex items-center justify-between${
        selectedUserId === friend._id ? " bg-yellow-100" : " bg-slate-100"
      }`}
    >
      <A href={`/friends/${friend._id}`} label={friend.nickname} />
      <Button
        onClick={onDelete}
        label={<AiOutlineClose className="text-xs" />}
        disabled={isLoading}
      />
    </div>
  );
};
