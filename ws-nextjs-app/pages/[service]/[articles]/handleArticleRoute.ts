import { GetServerSidePropsContext } from 'next';
import extractHeaders from '#server/utilities/extractHeaders';
import { ARTICLE_PAGE, MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import parseRoute from '#app/routes/utils/parseRoute';
import nodeLogger from '#lib/logger.node';
import { NOT_FOUND, OK } from '#app/lib/statusCodes.const';
import { ROUTING_INFORMATION } from '#app/lib/logger.const';
import getPathExtension from '#app/utilities/getPathExtension';
import PageDataParams from '#app/models/types/pageDataParams';
import handleError from '#app/routes/utils/handleError';
import { PageTypes, Toggles } from '#app/models/types/global';
import augmentWithDisclaimer from '#app/routes/article/utils/augmentWithDisclaimer';
import { ArticleMetadata } from '#app/models/types/optimo';
import { getServerExperiments } from '#server/utilities/experimentHeader';
import isLive from '#app/lib/utilities/isLive';
import shouldRender from './shouldRender';
import getPageData from '../../../utilities/pageRequests/getPageData';

const logger = nodeLogger(__filename);

const isValidArticlePath = (articlePath: string) =>
  ['articles', 'erthyglau', 'sgeulachdan'].includes(articlePath);

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

  const {
    articles: articlePath,
    service,
    renderer_env: rendererEnv,
  } = context.query as PageDataParams;

  const resolvedUrlWithoutQuery = resolvedUrl.split('?')?.[0];

  const { isAmp, isApp, isLite } = getPathExtension(resolvedUrlWithoutQuery);
  const { variant } = parseRoute(resolvedUrl);

  let routingInfoLogger = logger.debug;

  const propsForUnsuccessfulRequests = {
    isApp,
    isAmp,
    isLite,
    isNextJs: true,
    service,
    timeOnServer: Date.now(),
    variant: variant || null,
    pageType: ARTICLE_PAGE,
    pathname: resolvedUrlWithoutQuery,
    ...extractHeaders(reqHeaders),
  };

  if (!isValidArticlePath(articlePath as string)) {
    routingInfoLogger = logger.error;

    context.res.statusCode = NOT_FOUND;

    return {
      props: {
        ...propsForUnsuccessfulRequests,
        status: NOT_FOUND,
      },
    };
  }

  const { data, toggles } = await getPageData({
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

  const { hasRequestSucceeded, status: renderStatus } = shouldRender(
    { pageData, status },
    service,
  );

  // If request has fails or should not be rendered, return non-200 status
  if (!hasRequestSucceeded && renderStatus !== OK) {
    routingInfoLogger = logger.error;

    return {
      props: {
        ...propsForUnsuccessfulRequests,
        status: renderStatus,
      },
    };
  }

  if (!data?.pageData?.article) {
    throw handleError('Article data is malformed', 500);
  }

  const country = reqHeaders['x-country']?.toString().toLowerCase();
  const shouldAttemptPersonalisedTopicExperience =
    !isLive() && service === 'mundo' && !isAmp && Boolean(country);

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
  } = secondaryData || {};

  let personalisedContent;

  if (shouldAttemptPersonalisedTopicExperience) {
    const countrySpecificTopics: Record<string, string> = {
      ar: 'c7zp57yy6dzt',
      cl: 'c340qyppkk8t',
      mx: 'c340qyp6yggt',
      co: 'c404v5gz1rkt',
      es: 'c6vzy3wd189t',
      ve: 'cpzd49v9rd1t',
      us: 'cdr5613yzwqt',
      uy: 'cpzd498zwj6t',
      do: 'cr50y7pykkdt',
    };

    const countrySpecificId =
      country && countrySpecificTopics[country.toString()];

    if (countrySpecificId) {
      try {
        const { data: topicData } = await getPageData({
          id: `/${service}/topics/${countrySpecificId}`,
          rendererEnv: 'live',
          resolvedUrl: `/${service}/topics/${countrySpecificId}`,
          pageType: 'topic',
          service,
          variant: variant || undefined,
          isAmp,
        });

        const countrySpecificData = topicData?.pageData;
        const countryArticles =
          countrySpecificData?.curations?.[0]?.summaries || [];

        if (countrySpecificData) {
          personalisedContent = [
            {
              title: countrySpecificData.title,
              description: countrySpecificData.description,
              link: `/${service}/topics/${countrySpecificId}`,
              summaries: Array.isArray(countryArticles)
                ? countryArticles.slice(0, 4)
                : [],
              topicId: countrySpecificId,
            },
          ];
        }
      } catch (_error) {
        // void
      }
    }
  }

  const transformedArticleData = transformPageData(toggles)(article);

  routingInfoLogger(ROUTING_INFORMATION, {
    url: resolvedUrlWithoutQuery,
    status,
    pageType: ARTICLE_PAGE,
  });

  const derivedPageType = getDerivedArticleType(article.metadata);

  const serverSideExperiments = getServerExperiments({
    headers: reqHeaders,
    service,
    pageType: derivedPageType,
  });

  return {
    props: {
      country: reqHeaders?.['x-country'] || null,
      id: resolvedUrlWithoutQuery,
      isAmp,
      isApp,
      isLite,
      isNextJs: true,
      pageData: {
        ...transformedArticleData,
        secondaryColumn: {
          topStories,
          features,
          latestMedia,
          mediaCuration,
          billboardCuration,
          ...(personalisedContent && { personalisedContent }),
        },
        mostRead,
      },
      pageType: derivedPageType,
      pathname: resolvedUrlWithoutQuery,
      serverSideExperiments,
      service,
      status,
      toggles,
      variant: variant || null,
      ...extractHeaders(reqHeaders),
    },
  };
};
