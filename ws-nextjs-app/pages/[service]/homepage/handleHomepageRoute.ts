import { GetServerSidePropsContext } from 'next';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import parseRoute from '#app/routes/utils/parseRoute';
import nodeLogger from '#lib/logger.node';
import { OK } from '#app/lib/statusCodes.const';
import { ROUTING_INFORMATION } from '#app/lib/logger.const';
import getPathExtension from '#app/utilities/getPathExtension';
import PageDataParams from '#app/models/types/pageDataParams';
import handleError from '#app/routes/utils/handleError';
import { getServerExperiments } from '#server/utilities/experimentHeader';
import shouldRender from '../../../utilities/shouldRender';
import getPageData from '../../../utilities/pageRequests/getPageData';

const logger = nodeLogger(__filename);

export default async (context: GetServerSidePropsContext) => {
  const {
    resolvedUrl,
    req: { headers: reqHeaders },
  } = context;

  const { service, renderer_env: rendererEnv } =
    context.query as PageDataParams;

  const resolvedUrlWithoutQuery = resolvedUrl.split('?')?.[0];

  const { isAmp } = getPathExtension(resolvedUrlWithoutQuery);
  const { variant } = parseRoute(resolvedUrl);

  const { data } = await getPageData({
    id: resolvedUrlWithoutQuery,
    service,
    variant: variant || undefined,
    rendererEnv,
    resolvedUrl: resolvedUrlWithoutQuery,
    pageType: HOME_PAGE,
    isAmp,
  });

  const { pageData, status } = data;

  context.res.statusCode = status;

  let routingInfoLogger = logger.debug;

  const { hasRequestSucceeded, status: renderStatus } = shouldRender(
    { pageData, status },
    service,
  );

  if (!hasRequestSucceeded && renderStatus !== OK) {
    routingInfoLogger = logger.error;

    return {
      props: {
        service,
        status: renderStatus,
        timeOnServer: Date.now(),
        variant: variant || null,
        pageType: HOME_PAGE,
        pathname: resolvedUrlWithoutQuery,
      },
    };
  }

  if (!pageData) {
    throw handleError('HomePage data is malformed', 500);
  }

  context.res.setHeader(
    'Cache-Control',
    'public, stale-if-error=90, stale-while-revalidate=30, max-age=60',
  );

  routingInfoLogger(ROUTING_INFORMATION, {
    url: resolvedUrlWithoutQuery,
    status,
    pageType: HOME_PAGE,
  });

  const serverSideExperiments = getServerExperiments({
    headers: reqHeaders,
    service,
    pageType: HOME_PAGE,
  });

  return {
    props: {
      id: resolvedUrlWithoutQuery,
      pageData: {
        title: pageData.title ?? null,
        seoTitle: pageData.seoTitle ?? null,
        metadata: { ...pageData.metadata, type: HOME_PAGE },
        curations: pageData.curations ?? null,
        description: pageData.description ?? null,
        seoDescription: pageData.seoDescription ?? null,
      },
      pageType: HOME_PAGE,
      pathname: resolvedUrlWithoutQuery,
      serverSideExperiments,
      service,
      status,
      variant: variant || null,
    },
  };
};
