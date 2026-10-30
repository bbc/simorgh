import { GetServerSidePropsContext } from 'next';
import { ARTICLE_PAGE, MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import parseRoute from '#app/routes/utils/parseRoute';
import nodeLogger from '#lib/logger.node';
import { OK } from '#app/lib/statusCodes.const';
import { ROUTING_INFORMATION } from '#app/lib/logger.const';
import getPathExtension from '#app/utilities/getPathExtension';
import PageDataParams from '#app/models/types/pageDataParams';
import handleError from '#app/routes/utils/handleError';
import { PageTypes } from '#app/models/types/global';
import { Curation } from '#app/models/types/curationData';

import { ArticleMetadata } from '#app/models/types/optimo';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import getRequestUrl from '#utilities/pageRequests/getRequestUrl';
import excludeCurrentArticle from '#app/lib/utilities/excludeCurrentArticle';
import augmentWithDisclaimer from './augmentWithDisclaimer';
import shouldRender from '../../../utilities/shouldRender';
import getPageData from '../../../utilities/pageRequests/getPageData';

const logger = nodeLogger(__filename);

const transformPageData = () =>
  augmentWithDisclaimer({ positionFromTimestamp: 0 });

const getDerivedArticleType = (metadata: ArticleMetadata) => {
  let pageType: PageTypes = metadata?.type;

  if (metadata?.type === 'article' && metadata?.consumableAsSFV) {
    pageType = MEDIA_ARTICLE_PAGE;
  }

  return pageType;
};

// Removes the current article from a curation's summaries
const dedupeCurationSummaries = (
  curation: Curation | null,
  currentArticleId?: string,
): Curation | null =>
  curation
    ? {
        ...curation,
        summaries: excludeCurrentArticle(curation.summaries, currentArticleId),
      }
    : curation;

export default async (context: GetServerSidePropsContext) => {
  const {
    resolvedUrl,
    req: { headers: reqHeaders },
  } = context;

  const { service, renderer_env: rendererEnv } =
    context.query as PageDataParams;

  const resolvedUrlWithoutQuery = resolvedUrl.split('?')?.[0];
  const canonicalPathname = getRequestUrl(context).split('?')[0];

  const { isAmp } = getPathExtension(resolvedUrlWithoutQuery);
  const { variant } = parseRoute(resolvedUrl);

  const countryHeader =
    reqHeaders['x-country'] || reqHeaders['x-bbc-edge-country'];
  const country = countryHeader
    ? (Array.isArray(countryHeader) ? countryHeader[0] : countryHeader)
        .toString()
        .toLowerCase()
    : null;

  const shouldFetchCountryCuration = getEnvConfig().SIMORGH_APP_ENV !== 'live';

  const { data } = await getPageData({
    id: resolvedUrlWithoutQuery,
    service,
    variant: variant || undefined,
    rendererEnv,
    resolvedUrl: resolvedUrlWithoutQuery,
    pageType: ARTICLE_PAGE,
    isAmp,
    ...(shouldFetchCountryCuration && country && { country }),
  });

  const { pageData, status } = data;

  context.res.statusCode = status;

  let routingInfoLogger = logger.debug;

  const { hasRequestSucceeded, status: renderStatus } = shouldRender(
    { pageData: pageData?.article, status },
    service,
    ['brasil', 'BBCScotland'], // Passport homes to ignore for service validation
  );

  // If request has fails or should not be rendered, return non-200 status
  if (!hasRequestSucceeded && renderStatus !== OK) {
    routingInfoLogger = logger.error;

    routingInfoLogger(ROUTING_INFORMATION, {
      url: resolvedUrlWithoutQuery,
      status: renderStatus,
      pageType: ARTICLE_PAGE,
    });

    return {
      props: {
        service,
        status: renderStatus,
        timeOnServer: Date.now(),
        variant: variant || null,
        pageType: ARTICLE_PAGE,
        pathname: canonicalPathname,
      },
    };
  }

  if (!data?.pageData?.article) {
    throw handleError('Article data is malformed', 500);
  }

  const { article, secondaryData } = data?.pageData || {};
  const isArticleOlderThanSixHours =
    Date.now() - article.metadata.lastPublished > 21600000;
  const maxAge = isArticleOlderThanSixHours ? 90 : 45;

  context.res.setHeader(
    'Cache-Control',
    `public, stale-if-error=90, stale-while-revalidate=30, max-age=${maxAge}`,
  );

  const {
    topStories = null,
    features = null,
    latestMedia = null,
    mostRead = null,
    billboardCuration = null,
    videoCuration: mediaCuration = null,
    portraitVideoItems = null,
    countryCuration = null,
    countryTopicIdToReorder = null,
  } = secondaryData || {};


  // Note: this filters the current article out of the (fixed-size) list the
  // BFF already returned, rather than fetching an extra item to backfill the
  // one removed - the BFF response for this route doesn't support a count/
  // limit param, so on the rare occasion the current article is present,
  // readers may see one fewer promo than usual for that surface.
  // TODO - fetch one extra summary in the BFF
  const currentArticleId = article.metadata.id;

  const dedupedTopStories = excludeCurrentArticle(topStories, currentArticleId);

  const dedupedMediaCuration = dedupeCurationSummaries(
    mediaCuration,
    currentArticleId,
  );

  const dedupedCountryCuration = dedupeCurationSummaries(
    countryCuration,
    currentArticleId,
  );

  const dedupedBillboardCuration = dedupeCurationSummaries(
    billboardCuration,
    currentArticleId,
  );

  const transformedArticleData = transformPageData()(article);

  routingInfoLogger(ROUTING_INFORMATION, {
    url: resolvedUrlWithoutQuery,
    status,
    pageType: ARTICLE_PAGE,
  });

  const derivedPageType = getDerivedArticleType(article.metadata);

  return {
    props: {
      country,
      id: resolvedUrlWithoutQuery,
      pageData: {
        ...transformedArticleData,
        secondaryColumn: {
          topStories: dedupedTopStories,
          features,
          latestMedia,
          mediaCuration: dedupedMediaCuration,
          billboardCuration: dedupedBillboardCuration,
        },
        mostRead,
        portraitVideoItems,
        countryCuration: dedupedCountryCuration,
        countryTopicIdToReorder,
      },
      pageType: derivedPageType,
      pathname: canonicalPathname,
      service,
      status,
      variant: variant || null,
    },
  };
};
