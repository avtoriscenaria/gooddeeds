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
    const token = LSGetter(LSItems.AUTH);
    if (token) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (data) {
      const { token, user } = data;
      if (token) {
        localStorage.setItem(LSItems.AUTH, token);

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
