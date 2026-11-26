import { use, useEffect, useState } from 'react';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { RequestContext } from '#app/contexts/RequestContext';
import { OK } from '#app/lib/statusCodes.const';
import useNearViewport from '#app/hooks/useNearViewport';

const { WEB_CDN_URL } = getEnvConfig();

const FETCH_ROOT_MARGIN = '200px 0px';
export const READ_TIME_TABS_COMPONENT_ID = 'read-time-tabs-component';

type Props = {
  topicIds: string[];
};

// A single request for all of the article's topics: tab switching is local state, so this never
// refetches when the user changes tabs.
const useFetchReadTimeRecommendations = ({ topicIds }: Props) => {
  const { service, variant } = use(RequestContext);

  const topicIdsParam = topicIds.join(',');

  const [items, setItems] = useState<unknown[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const isNearViewport = useNearViewport({
    elementId: READ_TIME_TABS_COMPONENT_ID,
    rootMargin: FETCH_ROOT_MARGIN,
  });

  useEffect(() => {
    if (!isNearViewport || !topicIdsParam) return undefined;

    const abortController = new AbortController();
    const fetchUrl = new URL(`${WEB_CDN_URL}/fd/simorgh-bff`);

    fetchUrl.searchParams.append('onwardJourney', 'readTimeRecommendations');
    fetchUrl.searchParams.append('service', service);
    fetchUrl.searchParams.append('id', topicIdsParam);

    if (variant) fetchUrl.searchParams.append('variant', variant);

    const fetchItems = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await fetch(fetchUrl.toString(), {
          signal: abortController.signal,
        });

        if (response.status !== OK) {
          setItems([]);
          setIsError(true);
        } else {
          const { data } = await response.json();

          setItems(Array.isArray(data?.items) ? data.items : []);
        }
      } catch (error) {
        if (abortController.signal.aborted) return;

        setItems([]);
        setIsError(true);
      }

      if (!abortController.signal.aborted) setIsLoading(false);
    };

    fetchItems();

    return () => {
      abortController.abort();
    };
  }, [isNearViewport, topicIdsParam, service, variant]);

  return { items, isLoading, isError };
};

export default useFetchReadTimeRecommendations;
