import { use, useEffect, useRef, useState } from 'react';
import { TopicTag } from '#app/models/types/metadata';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { RequestContext } from '#app/contexts/RequestContext';
import { OK } from '#app/lib/statusCodes.const';
import { TopicDiscoveryItem } from '../types';

const { WEB_CDN_URL } = getEnvConfig();

const FETCH_ROOT_MARGIN = '200px 0px';

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
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    if (isNearViewport) return undefined;

    const sectionElement = document.getElementById('topic-discovery-component');

    if (!sectionElement) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: FETCH_ROOT_MARGIN },
    );

    observer.observe(sectionElement);

    return () => {
      observer.disconnect();
    };
  }, [isNearViewport]);

  useEffect(() => {
    if (!isNearViewport) return undefined;

    let abortController: AbortController | null = null;

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
          abortController = new AbortController();

          const response = await fetch(fetchUrl.toString(), {
            signal: abortController.signal,
          });

          if (response.status === OK) {
            const { data } = await response.json();
            promosCacheRef.current[activeTabId] = data?.items || [];
            setTopicPromos(data?.items || []);
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

    return () => {
      abortController?.abort();
    };
  }, [activeTabId, isNearViewport, service, variant]);

  return { topicPromos, isLoading };
};

export default useFetchTopicPromos;
