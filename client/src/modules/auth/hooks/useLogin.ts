import { useRouter } from "next/router";
import { useRef, useState, useMemo, useEffect } from "react";
import { LSItems } from "src/constants";
import { api } from "src/constants/api";
import { LSGetter } from "src/helpers";
import { useApi } from "src/hooks";

export const useLogin = () => {
  const router = useRouter();
  const { request, requestError, data } = useApi();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isError, setIsError] = useState(false);
  console.log("roy", router);

  const _isError = useMemo(
    () => isError || requestError,
    [isError, requestError]
  );

  useEffect(() => {
    const access_token = LSGetter(LSItems.ACCESS_KEY);
    const refresh_token = LSGetter(LSItems.REFRESH_KEY);
    if (access_token && refresh_token) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (data) {
      const { access_token, refresh_token } = data;
      if (access_token && refresh_token) {
        localStorage.setItem(LSItems.REFRESH_KEY, refresh_token);
        localStorage.setItem(LSItems.ACCESS_KEY, access_token);

        const returnUrl: string | undefined =
          typeof router.query.returnUrl === "string"
            ? router.query.returnUrl
            : undefined;

        router.push({
          pathname: returnUrl || "/",
        });
      }
    }
  }, [data]);

  const onLogin = () => {
    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();
    if (email && password) {
      setIsError(false);
      request(api.auth.login, { email, password });
    } else {
      setIsError(true);
    }
  };

  return { onLogin, emailRef, passwordRef, isError: _isError };
};
