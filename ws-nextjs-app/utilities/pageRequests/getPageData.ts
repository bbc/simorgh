import { BFF_FETCH_ERROR } from '#app/lib/logger.const';
import { FetchError } from '#app/models/types/fetch';
import sendCustomMetric from '#server/utilities/customMetrics';
import { NON_200_RESPONSE } from '#server/utilities/customMetrics/metrics.const';
import getAgent from '#server/utilities/getAgent';
import fetchDataFromBFF from '#app/routes/utils/fetchDataFromBFF';
import fetchDataFromSportData from '#app/routes/utils/fetchDataFromSportData';
import nodeLogger from '#lib/logger.node';
import { PageTypes, Services, Variants } from '#app/models/types/global';

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

  // Evaluate the presence of sportDataEvent
  // Fetch Sport Data
  const sportDataEvent = json?.data?.sportDataEvent || null;

  let sportEventDetails;

  if (sportDataEvent) {
    const { id: sportEventId } = sportDataEvent;
    const { status: sportDataStatus, json: sportDataJson } =
      (await fetchDataFromSportData({
        type: 'event',
        urn: sportEventId,
        getAgent,
      })) || null;

    sportEventDetails = {
      status: sportDataStatus,
      ...sportDataJson.data,
    };
  }

  const data = json
    ? {
        pageData: {
          ...json.data,
          sportEventDetails,
        },
        status,
      }
    : { error: message, status };

  return { data };
};

export default getPageData;
