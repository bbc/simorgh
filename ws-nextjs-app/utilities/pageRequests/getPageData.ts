import { BFF_FETCH_ERROR } from '#app/lib/logger.const';
import { FetchError } from '#app/models/types/fetch';
import { PageTypes, Services, Variants } from '#app/models/types/global';
import fetchDataFromBFF from '#app/routes/utils/fetchDataFromBFF';
import nodeLogger from '#lib/logger.node';
import sendCustomMetric from '#utilities/customMetrics';
import { NON_200_RESPONSE } from '#utilities/customMetrics/metrics.const';
import getAgent from '#utilities/getAgent';

const logger = nodeLogger(__filename);

type Props = {
  id?: string;
  page?: string;
  service: Services;
  variant?: Variants | null;
  rendererEnv?: string;
  resolvedUrl: string;
  pageType: PageTypes;
  isAmp?: boolean;
  disableRadioSchedule?: boolean;
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
  disableRadioSchedule,
}: Props) => {
  const path = `${id}${rendererEnv ? `?renderer_env=${rendererEnv}` : ''}`;
  const url = new URL(path, 'https://www.bbc.com');
  const rendererEnvironment = url.searchParams.get('renderer_env');
  const pathname = `${id}${rendererEnvironment ? `?renderer_env=${rendererEnvironment}` : ''}`;

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
      disableRadioSchedule,
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

  return { data };
};

export default getPageData;
