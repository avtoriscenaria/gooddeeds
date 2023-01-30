import { FriendsSearch } from "./components/FriendsSearch";
import { useFriends } from "./hooks";

export const FriendsView = () => {
  const { friends } = useFriends();
  return (
    <div className="w-1/4">
      <div>FRIENDS</div>
      <FriendsSearch />
      <div>
        {friends.map((friend: any, i: number) => (
          <div key={i}>{friend.name}</div>
        ))}
      </div>
    </div>
  );
};
