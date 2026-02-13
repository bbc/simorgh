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

import { ArticleMetadata } from '#app/models/types/optimo';
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

export default async (context: GetServerSidePropsContext) => {
  const {
    resolvedUrl,
    req: { headers: reqHeaders },
  } = context;

  const {
    service,
    renderer_env: rendererEnv,
    assetType,
  } = context.query as PageDataParams;

  const resolvedUrlWithoutQuery = resolvedUrl.split('?')?.[0];

  const { isAmp } = getPathExtension(resolvedUrlWithoutQuery);
  const { variant } = parseRoute(resolvedUrl);

  const { data } = await getPageData({
    id: resolvedUrlWithoutQuery,
    service,
    variant: variant || undefined,
    rendererEnv,
    resolvedUrl: resolvedUrlWithoutQuery,
    pageType: ARTICLE_PAGE,
    isAmp,
  });

  const { pageData, status } = data;

  context.res.statusCode = status;

  let routingInfoLogger = logger.debug;

  const { hasRequestSucceeded, status: renderStatus } = shouldRender(
    { pageData, status },
    service,
  );

  // If request has fails or should not be rendered, return non-200 status
  if (!hasRequestSucceeded && renderStatus !== OK) {
    routingInfoLogger = logger.error;

    return {
      props: {
        service,
        status: renderStatus,
        timeOnServer: Date.now(),
        variant: variant || null,
        pageType: ARTICLE_PAGE,
        pathname: resolvedUrlWithoutQuery,
      },
    };
  }

  if (!data?.pageData?.article) {
    throw handleError('Article data is malformed', 500);
  }

  const country = reqHeaders['x-country']?.toString()?.toLowerCase() || null;

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
    mediaCuration = null,
    portraitVideoItems = null,
  } = secondaryData || {};

  const transformedArticleData = transformPageData()(article);

  routingInfoLogger(ROUTING_INFORMATION, {
    url: resolvedUrlWithoutQuery,
    status,
    pageType: ARTICLE_PAGE,
  });

  let derivedPageType = getDerivedArticleType(article.metadata);

  if (resolvedUrlWithoutQuery.includes('c33je1em7jpo')) {
    derivedPageType = 'mediaArticle';
  }

  const isSportAssetType = assetType === 'sport';

  const isSportTag = article?.metadata?.tags?.about?.some(
    aboutTag => aboutTag.thingEnglishLabel === 'Sport',
  );

  const assetId = article?.metadata?.id.split(':').pop();

  // Redirect to sport route if 'Sport' about tag is found and we're not on a sport route
  // This covers cases where links to other sport pages in the article aren't updated to the new sport route yet
  if (!isSportAssetType && isSportTag) {
    return {
      redirect: {
        destination: `/${service}/sport/articles/${assetId}?renderer_env=live`,
        permanent: false,
      },
    };
  }

  // Edge case: Redirect to article route if 'Sport' about tag is not found and we're on a sport route
  if (isSportAssetType && !isSportTag) {
    return {
      redirect: {
        destination: `/${service}/articles/${assetId}?renderer_env=live`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      isSportPage: isSportAssetType && isSportTag,
      country,
      id: resolvedUrlWithoutQuery,
      pageData: {
        ...transformedArticleData,
        secondaryColumn: {
          topStories,
          features,
          latestMedia,
          mediaCuration,
          billboardCuration,
        },
        mostRead,
        portraitVideoItems,
      },
      pageType: derivedPageType,
      pathname: resolvedUrlWithoutQuery,
      service,
      status,
      variant: variant || null,
    },
  };
};
