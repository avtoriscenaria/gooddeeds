import { ChangeEvent, useRef, useState } from "react";
import { api } from "src/constants/api";
import { useApi } from "src/hooks";

export function useSearch() {
  const { request: getFriends, data: friends }: any = useApi();
  const inputRef: any = useRef();

  const onChange = function ({
    target: { value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setTimeout(() => {
      if (value === inputRef.current.value) {
        getFriends(api.friends.searchFriends(value));
      }
    }, 1000);
  };

  return { onChange, friends: friends || [], inputRef };
}
