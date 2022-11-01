import { useEffect, useState, useCallback } from "react";

import axios from "axios";

type TMode = {
  name: string;
  field: number;
};

type Error = string[];

interface IUseGetModesResult {
  isLoading: boolean;
  response: TMode[] | null;
  error: Error | null;
  doFetch: () => void;
}

const useGetModes = (): IUseGetModesResult => {
  const url = "https://demo7919674.mockable.io";

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<TMode[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const doFetch = useCallback(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      return;
    }
    axios(url)
      .then((res) => {
        setIsLoading(false);
        setResponse(res.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.response.data);
      });
  }, [url, isLoading]);

  return { isLoading, response, error, doFetch };
};

export default useGetModes;
