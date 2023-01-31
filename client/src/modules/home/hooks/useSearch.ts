import { ChangeEvent, useRef, useState } from "react";
import { api } from "src/constants/api";
import { useApi, useOnClickOutside } from "src/hooks";

export function useSearch() {
  const { request: getFriends, data: friends, clean }: any = useApi();
  const { request: addFriend }: any = useApi();
  const [value, setValue] = useState("");
  const [isShow, setIsShow] = useState(false);
  const containerRef: any = useRef();
  useOnClickOutside(containerRef, () => {
    setValue("");
    setIsShow(false);
    clean();
  });
  const inputRef: any = useRef();

  const onChange = function ({
    target: { value: eventValue },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setValue(eventValue);
    setTimeout(() => {
      if (eventValue === inputRef.current.value) {
        getFriends(api.friends.searchFriends(eventValue));
      }
    }, 1000);
  };

  const onAdd = (friend_id: string) => () => {
    addFriend(api.friends.addFriend(friend_id));
  };

  const onFocus = () => {
    setIsShow(true);
  };

  return {
    onChange,
    friends: friends || [],
    inputRef,
    onAdd,
    onFocus,
    isShow,
    containerRef,
    value,
  };
}
