"use client";
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
  });

  return { data, loading, error };
};

// Define a type for the hook's response
interface UsePostResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  post: (payload: any) => Promise<void>;
}

// Define the hook
const usePost = <T>(url: string): UsePostResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const post = async (payload: any): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Handle HTTP errors
        const errorText = await response.text();
        throw new Error(errorText || "An error occurred");
      }

      const result: T = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, post };
};

// export default usePost;

export { useGet, usePost };
