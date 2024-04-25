import { GetServerSideProps } from 'next';
import getToggles from '#app/lib/utilities/getToggles/withCache';
import { LIVE_PAGE } from '#app/routes/utils/pageTypes';
import nodeLogger from '#lib/logger.node';
import logResponseTime from '#server/utilities/logResponseTime';
import isAppPath from '#app/routes/utils/isAppPath';

import { ROUTING_INFORMATION, BFF_FETCH_ERROR } from '#app/lib/logger.const';
import { FetchError } from '#models/types/fetch';

import fetchDataFromBFF from '#app/routes/utils/fetchDataFromBFF';
import getAgent from '#server/utilities/getAgent';
import { OK } from '#app/lib/statusCodes.const';
import sendCustomMetric from '#server/utilities/customMetrics';
import { NON_200_RESPONSE } from '#server/utilities/customMetrics/metrics.const';
import isLitePath from '#app/routes/utils/isLitePath';
import PageDataParams from '#app/models/types/pageDataParams';

import LivePageLayout from './LivePageLayout';
import extractHeaders from '../../../../../src/server/utilities/extractHeaders';
import isValidPageNumber from '../../../../utilities/pageQueryValidator';

const logger = nodeLogger(__filename);

const getPageData = async ({
  id,
  page,
  service,
  variant,
  rendererEnv,
  resolvedUrl,
}: PageDataParams) => {
  const pathname = `${id}${rendererEnv ? `?renderer_env=${rendererEnv}` : ''}`;
  let message;
  let status;
  let json;

  try {
    ({ status, json } = await fetchDataFromBFF({
      pathname,
      pageType: LIVE_PAGE,
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
      pageType: LIVE_PAGE,
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

export const getServerSideProps: GetServerSideProps = async context => {
  logResponseTime(
    {
      path: context.resolvedUrl,
    },
    context.res,
    () => null,
  );

  const {
    id,
    service,
    variant,
    renderer_env: rendererEnv,
    page = '1',
  } = context.query as PageDataParams;

  const { headers: reqHeaders } = context.req;

  const isApp = isAppPath(context.resolvedUrl);
  const isLite = isLitePath(context.resolvedUrl);

  if (!isValidPageNumber(page)) {
    context.res.statusCode = 404;

    sendCustomMetric({
      metricName: NON_200_RESPONSE,
      statusCode: context.res.statusCode,
      pageType: LIVE_PAGE,
      requestUrl: context.resolvedUrl,
    });

    return {
      props: {
        bbcOrigin: reqHeaders['bbc-origin'] || null,
        isApp,
        isLite,
        isNextJs: true,
        service,
        status: 404,
        timeOnServer: Date.now(),
        variant: variant?.[0] || null,
        ...extractHeaders(reqHeaders),
      },
    };
  }

  const { data, toggles } = await getPageData({
    id,
    page,
    service,
    variant,
    rendererEnv,
    resolvedUrl: context.resolvedUrl,
  });

  let routingInfoLogger = logger.debug;
  if (data.status !== OK) {
    routingInfoLogger = logger.error;
  }

  routingInfoLogger(ROUTING_INFORMATION, {
    url: context.resolvedUrl,
    status: data.status,
    pageType: LIVE_PAGE,
  });

  context.res.statusCode = data.status;
  return {
    props: {
      bbcOrigin: reqHeaders['bbc-origin'] || null,
      error: data?.error || null,
      id,
      isApp,
      isLite,
      isAmp: false,
      isNextJs: true,
      page: page || null,
      pageData: data?.pageData
        ? {
            ...data.pageData,
            metadata: {
              ...data.pageData.metadata,
              type: LIVE_PAGE,
            },
          }
        : null,
      pageType: LIVE_PAGE,
      pathname: context.resolvedUrl,
      service,
      showAdsBasedOnLocation: reqHeaders['bbc-adverts'] === 'true' || false,
      status: data.status,
      timeOnServer: Date.now(), // TODO: check if needed?
      toggles,
      variant: variant?.[0] || null,
      ...extractHeaders(reqHeaders),
    },
  };
};

export default LivePageLayout;
