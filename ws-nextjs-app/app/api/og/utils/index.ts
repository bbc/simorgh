import filterForBlockType from '#app/lib/utilities/blockHandlers';
import getBrandedImage from '#app/lib/utilities/getBrandedImage';
import buildIChefURL from '#app/lib/utilities/ichefURL';
import { Services } from '#app/models/types/global';
import { Article } from '#app/models/types/optimo';
import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';

const responseNotFound = () => new Response('Not found', { status: 404 });

const getDefaultImage = (service: Services) =>
  `https://news.files.bbci.co.uk/ws/img/logos/og/${service}.png`;

const getImages = ({
  service,
  promoImage,
}: {
  service: Services;
  promoImage: {
    originCode: string;
    locator: string;
    suitableForSyndication: boolean;
  };
}) => {
  const defaultImage = getDefaultImage(service);

  if (!promoImage?.suitableForSyndication)
    return { unbrandedImage: defaultImage, brandedImage: defaultImage };

  const unbrandedImage =
    buildIChefURL({
      originCode: promoImage?.originCode,
      locator: promoImage?.locator,
      resolution: 800,
    }) || defaultImage;

  const brandedImage =
    getBrandedImage(promoImage?.locator, service) || defaultImage;

  return { unbrandedImage, brandedImage };
};

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

  const { brandedImage } = getImages({ promoImage, service });

  const isInTopStories = Boolean(
    pageData?.secondaryData?.topStories.some(
      (topStoryItem: { id: string | string[] }) =>
        topStoryItem?.id.includes(id),
    ),
  );

  const isInMostRead = Boolean(
    pageData?.secondaryData?.mostRead?.items.some(
      (mostReadItem: { id: string | string[] }) =>
        mostReadItem?.id.includes(id),
    ),
  );

  return { backgroundImage: brandedImage, isInTopStories, isInMostRead };
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

  const imageLocator = pageData?.promoImage?.url.split('/').slice(-3).join('/'); // Seems brittle but Live promos don't have a branded URL path

  const brandedImage = imageLocator
    ? getBrandedImage(imageLocator, service)
    : defaultImage;

  return {
    backgroundImage: pageData?.promoImage?.suitableForSyndication
      ? brandedImage
      : defaultImage,
    isLive: pageData?.isLive || false,
  };
};

export { responseNotFound, getImages, extractArticleData, extractLiveData };
