import { LRUCache } from 'lru-cache';
import { BFF_FETCH_ERROR } from '#app/lib/logger.const';
import getToggles from '#app/lib/utilities/getToggles/withCache';
import { FetchError } from '#app/models/types/fetch';
import sendCustomMetric from '#server/utilities/customMetrics';
import { NON_200_RESPONSE } from '#server/utilities/customMetrics/metrics.const';
import getAgent from '#server/utilities/getAgent';
import fetchDataFromBFF from '#app/routes/utils/fetchDataFromBFF';
import nodeLogger from '#lib/logger.node';
import { PageTypes, Services, Variants } from '#app/models/types/global';

const logger = nodeLogger(__filename);

// cache holds the raw bff json; keep it loose because payloads vary by page type
type BffCacheValue = Record<string, unknown>;

// read numeric envs with a simple fallback; keeps memory low by default
const BFF_CACHE_MAX_ITEMS =
  Number.parseInt(process.env.SIMORGH_BFF_CACHE_ITEMS ?? '', 10) || 200;
// one minute ttl to help quick repeat requests without risking stale data
const BFF_CACHE_TTL_MS =
  (Number.parseInt(
    process.env.SIMORGH_BFF_CACHE_MAX_AGE_SECONDS ?? '',
    10,
  ) || 60) * 1000;

// cache lives inside this server process
const bffCache = new LRUCache<string, BffCacheValue>({
  max: BFF_CACHE_MAX_ITEMS,
  ttl: BFF_CACHE_TTL_MS,
});

type Props = {
  id?: string;
  page?: string;
  service: Services;
  variant?: Variants | null;
  rendererEnv?: string;
  resolvedUrl: string;
  pageType: PageTypes;
  isAmp?: boolean;
};

const getPageData = async ({
  id = '',
  page,
  service,
  variant,
  rendererEnv,
  resolvedUrl,
  pageType,
  isAmp,
}: Props) => {
  const path = `${id}${rendererEnv ? `?renderer_env=${rendererEnv}` : ''}`;
  const url = new URL(path, 'https://www.bbc.com');
  const rendererEnvironment = url.searchParams.get('renderer_env');
  const pathname = `${id}${rendererEnvironment ? `?renderer_env=${rendererEnvironment}` : ''}`;

  const togglesPromise = getToggles(service);

  let message;
  let status;
  let json;

  try {
    ({ status, json } = await fetchDataFromBFF({
      pathname,
      pageType,
      service,
      variant,
      page,
      getAgent,
      isAmp,
      cache: bffCache,
    }));
  } catch (error: unknown) {
    ({ message, status } = error as FetchError);

    sendCustomMetric({
      metricName: NON_200_RESPONSE,
      statusCode: status,
      pageType,
      requestUrl: resolvedUrl,
    });

    logger.error(BFF_FETCH_ERROR, {
      service,
      status,
      pathname,
      message,
    });
  }

  const data = json
    ? { pageData: json.data, status }
    : { error: message, status };

  const toggles = await togglesPromise;

  return { data, toggles };
};

export default getPageData;
