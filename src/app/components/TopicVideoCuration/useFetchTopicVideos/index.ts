import { use, useEffect, useState } from 'react';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { RequestContext } from '#app/contexts/RequestContext';
import { OK } from '#app/lib/statusCodes.const';
import useNearViewport from '#app/hooks/useNearViewport';
import { TopicDiscoveryItem } from '../../TopicDiscovery/types';

const { WEB_CDN_URL } = getEnvConfig();

const FETCH_ROOT_MARGIN = '200px 0px';
export const TOPIC_VIDEO_CURATION_COMPONENT_ID = 'topic-video-curation';

type Props = {
  topicIds: string[];
};

// The `topicDiscovery` onwardJourney accepts a single topic id, so topics are
// requested in parallel (callers bound the count). URLs are identical to those
// used by TopicDiscovery so CDN/browser caching serves repeated requests.
const useFetchTopicVideos = ({ topicIds }: Props) => {
  const { service, variant } = use(RequestContext);
  const topicIdsKey = topicIds.join(',');

  const [resultsByTopic, setResultsByTopic] = useState<TopicDiscoveryItem[][]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const isNearViewport = useNearViewport({
    elementId: TOPIC_VIDEO_CURATION_COMPONENT_ID,
    rootMargin: FETCH_ROOT_MARGIN,
  });

  useEffect(() => {
    if (!isNearViewport || !topicIdsKey) return undefined;

    const abortController = new AbortController();

    const fetchTopic = async (topicId: string) => {
      const fetchUrl = new URL(`${WEB_CDN_URL}/fd/simorgh-bff`);
      fetchUrl.searchParams.append('onwardJourney', 'topicDiscovery');
      fetchUrl.searchParams.append('service', service);
      fetchUrl.searchParams.append('id', topicId);
      if (variant) fetchUrl.searchParams.append('variant', variant);

      const response = await fetch(fetchUrl.toString(), {
        signal: abortController.signal,
      });
      if (response.status !== OK) throw new Error(`Status ${response.status}`);
      const { data } = await response.json();
      return (
        Array.isArray(data?.items) ? data.items : []
      ) as TopicDiscoveryItem[];
    };

    const fetchAll = async () => {
      setIsLoading(true);
      setIsError(false);

      const settled = await Promise.allSettled(
        topicIdsKey.split(',').map(fetchTopic),
      );
      if (abortController.signal.aborted) return;

      const fulfilled = settled.flatMap(result =>
        result.status === 'fulfilled' ? [result.value] : [],
      );
      setResultsByTopic(fulfilled);
      setIsError(fulfilled.length === 0);
      setIsLoading(false);
    };

    fetchAll();

    return () => abortController.abort();
  }, [isNearViewport, topicIdsKey, service, variant]);

  return { resultsByTopic, isLoading, isError };
};

export default useFetchTopicVideos;
