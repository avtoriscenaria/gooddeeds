import { useState } from "react";
import { _fetch } from "src/helpers/_fetch";

interface ApiProps {
  method: string;
  url: string;
}

export const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [requestError, setRequestError] = useState(false);

  const request = async (
    apiInfo: ApiProps,
    body: { [key: string]: any } = {}
  ) => {
    setIsLoading(true);
    try {
      const res = await _fetch(apiInfo, body);
      console.log("res", res);
      setData(res);
      setIsLoading(false);
    } catch (e: any) {
      console.log("e", e.message);
      setIsLoading(false);
    }
  };

  return { request, isLoading, data, requestError };
};
