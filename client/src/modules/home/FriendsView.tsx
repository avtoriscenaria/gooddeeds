import { A } from "src/components";
import { FriendsSearch } from "./components/FriendsSearch";
import { useFriends } from "./hooks";

export const FriendsView = () => {
  const { friends } = useFriends();
  return (
    <div className="w-1/4 min-w-fit px-5 py-3 border-r">
      <h1>FRIENDS</h1>
      <FriendsSearch />
      <div>
        {friends.map((friend: any, i: number) => (
          <div key={i}>
            <A href={`/friends/${friend._id}`} label={friend.nickname} />
          </div>
        ))}
      </div>
    </div>
  );
};
