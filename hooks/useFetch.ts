type Props = {
  url: string;
  params?: Map<string, string> | null;
  refresh?: boolean;
  pending?: boolean;
  enabled?: boolean;
};

import { useState, useEffect, useCallback } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useFetch<T = unknown>({
  url,
  params,
  enabled = true,
  pending = false,
  refresh,
}: Props): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  if (!enabled) {
    return state;
  }

  const buildUrl = useCallback(() => {
    const urlFetch = new URL(url);
    if (params) {
      params.forEach((value, key) => {
        urlFetch.searchParams.set(key, value);
      });
    }
    return urlFetch.toString();
  }, [url, params]);

  const fetchData = useCallback(async () => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    setState((prevState) => ({ ...prevState, loading: true, error: null }));

    try {
      const finalUrl = buildUrl();
      const response = await fetch(finalUrl, { signal });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as T;
      setState({ data, loading: false, error: null });
    } catch (error) {
      if (error instanceof Error) {
        if (error.name !== "AbortError") {
          setState({ data: null, loading: false, error });
        }
      }
    }

    return () => abortController.abort();
  }, [buildUrl]);

  useEffect(() => {
    if(!pending) {
      fetchData();
    }
  }, [fetchData, refresh, pending]);

  return { ...state };
}

export default useFetch;
