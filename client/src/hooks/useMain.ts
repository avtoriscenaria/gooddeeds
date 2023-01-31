import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { api } from "src/constants/api";
import { useApi } from "src/hooks";
import { useAppSelector } from "src/redux/hooks";
import { setUser } from "src/redux/reducers/user";
import { getUser } from "src/redux/selectors";

export const useMain = () => {
  const { request, data = {} }: any = useApi();
  const dispatch = useDispatch();
  const user = useAppSelector(getUser);

  useEffect(() => {
    if (user === null) {
      request(api.user.getUser);
    }
  }, [user]);

  useEffect(() => {
    if (data && user === null) {
      dispatch(setUser(data));
    }
  }, [data, user]);

  return { user: user || {} };
};
