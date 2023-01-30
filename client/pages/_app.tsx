import "styles/global.css";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "src/redux/store";
import { LSItems, publicPaths } from "src/constants";
import { LSGetter } from "src/helpers";
import { useRouter } from "next/router";
import { useApi } from "src/hooks";
import { api } from "src/constants/api";
import { _fetch } from "src/helpers/_fetch";
import { useDispatch } from "react-redux";
import { setUser } from "src/redux/reducers/user";

interface AppProps {
  Component: React.ComponentType;
  pageProps: any;
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    checkAuth(router.asPath);

    const hideContent = () => setIsAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    router.events.on("routeChangeComplete", checkAuth);

    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", checkAuth);
    };
  }, []);

  const checkAuth = async (url: string) => {
    const path = url.split("?")[0];
    console.log("path", path);
    const refresh_token = LSGetter(LSItems.REFRESH_KEY);
    const access_token = LSGetter(LSItems.ACCESS_KEY);

    if ((!refresh_token || !access_token) && !publicPaths.includes(path)) {
      setIsAuthorized(false);
      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });
    } else {
      // const { user, status } = await _fetch(api.user.getUser);
      // if (status) {
      //   dispatch(setUser(user));
      //   setIsAuthorized(true);
      // } else {
      //   localStorage.clear();
      // }

      setIsAuthorized(true);
    }
  };

  return (
    <Provider store={store}>
      {isAuthorized && <Component {...pageProps} />}
    </Provider>
  );
};

export default App;
