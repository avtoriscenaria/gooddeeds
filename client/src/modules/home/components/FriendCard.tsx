import { useEffect, useState } from "react";
import { A, Button } from "src/components";
import { api } from "src/constants/api";
import { useApi, useObserver } from "src/hooks";

interface PropTypes {
  friend: any;
  selectedUserId?: string;
  onDelete: (friend_id: string) => void;
}

export const FriendCard = ({
  friend,
  selectedUserId,
  onDelete: onDeleteFromProps,
}: PropTypes) => {
  const { request, isLoading } = useApi();

  const onDelete = async () => {
    const res = await request(api.friends.deleteFriend(friend._id));
    if (res.ok) {
      onDeleteFromProps(friend._id);
    }
  };

  console.log(
    "selectedUserId",
    selectedUserId,
    friend._id,
    selectedUserId === friend._id
  );

  return (
    <div
      key={friend._id}
      className={`my-2 py-2 px-2 w-full flex items-center justify-between${
        selectedUserId === friend._id ? " bg-yellow-100" : " bg-slate-100"
      }`}
    >
      <A href={`/friends/${friend._id}`} label={friend.nickname} />
      <Button onClick={onDelete} label={"x"} disabled={isLoading} />
    </div>
  );
};
