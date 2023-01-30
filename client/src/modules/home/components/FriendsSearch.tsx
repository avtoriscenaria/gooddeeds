import { Input } from "src/components";
import { useSearch } from "../hooks";

export const FriendsSearch = () => {
  const { onChange, friends, inputRef } = useSearch();
  return (
    <div className="w-1/4">
      <div>SEARCH</div>
      <Input onChange={onChange} inputRef={inputRef} />
      <div>
        {friends.map((friend: any, i: number) => (
          <div key={i}>{friend.nickname}</div>
        ))}
      </div>
    </div>
  );
};
