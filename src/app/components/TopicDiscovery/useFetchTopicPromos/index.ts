import { use, useEffect, useRef, useState } from 'react';
import type { TopicTag } from '#app/models/types/metadata';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { RequestContext } from '#app/contexts/RequestContext';
import { OK } from '#app/lib/statusCodes.const';
import useNearViewport from '#app/hooks/useNearViewport';
import type { TopicDiscoveryItem } from '../types';

const { WEB_CDN_URL } = getEnvConfig();

const FETCH_ROOT_MARGIN = '200px 0px';
const TOPIC_DISCOVERY_COMPONENT_ID = 'topic-discovery-component';

type Props = {
  activeTabId: TopicTag['topicId'];
};

const useFetchTopicPromos = ({ activeTabId }: Props) => {
  const { service, variant } = use(RequestContext);

  const promosCacheRef = useRef<
    Record<TopicTag['topicId'], TopicDiscoveryItem[]>
  >({});
  const [topicPromos, setTopicPromos] = useState<TopicDiscoveryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const isNearViewport = useNearViewport({
    elementId: TOPIC_DISCOVERY_COMPONENT_ID,
    rootMargin: FETCH_ROOT_MARGIN,
  });

  useEffect(() => {
    if (!isNearViewport) return undefined;

    let abortController: AbortController | null = null;

    const cachedPromos = promosCacheRef?.current?.[activeTabId];

    if (cachedPromos) {
      setTopicPromos(cachedPromos);
      setIsLoading(false);
      setIsError(false);
    } else {
      const fetchUrl = new URL(`${WEB_CDN_URL}/fd/simorgh-bff`);

      fetchUrl.searchParams.append('onwardJourney', 'topicDiscovery');
      fetchUrl.searchParams.append('service', service);
      fetchUrl.searchParams.append('id', activeTabId);

      if (variant) fetchUrl.searchParams.append('variant', variant);

      const fetchTopicPromos = async () => {
        setIsLoading(true);
        setIsError(false);

        try {
          abortController = new AbortController();

          const response = await fetch(fetchUrl.toString(), {
            signal: abortController.signal,
          });

          if (response.status === OK) {
            const { data } = await response.json();
            promosCacheRef.current[activeTabId] = data?.items || [];
            setTopicPromos(data?.items || []);
            setIsLoading(false);
            setIsError(false);
          } else {
            setTopicPromos([]);
            setIsLoading(false);
            setIsError(true);
          }
        } catch (_error) {
          setTopicPromos([]);
          setIsLoading(false);
          setIsError(true);
        }
      };

      fetchTopicPromos();
    }

    return () => {
      abortController?.abort();
    };
  }, [activeTabId, isNearViewport, service, variant]);

  return { topicPromos, isLoading, isError };
};

export default useFetchTopicPromos;
