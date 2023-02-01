import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { api } from "src/constants/api";
import { useApi } from "src/hooks";
import { useAppSelector } from "src/redux/hooks";
import { setUser } from "src/redux/reducers/user";
import { getUser } from "src/redux/selectors";

export const useMain = () => {
  const router = useRouter();
  const {
    request: getUserRequest,
    data: userData = {},
    isLoading: _isLoading,
  }: any = useApi();
  const { request: logout }: any = useApi();
  const dispatch = useDispatch();
  const user = useAppSelector(getUser);

  const isLoading = useMemo(() => !!user && _isLoading, [user, _isLoading]);

  useEffect(() => {
    if (user === null) {
      getUserRequest(api.user.getUser);
    }
  }, [user]);

  useEffect(() => {
    if (userData && user === null) {
      dispatch(setUser(userData));
    }
  }, [userData, user]);

  const onLogout = async () => {
    const res = await logout(api.auth.logout);
    if (res.ok) {
      localStorage.clear();
      dispatch(setUser(null));
      router.push({
        pathname: "/login",
      });
    }
  };

  return { user: user || {}, router, onLogout, isLoading };
};
