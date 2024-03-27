import { BFF_FETCH_ERROR } from '#app/lib/logger.const';
import getToggles from '#app/lib/utilities/getToggles';
import { FetchError } from '#app/models/types/fetch';
import PageDataParams from '#app/models/types/pageDataParams';
import constructPageFetchUrl, {
  UrlConstructParams,
} from '#app/routes/utils/constructPageFetchUrl';
import sendCustomMetric from '#server/utilities/customMetrics';
import getEnvironment from '#app/routes/utils/getEnvironment';
import { NON_200_RESPONSE } from '#server/utilities/customMetrics/metrics.const';
import fetchPageData from '#app/routes/utils/fetchPageData';
import certsRequired from '#app/routes/utils/certsRequired';
import getAgent from '../undiciAgent';

type LoggerType = {
  error: (id: string, params: { [key: string]: string | number }) => void;
};

const getPageData = async (
  { id, service, rendererEnv, resolvedUrl }: PageDataParams,
  constructUrlParams: Omit<UrlConstructParams, 'pathname'>,
  logger: LoggerType,
) => {
  const pathname = `${id}${rendererEnv ? `?renderer_env=${rendererEnv}` : ''}`;

  const env = getEnvironment(pathname);
  const optHeaders = { 'ctx-service-env': env };
  const agent = certsRequired(pathname) ? await getAgent() : null;

  let pageStatus;
  let pageJson;
  let errorMessage;

  try {
    const pageUrl = constructPageFetchUrl({ ...constructUrlParams, pathname });
    const path = pageUrl.toString();
    // @ts-expect-error Due to jsdoc inference, and no TS within fetchPageData
    const { status, json } = await fetchPageData({
      path,
      agent,
      optHeaders,
    });
    pageStatus = status;
    pageJson = json;
  } catch (error: unknown) {
    const { message, status } = error as FetchError;

    sendCustomMetric({
      metricName: NON_200_RESPONSE,
      statusCode: status,
      pageType: constructUrlParams.pageType,
      requestUrl: resolvedUrl,
    });

    logger.error(BFF_FETCH_ERROR, {
      service,
      status,
      pathname,
      message,
    });
    pageStatus = status;
    errorMessage = message;
  }

  const data = pageJson
    ? { pageData: pageJson.data, status: pageStatus }
    : { error: errorMessage, status: pageStatus };

  const toggles = await getToggles(service);

  return { data, toggles };
};

export default getPageData;
