import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { _fetch } from "src/helpers/_fetch";
import { setMessage } from "src/redux/reducers/message";

interface ApiProps {
  method: string;
  url: string;
}

export const useApi = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [requestError, setRequestError] = useState(false);
  const dispatch = useDispatch();

  const request = async (
    apiInfo: ApiProps,
    body: { [key: string]: any } = {}
  ) => {
    setIsLoading(true);
    try {
      const res = await _fetch(apiInfo, body);

      if (res?.ok) {
        if (res.message) {
          dispatch(setMessage({ message: res.message }));
        }
        if (res.data) {
          setData(res.data);
        }

        setIsLoading(false);
        return res;
      } else {
        setRequestError(res);
        if (res.message) {
          dispatch(setMessage({ message: res.message, color: "red" }));
        }
        if (res.statusCode === 401) {
          localStorage.clear();
          router.push({
            pathname: "/login",
          });
        }
      }
      setIsLoading(false);
    } catch (e: any) {
      console.log("e", e.message);
      setIsLoading(false);
    }
  };

  const clean = () => {
    setData(null);
  };

  const update = (updatedData: any) => {
    setData(updatedData);
  };

  return { request, isLoading, data, requestError, clean, update };
};
