import { use, useEffect, useRef, useState } from 'react';
import { TopicTag } from '#app/models/types/metadata';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { RequestContext } from '#app/contexts/RequestContext';
import { OK } from '#app/lib/statusCodes.const';
import { TopicDiscoveryItem } from '../types';

const { WEB_CDN_URL } = getEnvConfig();

type Props = {
  activeTabId: TopicTag['topicId'];
  isNearViewport: boolean;
};

const useFetchTopicPromos = ({ activeTabId, isNearViewport }: Props) => {
  const { service, variant } = use(RequestContext);

  const promosCacheRef = useRef<
    Record<TopicTag['topicId'], TopicDiscoveryItem[]>
  >({});
  const [topicPromos, setTopicPromos] = useState<TopicDiscoveryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isNearViewport) return undefined;

    const cachedPromos = promosCacheRef?.current?.[activeTabId];

    if (cachedPromos) {
      setTopicPromos(cachedPromos);
      setIsLoading(false);
    } else {
      const fetchUrl = new URL(`${WEB_CDN_URL}/fd/simorgh-bff`);

      fetchUrl.searchParams.append('onwardJourney', 'topicDiscovery');
      fetchUrl.searchParams.append('service', service);
      fetchUrl.searchParams.append('id', activeTabId);

      if (variant) fetchUrl.searchParams.append('variant', variant);

      const fetchTopicPromos = async () => {
        setIsLoading(true);

        try {
          const response = await fetch(fetchUrl.toString());

          if (response.status === OK) {
            const { data } = await response.json();

            promosCacheRef.current[activeTabId] = data;
            setTopicPromos(data);
            setIsLoading(false);
          } else {
            setTopicPromos([]);
            setIsLoading(false);
          }
        } catch (error) {
          setTopicPromos([]);
          setIsLoading(false);
        }
      };

      fetchTopicPromos();
    }

    return undefined;
  }, [activeTabId, isNearViewport, service, variant]);

  return { topicPromos, isLoading };
};

export default useFetchTopicPromos;
