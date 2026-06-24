import { useEffect, useState } from 'react';
import { ComponentProps } from '#nextjs/pages/[service]/live/[id]/LivePageLayout';
import useCustomEventTracker from '../useCustomEventTracker';
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

  const trackPollResponse = useCustomEventTracker({
    eventName: 'live_refresh_poll_response',
  });

  useEffect(() => {
    const timerId = setInterval(async () => {
      if (enableFeature === false) return;
      if (currentStreamData?.page?.index !== 1) return;

      const { data: polledStream, statusCode } = await makeRequest(streamId);

      trackPollResponse(
        JSON.stringify({
          status_code: statusCode,
          page_id: streamId,
        }),
      );

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
    trackPollResponse,
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
