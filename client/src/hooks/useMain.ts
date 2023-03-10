import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { api } from "src/constants/api";
import { useApi } from "src/hooks";
import { useAppSelector } from "src/redux/hooks";
import { removeMessage } from "src/redux/reducers/message";
import { setUser } from "src/redux/reducers/user";
import { getMessage, getUser } from "src/redux/selectors";

export const useMain = () => {
  const router = useRouter();
  const { request, data: userData = {} }: any = useApi();
  const dispatch = useDispatch();
  const user = useAppSelector(getUser);
  const message = useAppSelector(getMessage);

  const isLoading = useMemo(() => user === null, [user]);

  useEffect(() => {
    if (user === null) {
      request(api.user.getUser);
    }
  }, [user]);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(removeMessage());
      }, 1500);
    }
  }, [message]);

  useEffect(() => {
    if (userData && user === null) {
      dispatch(setUser(userData));
    }
  }, [userData, user]);

  return { router, isLoading, message };
};
