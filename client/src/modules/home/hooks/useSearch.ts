import { ChangeEvent, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "src/constants/api";
import { useApi, useOnClickOutside } from "src/hooks";
import { useAppSelector } from "src/redux/hooks";
import { getUserFriends } from "src/redux/selectors";
import { addFriend as addFriendToRedux } from "src/redux/reducers/friends";
import { addFriend as addFriendToUser } from "src/redux/reducers/user";

export function useSearch() {
  const { request: getFriends, data: users, clean }: any = useApi();
  const { request: addFriend }: any = useApi();
  const [value, setValue] = useState("");
  const [isShow, setIsShow] = useState(false);
  const userFriends = useAppSelector(getUserFriends);
  const containerRef: any = useRef();
  const dispatch = useDispatch();

  useOnClickOutside(containerRef, onClear);
  const inputRef: any = useRef();

  const onChange = function ({
    target: { value: eventValue },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setValue(eventValue.trim());
    setTimeout(() => {
      if (eventValue === inputRef.current.value) {
        if (eventValue.trim()) {
          getFriends(api.friends.searchFriends(eventValue.trim()));
        } else {
          clean();
        }
      }
    }, 1000);
  };

  const _onAdd = (friend_id: string) => async () => {
    let res = await addFriend(api.friends.addFriend(friend_id));
    if (res?.ok && res?.data) {
      onClear();
      dispatch(addFriendToRedux(res.data));
      dispatch(addFriendToUser(res.data._id));
    }
  };

  const onFocus = () => {
    setIsShow(true);
  };

  function onClear() {
    setValue("");
    setIsShow(false);
    clean();
  }

  return {
    onChange,
    users: users || [],
    userFriends,
    inputRef,
    onAdd: _onAdd,
    onFocus,
    isShow,
    containerRef,
    value,
    onClear,
  };
}
