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
import { getServerExperiments } from '#server/utilities/experimentHeader';
import fetchDataFromBFF from '#app/routes/utils/fetchDataFromBFF';
import getAgent from '#server/utilities/getAgent';
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

  const resolvedUrlWithoutQuery = resolvedUrl.split('?')?.[0];

  const { isAmp, isApp, isLite } = getPathExtension(resolvedUrlWithoutQuery);
  const { variant } = parseRoute(resolvedUrl);

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

  let routingInfoLogger = logger.debug;

  const { hasRequestSucceeded, status: renderStatus } = shouldRender(
    { pageData, status },
    service,
    resolvedUrlWithoutQuery,
    ARTICLE_PAGE,
  );

  // If request has fails or should not be rendered, return non-200 status
  if (!hasRequestSucceeded && renderStatus !== OK) {
    routingInfoLogger = logger.error;

    return {
      props: {
        isApp,
        isAmp,
        isLite,
        isNextJs: true,
        service,
        status: renderStatus,
        timeOnServer: Date.now(),
        variant: variant || null,
        pageType: ARTICLE_PAGE,
        pathname: resolvedUrlWithoutQuery,
        toggles,
        ...extractHeaders(reqHeaders),
      },
    };
  }

  if (!data?.pageData?.article) {
    throw handleError('Article data is malformed', 500);
  }

  const country = (reqHeaders['x-country'] || reqHeaders['x-bbc-edge-country'])
    ?.toString()
    .toLowerCase();

  const shouldAttemptPersonalisedTopicExperience =
    service === 'mundo' && !isAmp && Boolean(country);

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
        const countrySpecificData = await fetchDataFromBFF({
          pathname: `/${service}/topics/${countrySpecificId}?renderer_env=live`,
          pageType: 'topic',
          service,
          variant: variant || undefined,
          isAmp,
          getAgent,
        });

        const countryArticles =
          countrySpecificData?.json?.data?.curations?.[0]?.summaries || [];

        if (countrySpecificData?.json?.data) {
          personalisedContent = [
            {
              title: countrySpecificData.json.data.title,
              description: countrySpecificData.json.data.description,
              link: `/${service}/topics/${countrySpecificId}`,
              summaries: Array.isArray(countryArticles)
                ? countryArticles.slice(0, 4)
                : [],
              topicId: countrySpecificId,
            },
          ];
        }
      } catch (error) {
        logger.warn('PERSONALISED_CONTENT_TOPIC_FETCH_FAILED', {
          message: (error as Error)?.message,
          country,
          topicId: countrySpecificId,
        });
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
          ...(personalisedContent && {
            PersonalisedContent: personalisedContent,
          }),
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
