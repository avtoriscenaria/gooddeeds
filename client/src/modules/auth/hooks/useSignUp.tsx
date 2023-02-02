import { useRouter } from "next/router";
import { useRef, useState, useMemo, useEffect } from "react";
import { LSItems } from "src/constants";
import { api } from "src/constants/api";
import { LSGetter } from "src/helpers";
import { useApi } from "src/hooks";
import { V_singUp } from "../validators";

export const useSignUp = () => {
  const router = useRouter();
  const { request, requestError } = useApi();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatPasswordRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const [isError, setIsError] = useState(false);

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

  const onSignUp = async () => {
    const email = emailRef.current?.value.trim();
    const nickname = nicknameRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();
    const repeatPassword = repeatPasswordRef.current?.value.trim();
    const signUpData = { email, nickname, password };

    const { isValid } = V_singUp({ ...signUpData, repeatPassword });

    if (isValid) {
      setIsError(false);
      const res = await request(api.auth.signUp, signUpData);
      if (res?.ok) {
        router.push({
          pathname: "/login",
        });
      }
    } else {
      setIsError(true);
    }
  };

  return {
    onSignUp,
    emailRef,
    passwordRef,
    repeatPasswordRef,
    nicknameRef,
    isError: _isError,
  };
};
