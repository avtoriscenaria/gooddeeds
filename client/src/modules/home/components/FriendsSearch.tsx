import { Button, Input } from "src/components";
import { useSearch } from "../hooks";

export const FriendsSearch = () => {
  const {
    value,
    onChange,
    friends,
    inputRef,
    onAdd,
    onFocus,
    isShow,
    containerRef,
  } = useSearch();
  return (
    <div className="">
      <div>SEARCH</div>
      <div className="relative max-w-fit" ref={containerRef}>
        <Input
          value={value}
          onChange={onChange}
          inputRef={inputRef}
          onFocus={onFocus}
        />
        {isShow && friends.length > 0 && (
          <div className="absolute top-8 left-0 border bg-white w-full">
            {friends.map((friend: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-2">
                <div>{friend.nickname}</div>
                <Button onClick={onAdd(friend._id)} label="ADD" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
