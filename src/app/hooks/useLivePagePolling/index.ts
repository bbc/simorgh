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
  const pageIndex = initialStreamData?.page?.index;

  const [polledStreamData, setPolledStreamData] = useState(initialStreamData);

  useEffect(() => {
    const timerId = setInterval(async () => {
      if (enableFeature === false) return;
      if (pageIndex !== 1) return;

      const params = { liveTextStreamId: streamId, type: 'curated' };
      const response = await fetchPolledData<StreamResponse['data']>('live', { params });

      if (response?.data?.results && response.data.results.length > 0) {
        setPolledStreamData(response.data);
      }
    }, POLLING_INTERVAL);

    return () => clearInterval(timerId);
  }, [enableFeature, pageIndex, streamId]);

  return { polledStreamData };
};

export default useLivePagePolling;
