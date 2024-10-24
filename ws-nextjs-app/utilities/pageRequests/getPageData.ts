import { BFF_FETCH_ERROR } from '#app/lib/logger.const';
import getToggles from '#app/lib/utilities/getToggles';
import { FetchError } from '#app/models/types/fetch';
import PageDataParams from '#app/models/types/pageDataParams';
import sendCustomMetric from '#server/utilities/customMetrics';
import { NON_200_RESPONSE } from '#server/utilities/customMetrics/metrics.const';
import getAgent from '#server/utilities/getAgent';
import fetchDataFromBFF from '#app/routes/utils/fetchDataFromBFF';
import nodeLogger from '#lib/logger.node';

const logger = nodeLogger(__filename);

const getPageData = async ({
  id,
  page,
  service,
  variant,
  rendererEnv,
  resolvedUrl,
  pageType,
}: PageDataParams) => {
  const pathname = `${id}${rendererEnv ? `?renderer_env=${rendererEnv}` : ''}`;
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

  const toggles = await getToggles(service);

  return { data, toggles };
};

export default getPageData;
