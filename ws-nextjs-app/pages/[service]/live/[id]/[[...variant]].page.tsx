import { GetServerSideProps } from 'next';
import constructPageFetchUrl from '#app/routes/utils/constructPageFetchUrl';
import getToggles from '#app/lib/utilities/getToggles/withCache';
import { LIVE_PAGE } from '#app/routes/utils/pageTypes';
import nodeLogger from '#lib/logger.node';
import logResponseTime from '#server/utilities/logResponseTime';
import isAppPath from '#app/routes/utils/isAppPath';

import { ROUTING_INFORMATION, BFF_FETCH_ERROR } from '#app/lib/logger.const';
import { FetchError } from '#models/types/fetch';

import getEnvironment from '#app/routes/utils/getEnvironment';
import fetchPageData from '#app/routes/utils/fetchPageData';
import certsRequired from '#app/routes/utils/certsRequired';
import { OK } from '#app/lib/statusCodes.const';
import sendCustomMetric from '#server/utilities/customMetrics';
import { NON_200_RESPONSE } from '#server/utilities/customMetrics/metrics.const';
import isLitePath from '#app/routes/utils/isLitePath';
import PageDataParams from '#app/models/types/pageDataParams';
import isLocal from '#app/lib/utilities/isLocal';
import getAgent from '../../../../utilities/undiciAgent';

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
  const pathname = `${id}${rendererEnv ? `?renderer_env=${rendererEnv}` : ''}`; // at this point the cps id is just the numbers not including /${service}/live

  const livePageUrl = constructPageFetchUrl({
    page,
    pageType: 'live',
    pathname, // at this point the cps id is just the numbers not including /${service}/live
    service,
    variant,
  });
  const env = getEnvironment(pathname);
  const optHeaders = { 'ctx-service-env': env };

  const agent = certsRequired(pathname) ? await getAgent() : null;

  let pageStatus;
  let pageJson;
  let errorMessage;

  const path = livePageUrl.toString();
  // here the path has cps id WITH /${service}/live before it
  console.log('path ***', path);

  try {
    // @ts-expect-error Due to jsdoc inference, and no TS within fetchPageData
    const { status, json } = await fetchPageData({
      path, // here the path has cps id WITH /${service}/live before it
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
      pageType: LIVE_PAGE,
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

export const getServerSideProps: GetServerSideProps = async context => {
  context.res.setHeader(
    'Cache-Control',
    'public, stale-if-error=300, stale-while-revalidate=120, max-age=30',
  );

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
      status: data.status,
      timeOnServer: Date.now(), // TODO: check if needed?
      toggles,
      variant: variant?.[0] || null,
      ...extractHeaders(reqHeaders),
    },
  };
};

export default LivePageLayout;
