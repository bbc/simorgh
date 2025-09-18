import { ROUTING_INFORMATION } from '#app/lib/logger.const';
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from '#app/lib/statusCodes.const';
import filterForBlockType from '#app/lib/utilities/blockHandlers';
import getBrandedImage from '#app/lib/utilities/getBrandedImage';
import { Services } from '#app/models/types/global';
import { Article } from '#app/models/types/optimo';
import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import nodeLogger from '#lib/logger.node';

const logger = nodeLogger(__filename);

export const pageTypeToLog = 'og-image';

export const responseNotFound = ({ url }: { url: string }) => {
  logger.error(ROUTING_INFORMATION, {
    url,
    status: NOT_FOUND,
    pageType: pageTypeToLog,
  });

  return new Response('Not found', { status: NOT_FOUND });
};

export const responseServerError = ({ url }: { url: string }) => {
  logger.error(ROUTING_INFORMATION, {
    url,
    status: INTERNAL_SERVER_ERROR,
    pageType: pageTypeToLog,
  });

  return new Response('Server error', { status: INTERNAL_SERVER_ERROR });
};

const getDefaultImage = (service: Services) =>
  `https://news.files.bbci.co.uk/ws/img/logos/og/${service}.png`;

type ExtractReturnProps = {
  backgroundImage: string;
  isInTopStories?: boolean;
  isInMostRead?: boolean;
  isLive?: boolean;
};

export const extractArticleData = ({
  pageData,
  service,
}: {
  pageData: {
    article: Article;
    secondaryData: {
      topStories: TopStoryItem[];
      mostRead: Article['mostRead'];
    };
  };
  service: Services;
}): ExtractReturnProps => {
  const articleData = pageData?.article;

  const id = articleData?.metadata?.id?.split(':')?.pop() || '';

  const promoImageBlocks =
    articleData?.promo?.images?.defaultPromoImage?.blocks ?? [];

  const promoImageRawBlock = filterForBlockType(promoImageBlocks, 'rawImage');

  const promoImage = promoImageRawBlock?.model;

  const defaultImage = getDefaultImage(service);

  const brandedImage = promoImage?.locator
    ? getBrandedImage(promoImage?.locator, service)
    : defaultImage;

  const isInTopStories = Boolean(
    pageData?.secondaryData?.topStories?.some(
      (topStoryItem: { id: string | string[] }) =>
        topStoryItem?.id?.includes(id),
    ),
  );

  const isInMostRead = Boolean(
    pageData?.secondaryData?.mostRead?.items?.some(
      (mostReadItem: { id: string | string[] }) =>
        mostReadItem?.id?.includes(id),
    ),
  );

  return {
    backgroundImage: brandedImage,
    isInTopStories,
    isInMostRead,
  };
};

export const extractLiveData = ({
  pageData,
  service,
}: {
  pageData: {
    promoImage: {
      url: string;
      suitableForSyndication: boolean;
    } | null;
    isLive: boolean;
  };
  service: Services;
}): ExtractReturnProps => {
  const defaultImage = getDefaultImage(service);

  // Seems brittle but Live promo images aren't broken down by 'locator'
  const imageLocator = pageData?.promoImage?.url
    ?.split('/')
    ?.slice(-3)
    ?.join('/');

  const brandedImage = imageLocator
    ? getBrandedImage(imageLocator, service)
    : defaultImage;

  return {
    backgroundImage: brandedImage,
    isLive: pageData?.isLive || false,
  };
};
