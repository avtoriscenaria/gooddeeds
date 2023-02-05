import { Loader } from "src/components";
import { FriendCard } from "./components";
import { FriendsSearch } from "./components/FriendsSearch";
import { useFriends } from "./hooks";

export const FriendsView = () => {
  const { friends, isLoading, selectedUserId } = useFriends();
  return (
    <div className="w-1/4 min-w-fit py-3 border-r flex flex-col">
      <h1 className="pb-3 px-5">FRIENDS</h1>
      <FriendsSearch />
      <div className="px-5 overflow-auto">
        {isLoading ? (
          <Loader />
        ) : (
          friends.map((friend: any, i: number) => (
            <FriendCard
              key={friend._id}
              friend={friend}
              selectedUserId={selectedUserId}
            />
          ))
        )}
      </div>
    </div>
  );
};
