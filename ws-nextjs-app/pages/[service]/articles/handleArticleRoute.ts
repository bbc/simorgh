import { GetServerSidePropsContext } from 'next';
import extractHeaders from '#server/utilities/extractHeaders';
import { ARTICLE_PAGE, MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import parseRoute from '#app/routes/utils/parseRoute';
import nodeLogger from '#lib/logger.node';
import { OK } from '#app/lib/statusCodes.const';
import { ROUTING_INFORMATION } from '#app/lib/logger.const';
import getPathExtension from '#app/utilities/getPathExtension';
import PageDataParams from '#app/models/types/pageDataParams';
import handleError from '#app/routes/utils/handleError';
import { PageTypes, Toggles } from '#app/models/types/global';
import augmentWithDisclaimer from '#app/routes/article/utils/augmentWithDisclaimer';
import shouldRender from '#app/legacy/containers/PageHandlers/withData/shouldRender';
import { ArticleMetadata } from '#app/models/types/optimo';
import getPageData from '../../../utilities/pageRequests/getPageData';

const logger = nodeLogger(__filename);

const transformPageData = (toggles?: Toggles) =>
  augmentWithDisclaimer({ toggles, positionFromTimestamp: 0 });

const getDerivedArticleType = (metadata: ArticleMetadata) => {
  let pageType: PageTypes = metadata?.type;

  if (metadata?.type === 'article' && metadata?.consumableAsSFV) {
    pageType = MEDIA_ARTICLE_PAGE;
  }

  return pageType;
};

export default async (context: GetServerSidePropsContext) => {
  const {
    resolvedUrl,
    req: { headers: reqHeaders },
  } = context;

  const { service, renderer_env: rendererEnv } =
    context.query as PageDataParams;

  context.res.setHeader(
    'Cache-Control',
    'public, stale-if-error=90, stale-while-revalidate=30, max-age=30',
  );

  const urlWithoutQuery = resolvedUrl.split('?')?.[0];

  const { isAmp, isApp, isLite } = getPathExtension(urlWithoutQuery);
  const { variant } = parseRoute(resolvedUrl);

  const { data, toggles } = await getPageData({
    id: urlWithoutQuery,
    service,
    variant: variant || undefined,
    rendererEnv,
    resolvedUrl: urlWithoutQuery,
    pageType: ARTICLE_PAGE,
  });

  const { pageData, status } = data;

  context.res.statusCode = status;

  let routingInfoLogger = logger.debug;

  const { hasRequestSucceeded, status: shouldRenderStatus } = shouldRender(
    { pageData, status },
    service,
    urlWithoutQuery,
    ARTICLE_PAGE,
  );

  // If request has fails or should not be rendered, return non-200 status
  if (!hasRequestSucceeded && shouldRenderStatus !== OK) {
    routingInfoLogger = logger.error;

    return {
      props: {
        isApp,
        isAmp,
        isLite,
        isNextJs: true,
        service,
        status: shouldRenderStatus,
        timeOnServer: Date.now(),
        variant: variant || null,
        ...extractHeaders(reqHeaders),
      },
    };
  }

  if (!data?.pageData?.article) {
    throw handleError('Article data is malformed', 500);
  }

  const { article, secondaryData } = data?.pageData || {};

  const { topStories, features, latestMedia, mostRead } = secondaryData;

  const transformedArticleData = transformPageData(toggles)(article);

  routingInfoLogger(ROUTING_INFORMATION, {
    url: urlWithoutQuery,
    status,
    pageType: ARTICLE_PAGE,
  });

  const derivedPageType = getDerivedArticleType(article.metadata);

  return {
    props: {
      id: urlWithoutQuery,
      isAmp,
      isApp,
      isLite,
      isNextJs: true,
      pageData: {
        ...transformedArticleData,
        secondaryColumn: {
          topStories: topStories || null,
          features: features || null,
          latestMedia: latestMedia || null,
        },
        mostRead,
      },
      pageType: derivedPageType,
      pathname: urlWithoutQuery,
      service,
      status,
      toggles,
      variant: variant || null,
      ...extractHeaders(reqHeaders),
    },
  };
};
