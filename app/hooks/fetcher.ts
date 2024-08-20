import { useState, useEffect } from "react";

interface UseGetParams {
  [key: string]: any;
}

interface UseGetResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const useGet = <T>(
  url: string,
  params: UseGetParams = {},
  onError: (error: Error) => void = () => {}
): UseGetResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(params).toString();
        const response = await fetch(`${url}?${queryParams}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = (await response.json()) as T;
        setData(result);
      } catch (err) {
        console.error(err);
        setError(err as Error);
        onError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export { useGet };
