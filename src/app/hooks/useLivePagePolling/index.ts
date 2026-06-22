import { useEffect, useState, useRef } from 'react';
import { ComponentProps } from '#nextjs/pages/[service]/live/[id]/LivePageLayout';
import useCustomEventTracker from '../useCustomEventTracker';
import makeRequest from './makeRequest/makeRequest';

// TODO: change back to 15000, temp for code reviews
export const POLLING_INTERVAL = 5000;
const TRACKING_SAMPLE_RATE = 0.2;

const shouldSample = () => Math.random() < TRACKING_SAMPLE_RATE;

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
  const pendingUpdateTime = useRef<number | null>(null);
  const lastPollTime = useRef<number>(Date.now());
  const newPostCount = useRef<number | null>(null);

  const trackPollResponse = useCustomEventTracker({
    eventName: 'live_refresh_poll_response',
  });

  useEffect(() => {
    const timerId = setInterval(async () => {
      // TODO: Uncomment, temp for code reviews
      // if (enableFeature === false) return;
      // if (currentStreamData?.page?.index !== 1) return;

      const timeSinceLastPoll = Date.now() - lastPollTime.current;
      lastPollTime.current = Date.now();

      const { data: polledStream, statusCode } = await makeRequest(streamId);

      const hasNewContent =
        polledStream != null &&
        polledStream.results?.[0]?.urn !== currentFirstPostUrn;

      if (shouldSample()) {
        trackPollResponse(
          JSON.stringify({
            status_code: statusCode,
            has_new_content: hasNewContent,
            page_id: streamId,
            time_since_last_poll: timeSinceLastPoll,
          }),
        );
      }

      if (polledStream != null) {
        const polledStreamFirstPostUrn = polledStream.results?.[0]?.urn;
        if (polledStreamFirstPostUrn !== currentFirstPostUrn) {
          const index = polledStream.results?.findIndex(
            (post: { urn: string }) => post.urn === currentFirstPostUrn,
          );
          newPostCount.current =
            index === -1
              ? (polledStream.results?.length ?? null)
              : (index ?? null);
          setHasPendingUpdate(true);
          pendingUpdateTime.current = Date.now();
          setNewData(polledStream);
          setFirstPostUrn(polledStreamFirstPostUrn);
        }
      }
      // TODO: Remove, temp for code reviews
      setHasPendingUpdate(true);
      pendingUpdateTime.current = Date.now();
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
      newPostCount.current = null;
    }
  };

  return {
    currentStreamData,
    hasPendingUpdate,
    applyPendingUpdate,
    pendingUpdateTime: pendingUpdateTime.current,
    newPostCount: newPostCount.current,
  };
};

export default useLivePagePolling;
