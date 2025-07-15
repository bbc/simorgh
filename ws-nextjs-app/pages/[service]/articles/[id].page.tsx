import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import { MEDIA_ARTICLE_PAGE, ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import nodeLogger from '#lib/logger.node';
import logResponseTime from '#server/utilities/logResponseTime';
import isAppPath from '#app/routes/utils/isAppPath';

import { ROUTING_INFORMATION } from '#app/lib/logger.const';
import { OK } from '#app/lib/statusCodes.const';
import sendCustomMetric from '#server/utilities/customMetrics';
import { NON_200_RESPONSE } from '#server/utilities/customMetrics/metrics.const';
import isLitePath from '#app/routes/utils/isLitePath';
import PageDataParams from '#app/models/types/pageDataParams';
import deriveVariant from '#nextjs/utilities/deriveVariant';

import extractHeaders from '../../../../src/server/utilities/extractHeaders';
import getPageData from '../../../utilities/pageRequests/getPageData';

const MediaArticlePageLayout = dynamic(() => import('../MediaArticlePageLayout'));

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
  } = context.query as PageDataParams;

  const { headers: reqHeaders } = context.req;

  const isApp = isAppPath(context.resolvedUrl);
  const isLite = isLitePath(context.resolvedUrl);

  const variant = deriveVariant(variantFromUrl);

  // Articles path format: /[service]/articles/[id] 
  // For API calls, we just need the ID itself
  const articlePath = id;

  const { data, toggles } = await getPageData({
    id: articlePath,
    service,
    variant,
    rendererEnv,
    resolvedUrl: context.resolvedUrl,
    pageType: ARTICLE_PAGE, // Use ARTICLE_PAGE for data fetching
  });

  let routingInfoLogger = logger.debug;
  if (data.status !== OK) {
    routingInfoLogger = logger.error;
  }

  routingInfoLogger(ROUTING_INFORMATION, {
    url: context.resolvedUrl,
    status: data.status,
    pageType: MEDIA_ARTICLE_PAGE,
  });

  context.res.statusCode = data.status;

  if (data.status !== OK) {
    sendCustomMetric({
      metricName: NON_200_RESPONSE,
      statusCode: data.status,
      pageType: MEDIA_ARTICLE_PAGE,
      requestUrl: context.resolvedUrl,
    });
  }

  return {
    props: {
      error: data?.error || null,
      id: articlePath,
      isApp,
      isLite,
      isAmp: false,
      isNextJs: true,
      pageData: data?.pageData
        ? {
            ...data.pageData,
            metadata: {
              ...data.pageData.metadata,
              type: MEDIA_ARTICLE_PAGE,
            },
          }
        : null,
      pageType: MEDIA_ARTICLE_PAGE,
      pathname: context.resolvedUrl,
      service,
      status: data.status,
      timeOnServer: Date.now(),
      toggles,
      variant,
      ...extractHeaders(reqHeaders),
    },
  };
};

export default MediaArticlePageLayout;