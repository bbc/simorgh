import { useEffect, useState } from 'react';
import { ComponentProps } from '#nextjs/pages/[service]/live/[id]/LivePageLayout';
import makeRequest from './makeRequest/makeRequest';

export const POLLING_INTERVAL = 15000;

const useLivePagePolling = (
  pageData: ComponentProps['pageData'],
  enableFeature: boolean,
) => {
  const initialStreamData = pageData.liveTextStream.content?.data ?? null;
  const streamId = pageData.liveTextStream.id;
  const firstPostUrn = initialStreamData?.results?.[0]?.urn;

  const [currentStreamData, setCurrentData] = useState(initialStreamData);
  const [newData, setNewData] = useState(initialStreamData);
  const [hasPendingUpdate, setHasPendingUpdate] = useState(false);
  const [currentFirstPostUrn, setFirstPostUrn] = useState(firstPostUrn);

  useEffect(() => {
    const timerId = setInterval(async () => {
      if (enableFeature === false) return;
      if (currentStreamData?.page?.index !== 1) return;

      const polledStream = await makeRequest(streamId);

      if (polledStream != null) {
        const polledStreamFirstPostUrn = polledStream.results?.[0]?.urn;
        if (polledStreamFirstPostUrn !== currentFirstPostUrn) {
          setHasPendingUpdate(true);
          setNewData(polledStream);
          setFirstPostUrn(polledStreamFirstPostUrn);
        }
      }
    }, POLLING_INTERVAL);

    return () => clearInterval(timerId);
  }, [
    currentFirstPostUrn,
    currentStreamData?.page?.index,
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
