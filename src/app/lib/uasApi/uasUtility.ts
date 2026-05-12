import type { Services } from '#app/models/types/global';
import type { OptimoRawImageBlock, Article } from '#app/models/types/optimo';
import buildIChefURL from '#app/lib/utilities/ichefURL';
import extractPromoImage from '#app/lib/utilities/extractPromoImage';
import type { UasApiRequestBody } from './index';

export interface SavedArticle {
  id: string;
  title: string;
  link: string;
  promoImage?: string;
  type: string;
  description?: string;
  imageAlt: string;
  imageUrl: string;
}

const FAVOURITES_CONFIG = {
  activityType: 'favourites',
  resourceDomain: 'articles',
  resourceType: 'article',
  action: 'favourited',
} as const;

export type ActivityType = (typeof FAVOURITES_CONFIG)['activityType'];

const buildGlobalId = (
  resourceId: string,
  resourceDomain = FAVOURITES_CONFIG.resourceDomain,
  resourceType = FAVOURITES_CONFIG.resourceType,
): string => `urn:bbc:${resourceDomain}:${resourceType}:${resourceId}`;

const createFavouritesPayload = ({
  articleId,
  service,
  articleTitle,
  promoImage,
  promoImageAltText,
  locatorUrl,
}: {
  articleId: string;
  service: Services;
  articleTitle: string;
  promoImage?: string;
  promoImageAltText?: string;
  locatorUrl?: string;
}): UasApiRequestBody => ({
  activityType: FAVOURITES_CONFIG.activityType,
  resourceDomain: FAVOURITES_CONFIG.resourceDomain,
  resourceType: FAVOURITES_CONFIG.resourceType,
  resourceId: articleId,
  action: FAVOURITES_CONFIG.action,
  metaData: {
    service,
    articleId,
    title: articleTitle,
    promoImage: promoImage || '',
    promoImageAltText: promoImageAltText || '',
    locatorUrl: locatorUrl || '',
  },
});

const extractPromoImageFromArticleData = (articlePageData?: Article) => {
  const promoImageBlocks =
    articlePageData?.promo?.images?.defaultPromoImage?.blocks ?? [];

  const { altText, rawBlock } = extractPromoImage(promoImageBlocks);

  return {
    altText,
    promoImageRawBlock: rawBlock,
  };
};

const buildPromoImageUrl = (promoImageObj?: {
  altText: string;
  promoImageRawBlock?: OptimoRawImageBlock;
}): string => {
  if (
    !promoImageObj?.promoImageRawBlock?.model?.locator ||
    !promoImageObj?.promoImageRawBlock?.model?.originCode
  ) {
    return '';
  }

  return buildIChefURL({
    originCode: promoImageObj.promoImageRawBlock.model.originCode,
    locator: promoImageObj.promoImageRawBlock.model.locator,
    resolution: 320,
  });
};

export {
  FAVOURITES_CONFIG,
  buildGlobalId,
  createFavouritesPayload,
  extractPromoImageFromArticleData,
  buildPromoImageUrl,
};
