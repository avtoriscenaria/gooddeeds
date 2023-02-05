import { Button, Input } from "src/components";
import { useSearch } from "../hooks";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";

export const FriendsSearch = () => {
  const {
    value,
    onChange,
    users,
    userFriends,
    inputRef,
    onAdd,
    onFocus,
    isShow,
    containerRef,
    onClear,
  } = useSearch();

  return (
    <div className="flex flex-col items-start justify-start px-5">
      <div className="text-xs">Search</div>
      <div className="relative max-w-fit" ref={containerRef}>
        <Input
          className="my-0"
          value={value}
          onChange={onChange}
          inputRef={inputRef}
          onFocus={onFocus}
        />
        {isShow && users.length > 0 && (
          <div className="absolute top-8 left-0 border bg-white w-full">
            {users.map((friend: any, i: number) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 border-b-2"
              >
                <div>{friend.nickname}</div>
                {!userFriends.includes(friend._id) && (
                  <Button
                    onClick={onAdd(friend._id)}
                    label={<AiOutlinePlus className="text-xs" />}
                    className="text-xs"
                  />
                )}
              </div>
            ))}
          </div>
        )}
        {value.trim() && (
          <div
            className="absolute top-0 right-0 h-8 w-8 flex items-center justify-center bg-gr cursor-pointer hover:opacity-60"
            onClick={onClear}
          >
            <AiOutlineClose className="text-xs" />
          </div>
        )}
      </div>
    </div>
  );
};
