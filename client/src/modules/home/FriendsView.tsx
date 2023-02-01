import { Loader } from "src/components";
import { FriendCard } from "./components";
import { FriendsSearch } from "./components/FriendsSearch";
import { useFriends } from "./hooks";

export const FriendsView = () => {
  const { friends, isLoading, onDelete, onAdd, selectedUserId } = useFriends();
  return (
    <div className="w-1/4 min-w-fit px-5 py-3 border-r">
      <h1 className="pb-3">FRIENDS</h1>
      <FriendsSearch onAdd={onAdd} />
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          friends.map((friend: any, i: number) => (
            <FriendCard
              key={friend._id}
              friend={friend}
              onDelete={onDelete}
              selectedUserId={selectedUserId}
            />
          ))
        )}
      </div>
    </div>
  );
};
