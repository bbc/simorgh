import { useEffect, useRef, useState } from 'react';
import fetchPolledData from '#app/lib/utilities/fetchPolledData';

export const POLLING_INTERVAL = 15000;

export type UsePollingProps<TResponse, TData> = {
  initialData: TData;
  enabled: boolean;
  endpoint: string;
  params: Record<string, string | number | boolean>;
  returnedData: (response: TResponse) => TData | null | undefined;
  interval?: number;
};

const usePolling = <TResponse, TData>({
  initialData,
  enabled,
  endpoint,
  params,
  returnedData,
  interval = POLLING_INTERVAL,
}: UsePollingProps<TResponse, TData>) => {
  const [data, setData] = useState<TData>(initialData);

  const paramsRef = useRef(params);
  const returnedDataRef = useRef(returnedData);

  useEffect(() => {
    paramsRef.current = params;
    returnedDataRef.current = returnedData;
  }, [params, returnedData]);

  useEffect(() => {
    if (enabled === false) return undefined;

    let cancelled = false;

    const timerId = setInterval(async () => {
      const response = await fetchPolledData<TResponse>(endpoint, {
        params: paramsRef.current,
      });

      if (cancelled) return;

      const nextData = response?.data && returnedDataRef.current(response.data);

      if (nextData != null) setData(nextData);
    }, interval);

    return () => {
      cancelled = true;
      clearInterval(timerId);
    };
  }, [enabled, endpoint, interval]);

  return data;
};

export default usePolling;
