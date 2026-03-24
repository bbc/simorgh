import { useEffect, useState } from 'react';
import { StreamResponse } from '#nextjs/pages/[service]/live/[id]/Post/types';
import fakeRequest from './fakeRequest';

export const POLLING_INTERVAL = 5000;

const useLivePagePolling = (
  initialStreamData: StreamResponse['data'] | null,
  enableFeature: boolean,
) => {
  const [currentStreamData, setCurrentData] = useState(initialStreamData);
  const [newData, setNewData] = useState(initialStreamData);
  const [hasPendingUpdate, setHasPendingUpdate] = useState(false);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (enableFeature === false) return;
      if (currentStreamData?.page?.index !== 1) return;
      // Fetch data here
      const request = fakeRequest();
      const newStream = request.liveTextStream.content?.data;

      const currentStreamLength = currentStreamData?.results.length;
      const updatedStreamLength = newStream?.results.length;

      if (newStream && currentStreamLength !== updatedStreamLength) {
        setHasPendingUpdate(true);
        setNewData(newStream);
      }
    }, POLLING_INTERVAL);

    return () => clearInterval(timerId);
  }, [
    currentStreamData?.page?.index,
    currentStreamData?.results.length,
    enableFeature,
  ]);

  const applyPendingUpdate = () => {
    if (hasPendingUpdate) {
      setHasPendingUpdate(false);
      setCurrentData(newData);
    }
  };

  return { currentStreamData, hasPendingUpdate, applyPendingUpdate };
};

export default useLivePagePolling;
