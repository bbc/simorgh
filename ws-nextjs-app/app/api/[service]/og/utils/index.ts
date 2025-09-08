import filterForBlockType from '#app/lib/utilities/blockHandlers';
import getBrandedImage from '#app/lib/utilities/getBrandedImage';
import { Services } from '#app/models/types/global';
import { Article } from '#app/models/types/optimo';
import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';

const responseNotFound = () => new Response('Not found', { status: 404 });

const responseServerError = () => new Response('Server error', { status: 500 });

const getDefaultImage = (service: Services) =>
  `https://news.files.bbci.co.uk/ws/img/logos/og/${service}.png`;

type ExtractReturnProps = {
  backgroundImage: string;
  isInTopStories?: boolean;
  isInMostRead?: boolean;
  isLive?: boolean;
};

const extractArticleData = ({
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

const extractLiveData = ({
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

export {
  responseNotFound,
  responseServerError,
  extractArticleData,
  extractLiveData,
};
