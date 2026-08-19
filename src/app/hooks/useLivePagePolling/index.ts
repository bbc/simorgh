import { useEffect, useState } from 'react';
import { ComponentProps } from '#nextjs/pages/[service]/live/[id]/LivePageLayout';
import { StreamResponse } from '#nextjs/pages/[service]/live/[id]/Post/types';
import fetchPolledData from '#app/lib/utilities/fetchPolledData';

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

      const response = await fetchPolledData<StreamResponse['data']>('live', { params: { liveTextStreamId: streamId, type: 'curated' } });

      if (response?.data?.results && response.data.results.length > 0) {
        const polledStreamFirstPostUrn = response.data.results[0]?.urn;
        if (polledStreamFirstPostUrn !== currentFirstPostUrn) {
          setHasPendingUpdate(true);
          setNewData(response.data);
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

  return {
    currentStreamData,
    hasPendingUpdate,
    applyPendingUpdate,
  };
};

export default useLivePagePolling;
