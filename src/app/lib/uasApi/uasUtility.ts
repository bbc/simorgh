import { whereEq } from 'ramda';
import type { Services } from '#app/models/types/global';
import type { OptimoRawImageBlock, Article } from '#app/models/types/optimo';
import buildIChefURL from '#app/lib/utilities/ichefURL';
import extractPromoImage from '#app/lib/utilities/extractPromoImage';
import filterForBlockType from '#app/lib/utilities/blockHandlers';
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

const USER_ID_COOKIE_KEY = 'ckns_sylphid';

const FAVOURITES_CONFIG = {
  activityType: 'favourites',
  resourceDomain: 'world-service-news',
  resourceType: 'article',
  action: 'favourited',
} as const;

export type ActivityType = (typeof FAVOURITES_CONFIG)['activityType'];

const buildGlobalId = (
  resourceId: string,
  resourceDomain = FAVOURITES_CONFIG.resourceDomain,
  resourceType = FAVOURITES_CONFIG.resourceType,
): string => `urn:bbc:${resourceDomain}:${resourceType}:${resourceId}`;

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

interface MetadataComparisonResult {
  hasChanges: boolean;
}

/**
 * Extracts headline text from article content blocks.
 */
const extractHeadlineFromBlocks = (
  blocks?: Array<Record<string, unknown>>,
): string | null => {
  const headlineBlock = filterForBlockType(blocks, 'headline');
  const headlineText =
    headlineBlock?.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.text;

  return headlineText ?? null;
};

/**
 * Extracts current live metadata from article page data.
 *
 * To add a new field: add it to the returned object below.
 * The compareMetadataWithSaved function will automatically include it.
 *
 * @param articlePageData - Current article being viewed
 * @param articleId - Article's unique identifier
 * @param service - BBC service name (e.g., 'arabic', 'portuguese')
 * @returns Object with tracked metadata fields
 */
const sanitiseMetadataString = (value: string | undefined): string =>
  value?.replace(/\s+/g, ' ').trim() ?? '';

const buildCurrentMetadata = (
  articlePageData: Article,
  { articleId, service }: { articleId: string; service: Services },
): Record<string, unknown> => {
  const promoImage = extractPromoImageFromArticleData(articlePageData);
  const contentBlocks = articlePageData?.content?.model?.blocks;
  const headline = extractHeadlineFromBlocks(contentBlocks);
  return {
    articleId,
    service,
    title: headline,
    promoImage: buildPromoImageUrl(promoImage),
    promoImageAltText: sanitiseMetadataString(promoImage?.altText),
    locatorUrl: articlePageData?.metadata?.locators?.canonicalUrl ?? '',
  };
};

/**
 * Compares current article metadata against saved metadata.
 *
 * Uses Ramda's whereEq for structural equality. New fields added to
 * buildCurrentMetadata() are automatically included in comparisons.
 *
 * @param currentMetadata - Live metadata from article
 * @param savedMetadata - Metadata stored in UAS
 * @returns Object with hasChanges flag
 */
const compareMetadataWithSaved = (
  currentMetadata: Record<string, unknown>,
  savedMetadata: Record<string, unknown>,
): MetadataComparisonResult => ({
  hasChanges: !whereEq(currentMetadata, savedMetadata),
});

const createFavouritesPayload = ({
  articleId,
  service,
  articlePageData,
}: {
  articleId: string;
  service: Services;
  articlePageData: Article;
}): UasApiRequestBody => ({
  activityType: FAVOURITES_CONFIG.activityType,
  resourceDomain: FAVOURITES_CONFIG.resourceDomain,
  resourceType: FAVOURITES_CONFIG.resourceType,
  resourceId: articleId,
  action: FAVOURITES_CONFIG.action,
  metaData: buildCurrentMetadata(articlePageData, {
    articleId,
    service,
  }),
});

export {
  USER_ID_COOKIE_KEY,
  FAVOURITES_CONFIG,
  buildGlobalId,
  createFavouritesPayload,
  extractPromoImageFromArticleData,
  buildPromoImageUrl,
  buildCurrentMetadata,
  compareMetadataWithSaved,
  extractHeadlineFromBlocks,
  sanitiseMetadataString,
};

export type { MetadataComparisonResult };
