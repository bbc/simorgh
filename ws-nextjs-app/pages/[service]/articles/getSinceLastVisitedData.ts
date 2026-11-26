import { SinceLastVisitedData } from '#app/models/types/optimo';
import { Curation } from '#app/models/types/curationData';
import { getTopStoriesCuration } from '#app/components/SinceLastVisited/filterStories';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import { Services, Variants } from '#app/models/types/global';
import nodeLogger from '#lib/logger.node';
import getPageData from '../../../utilities/pageRequests/getPageData';

const logger = nodeLogger(__filename);

// Bounds the extra latency this prototype can add to an article request
const TIMEOUT_MS = 10000;

const CACHE_TTL_MS = 60 * 1000;

type CacheEntry = {
  expiresAt: number;
  request: Promise<SinceLastVisitedData | null>;
};

const cache = new Map<string, CacheEntry>();

type Props = {
  service: Services;
  variant?: Variants | null;
  rendererEnv?: string;
  resolvedUrl: string;
};

const fetchHomeTopStories = async ({
  service,
  variant,
  rendererEnv,
  resolvedUrl,
}: Props): Promise<SinceLastVisitedData | null> => {
  const { data } = await getPageData({
    id: `/${service}${variant ? `/${variant}` : ''}`,
    service,
    variant: variant || undefined,
    rendererEnv,
    resolvedUrl,
    pageType: HOME_PAGE,
  });

  if (data?.status !== 200) {
    throw new Error(`Home page request failed with status ${data?.status}`);
  }

  const curations = (data?.pageData?.curations as Curation[] | undefined) ?? [];
  const topStories = getTopStoriesCuration(curations);
  if (!topStories?.curationId) return null;

  // "Más noticias" (position 1) sits directly under Top Stories and adds depth
  const moreNews = curations.find(({ position }) => position === 1);

  return {
    curationId: topStories.curationId,
    summaries: [
      ...(topStories.summaries || []),
      ...(moreNews?.summaries || []),
    ],
  };
};

const getCachedHomeTopStories = (props: Props) => {
  const { service, variant, rendererEnv } = props;
  const key = [service, variant, rendererEnv].join('|');
  const cached = cache.get(key);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.request;
  }

  // Sharing the in-flight request means a slow BFF is hit once per TTL, even
  // when callers give up waiting before it resolves
  const request = fetchHomeTopStories(props).catch(error => {
    cache.delete(key);
    throw error;
  });
  cache.set(key, { expiresAt: Date.now() + CACHE_TTL_MS, request });
  return request;
};

export const clearSinceLastVisitedCache = () => cache.clear();

/**
 * Fetches the Top Stories curation (position 0 of the home page data) on the
 * server. Never throws and never delays the article by more than TIMEOUT_MS.
 */
const getSinceLastVisitedData = async (
  props: Props,
): Promise<SinceLastVisitedData | null> => {
  try {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const timeout = new Promise<null>(resolve => {
      timer = setTimeout(() => {
        resolve(null);
      }, TIMEOUT_MS);
    });

    try {
      return await Promise.race([getCachedHomeTopStories(props), timeout]);
    } finally {
      clearTimeout(timer);
    }
  } catch (error) {
    logger.error('since_last_visited_fetch_error', {
      service: props.service,
      message: (error as Error)?.message,
    });
    return null;
  }
};

export default getSinceLastVisitedData;
