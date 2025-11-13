import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import isLive from '#app/lib/utilities/isLive';
import { LIVE_PAGE } from '#app/routes/utils/pageTypes';
import nodeLogger from '#lib/logger.node';
import logResponseTime from '#server/utilities/logResponseTime';

import getPathExtension from '#app/utilities/getPathExtension';
import { ROUTING_INFORMATION } from '#app/lib/logger.const';
import { OK } from '#app/lib/statusCodes.const';
import sendCustomMetric from '#server/utilities/customMetrics';
import { NON_200_RESPONSE } from '#server/utilities/customMetrics/metrics.const';
import PageDataParams from '#app/models/types/pageDataParams';
import deriveVariant from '#nextjs/utilities/deriveVariant';
import extractHeaders from '#server/utilities/extractHeaders';
import isValidPageNumber from '#nextjs/utilities/pageQueryValidator';
import getPageData from '#nextjs/utilities/pageRequests/getPageData';

const LivePageLayout = dynamic(() => import('./LivePageLayout'));

const logger = nodeLogger(__filename);

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
    variant: variantFromUrl,
    renderer_env: rendererEnv,
    page = '1',
    post: assetId,
  } = context.query as PageDataParams;

  const { headers: reqHeaders } = context.req;

  const { isApp, isLite } = getPathExtension(context.resolvedUrl);

  const variant = deriveVariant(variantFromUrl);

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
        variant,
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
    pageType: LIVE_PAGE,
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

  // in order to only have the live post og metadata code on test only, (https://bbc.atlassian.net/browse/WS-1001)
  // we can send assetId into LivePage only if the env is not live
  // this means that on live, assetId will always be null and the full page metadata will be used instead of the individual post metadata
  const assetIdForTestEnv = isLive() ? null : assetId;

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
      assetId: assetIdForTestEnv || null,
      pageType: LIVE_PAGE,
      pathname: context.resolvedUrl,
      service,
      status: data.status,
      timeOnServer: Date.now(), // TODO: check if needed?
      toggles,
      variant,
      ...extractHeaders(reqHeaders),
    },
  };
};

export default LivePageLayout;
