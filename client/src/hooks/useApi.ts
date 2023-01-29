import { useState } from "react";
import { HOST } from "src/constants/api";

interface ApiProps {
  method: string;
  url: string;
}

export const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [requestError, setRequestError] = useState(false);

  const request = async (
    { method, url }: ApiProps,
    body: { [key: string]: any } = {}
  ) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${HOST}${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: method !== "GET" ? JSON.stringify(body) : undefined,
      }).then((res) => res.json());
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