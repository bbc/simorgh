import { GetStaticPropsContext } from 'next';
import { ARTICLE_PAGE, MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import parseRoute from '#app/routes/utils/parseRoute';
import nodeLogger from '#lib/logger.node';
import { OK } from '#app/lib/statusCodes.const';
import { ROUTING_INFORMATION } from '#app/lib/logger.const';
import getPathExtension from '#app/utilities/getPathExtension';
import { PageTypes } from '#app/models/types/global';
import { ArticleMetadata } from '#app/models/types/optimo';
import augmentWithDisclaimer from '../articles/augmentWithDisclaimer';
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

type Params = {
  service: string;
  variant?: string[];
};

const buildCanonicalPathname = (params?: Params) => {
  const service = params?.service;
  const segments = params?.variant || [];

  if (!service || segments.length === 0) {
    return null;
  }

  return `/${service}/articles/${segments.join('/')}`;
};

export default async (context: GetStaticPropsContext<Params>) => {
  const pathname = buildCanonicalPathname(context.params);

  if (!pathname) {
    return {
      notFound: true,
    };
  }

  const { service } = context.params as Params;

  const { isAmp } = getPathExtension(pathname);
  const { variant } = parseRoute(pathname);

  const { data } = await getPageData({
    id: pathname,
    service,
    variant: variant || undefined,
    resolvedUrl: pathname,
    pageType: ARTICLE_PAGE,
    isAmp,
  });

  const { pageData, status } = data;

  let routingInfoLogger = logger.debug;

  const { hasRequestSucceeded, status: renderStatus } = shouldRender(
    { pageData: pageData?.article, status },
    service,
    ['brasil', 'BBCScotland'],
  );

  if (!hasRequestSucceeded && renderStatus !== OK) {
    routingInfoLogger = logger.error;

    routingInfoLogger(ROUTING_INFORMATION, {
      url: pathname,
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
        pathname,
      },
    };
  }

  if (!data?.pageData?.article) {
    return {
      props: {
        service,
        status: 500,
        timeOnServer: Date.now(),
        variant: variant || null,
        pageType: ARTICLE_PAGE,
        pathname,
      },
    };
  }

  const { article, secondaryData } = data?.pageData || {};

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
    url: pathname,
    status,
    pageType: ARTICLE_PAGE,
  });

  const derivedPageType = getDerivedArticleType(article.metadata);

  return {
    props: {
      country: null,
      id: pathname,
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
      pathname,
      service,
      status,
      variant: variant || null,
    },
  };
};
