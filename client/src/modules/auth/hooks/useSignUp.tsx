import { useRouter } from "next/router";
import { useRef, useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { LSItems } from "src/constants";
import { api } from "src/constants/api";
import { LSGetter } from "src/helpers";
import { useApi } from "src/hooks";
import { useAppSelector } from "src/redux/hooks";
import { removeMessage } from "src/redux/reducers/message";
import { getMessage } from "src/redux/selectors";
import { V_singUp } from "../validators";

export const useSignUp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { request } = useApi();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatPasswordRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const [error, setIsError] = useState<any>(null);
  const message = useAppSelector(getMessage);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(removeMessage());
      }, 1500);
    }
  }, [message]);

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

    const { isValid, errors } = V_singUp({ ...signUpData, repeatPassword });

    if (isValid) {
      setIsError(null);
      const res = await request(api.auth.signUp, signUpData);
      if (res?.ok) {
        router.push({
          pathname: "/login",
        });
      }
    } else {
      setIsError(errors);
    }
  };

  return {
    onSignUp,
    emailRef,
    passwordRef,
    repeatPasswordRef,
    nicknameRef,
    message,
    error,
  };
};
