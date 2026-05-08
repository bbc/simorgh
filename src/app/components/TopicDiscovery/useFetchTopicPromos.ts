import { use, useEffect, useRef, useState } from 'react';
import { TopicTag } from '#app/models/types/metadata';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { RequestContext } from '#app/contexts/RequestContext';
import { OK } from '#app/lib/statusCodes.const';
import { TopicDiscoveryItem } from './types';

type Props = {
  activeTabId: TopicTag['topicId'];
  isNearViewport: boolean;
};

const { WEB_CDN_URL } = getEnvConfig();

const useFetchTopicPromos = ({ activeTabId, isNearViewport }: Props) => {
  const { service, variant } = use(RequestContext);

  const promosCacheRef = useRef<Record<string, TopicDiscoveryItem[]>>({});
  const [topicPromos, setTopicPromos] = useState<TopicDiscoveryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isNearViewport) return undefined;

    let isActive = true;

    const cachedPromos = promosCacheRef.current[activeTabId];

    if (cachedPromos) {
      setTopicPromos(cachedPromos);
      setIsLoading(false);
    } else {
      const fetchTopicPromos = async () => {
        const fetchUrl = new URL(`${WEB_CDN_URL}/fd/simorgh-bff`);

        fetchUrl.searchParams.append('onwardJourney', 'topicDiscovery');
        fetchUrl.searchParams.append('service', service);
        fetchUrl.searchParams.append('id', activeTabId);

        if (variant) fetchUrl.searchParams.append('variant', variant);

        setIsLoading(true);

        const response = await fetch(fetchUrl);
        const { status } = response;
        const { data } = await response.json();

        if (status === OK) return data;

        return null;
      };

      try {
        fetchTopicPromos().then(fetchedTopicPromos => {
          if (!isActive) return;

          promosCacheRef.current[activeTabId] = fetchedTopicPromos;
          setTopicPromos(fetchedTopicPromos);
          setIsLoading(false);
        });
      } catch (error) {
        if (!isActive) return undefined;

        setTopicPromos([]);
        setIsLoading(false);
      }
    }

    return () => {
      isActive = false;
    };
  }, [activeTabId, isNearViewport, service, variant]);

  const getHasCachedPromos = (topicId: TopicTag['topicId']) =>
    Boolean(promosCacheRef.current[topicId]);

  return {
    topicPromos,
    isLoading,
    setIsLoading,
    getHasCachedPromos,
  };
};

export default useFetchTopicPromos;
