import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { TOPIC_PAGE } from '#app/routes/utils/pageTypes';
import nodeLogger from '#lib/logger.node';
import logResponseTime from '#server/utilities/logResponseTime';
import { ROUTING_INFORMATION } from '#app/lib/logger.const';
import { OK } from '#app/lib/statusCodes.const';
import PageDataParams from '#app/models/types/pageDataParams';
import deriveVariant from '#nextjs/utilities/deriveVariant';
import isTest from '#app/lib/utilities/isTest';
import shouldRender from '#nextjs/utilities/shouldRender';
import handleError from '#app/routes/utils/handleError';
import getPageData from '../../../../utilities/pageRequests/getPageData';

const TopicPage = dynamic(() => import('#app/pages/TopicPage/TopicPage'));

const logger = nodeLogger(__filename);

export const getServerSideProps: GetServerSideProps = async context => {
  logResponseTime({ path: context.resolvedUrl }, context.res, () => null);

  const {
    id,
    service,
    variant: variantFromUrl,
    renderer_env: rendererEnvFromQuery,
    page,
  } = context.query as PageDataParams;

  const variant = deriveVariant(variantFromUrl);

  const rendererEnv =
    isTest() && !rendererEnvFromQuery ? 'live' : rendererEnvFromQuery;

  const { data } = await getPageData({
    id,
    page,
    service,
    variant,
    rendererEnv,
    resolvedUrl: context.resolvedUrl,
    pageType: TOPIC_PAGE,
  });

  const { status } = data;

  context.res.statusCode = status;

  let routingInfoLogger = logger.debug;

  const { hasRequestSucceeded, status: renderStatus } = shouldRender(
    { pageData: data.pageData, status: data.status },
    service,
  );

  if (!hasRequestSucceeded && renderStatus !== OK) {
    routingInfoLogger = logger.error;

    return {
      props: {
        service,
        status: renderStatus,
        timeOnServer: Date.now(),
        variant,
        pageType: TOPIC_PAGE,
        pathname: context.resolvedUrl,
      },
    };
  }

  if (!data?.pageData) {
    throw handleError('TopicPage data is malformed', 500);
  }

  context.res.setHeader(
    'Cache-Control',
    'public, stale-if-error=2400, stale-while-revalidate=960, max-age=240',
  );

  routingInfoLogger(ROUTING_INFORMATION, {
    url: context.resolvedUrl,
    status: data.status,
    pageType: TOPIC_PAGE,
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
          type: TOPIC_PAGE,
        },
      },
      pageType: TOPIC_PAGE,
      pathname: context.resolvedUrl,
      service,
      status: data.status,
      timeOnServer: Date.now(),
      variant,
    },
  };
};

export default TopicPage;
