import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';

import { ROUTING_INFORMATION } from '#app/lib/logger.const';
import { OK } from '#app/lib/statusCodes.const';
import isTest from '#app/lib/utilities/isTest';
import PageDataParams from '#app/models/types/pageDataParams';
import handleError from '#app/routes/utils/handleError';
import { MOST_READ_PAGE, TOPIC_PAGE } from '#app/routes/utils/pageTypes';
import nodeLogger from '#lib/logger.node';
import deriveVariant from '#utilities/deriveVariant';
import logResponseTime from '#utilities/logResponseTime';
import getPageData from '#utilities/pageRequests/getPageData';

const MostReadAsTopicPage = dynamic(
  () => import('#app/pages/TopicPage/TopicPage'),
);

const logger = nodeLogger(__filename);

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { resolvedUrl } = context;

  logResponseTime({ path: resolvedUrl }, context.res, () => null);

  const {
    service,
    variant: variantFromUrl,
    renderer_env: rendererEnvFromQuery,
    page,
  } = context.query as PageDataParams;

  const variant = deriveVariant(variantFromUrl);

  const rendererEnv =
    isTest() && !rendererEnvFromQuery ? 'live' : rendererEnvFromQuery;

  const resolvedUrlWithoutQuery = resolvedUrl.split('?')?.[0];

  const id = 'mostReadTopic';

  const { data } = await getPageData({
    id,
    page,
    service,
    variant,
    rendererEnv,
    resolvedUrl: resolvedUrlWithoutQuery,
    pageType: TOPIC_PAGE,
  });

  const { status } = data;

  context.res.statusCode = status;

  let routingInfoLogger = logger.debug;

  if (status !== OK) {
    routingInfoLogger = logger.error;

    routingInfoLogger(ROUTING_INFORMATION, {
      url: resolvedUrlWithoutQuery,
      status,
      pageType: MOST_READ_PAGE,
    });

    return {
      props: {
        service,
        status,
        timeOnServer: Date.now(),
        variant,
        pageType: MOST_READ_PAGE,
        pathname: resolvedUrlWithoutQuery,
      },
    };
  }

  if (!data?.pageData) {
    throw handleError('MostReadPage data is malformed', 500);
  }

  context.res.setHeader(
    'Cache-Control',
    'public, stale-if-error=300, stale-while-revalidate=120, max-age=30',
  );

  routingInfoLogger(ROUTING_INFORMATION, {
    url: resolvedUrlWithoutQuery,
    status: data.status,
    pageType: MOST_READ_PAGE,
  });

  return {
    props: {
      error: data?.error || null,
      id,
      page: page || null,
      pageData: {
        ...data.pageData,
        metadata: {
          ...data.pageData.metadata,
          atiAnalytics: {
            ...data.pageData.metadata.atiAnalytics,
            pageTitle: data.pageData.title || null,
          },
          type: MOST_READ_PAGE,
        },
      },
      pageType: MOST_READ_PAGE,
      pathname: resolvedUrlWithoutQuery,
      service,
      status: data.status,
      timeOnServer: Date.now(),
      variant,
    },
  };
};

export default MostReadAsTopicPage;
