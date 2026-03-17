import { useEffect, useState } from 'react';
import { ComponentProps } from '#nextjs/pages/[service]/live/[id]/LivePageLayout';
import makeRequest from './makeRequest/makeRequest';

export const POLLING_INTERVAL = 5000;

const useLivePagePolling = (
  pageData: ComponentProps['pageData'],
  enableFeature: boolean,
) => {
  const initialStreamData = pageData.liveTextStream.content?.data ?? null;
  const streamId = pageData.liveTextStream.id;

  const [currentStreamData, setCurrentData] = useState(initialStreamData);
  const [newData, setNewData] = useState(initialStreamData);
  const [hasPendingUpdate, setHasPendingUpdate] = useState(false);

  useEffect(() => {
    const timerId = setInterval(async () => {
      if (enableFeature === false) return;
      if (currentStreamData?.page?.index !== 1) return;

      const newStream = await makeRequest(streamId);

      if (newStream != null) {
        const currentStreamLength = currentStreamData?.results.length;
        const updatedStreamLength = newStream?.results.length;

        if (newStream && currentStreamLength !== updatedStreamLength) {
          setHasPendingUpdate(true);
          setNewData(newStream);
        }
      }
    }, POLLING_INTERVAL);

    return () => clearInterval(timerId);
  }, [
    currentStreamData?.page?.index,
    currentStreamData?.results.length,
    enableFeature,
    streamId,
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
