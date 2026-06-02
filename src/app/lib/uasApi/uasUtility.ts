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

interface MetadataFieldExtractor {
  [fieldName: string]: (articlePageData: Article) => unknown;
}

interface MetadataComparisonResult {
  hasChanges: boolean;
  changedFields: string[];
  fieldDetails: Array<{
    field: string;
    current: unknown;
    saved: unknown;
    hasChanged: boolean;
  }>;
}

/**
 * Builds metadata field extractors that define how to extract specific fields from article data.
 * This is the extensibility point for adding new metadata fields to track and sync.
 *
 * To add a new field:
 * 1. Add a new key-value pair below with field name and extraction function
 * 2. The comparison and sync logic will automatically include it
 * 3. Example: `authorName: () => articlePageData?.byline?.name,`
 *
 * @param articlePageData - The article data to extract metadata from
 * @returns Object mapping field names to extractor functions
 */
const buildMetadataFieldExtractors = (
  articlePageData?: Article,
): MetadataFieldExtractor => ({
  title: () => articlePageData?.promo?.headlines?.seoHeadline,
  promoImage: () =>
    buildPromoImageUrl(extractPromoImageFromArticleData(articlePageData)),
  promoImageAltText: () => {
    const { altText } = extractPromoImageFromArticleData(articlePageData);
    return altText;
  },
  locatorUrl: () => articlePageData?.metadata?.locators?.canonicalUrl,
});

/**
 * Extracts current live metadata from article page data.
 * Builds a complete metadata object by applying all field extractors to the article data.
 *
 * This metadata is used for comparison against what's already saved in UAS
 * to detect if updates are needed.
 *
 * @param articlePageData - The current article being viewed
 * @param articleId - The article's unique identifier
 * @param service - The BBC service (e.g., 'arabic', 'portuguese')
 * @returns Object containing current metadata for all tracked fields
 */
const buildCurrentMetadata = (
  articlePageData: Article,
  { articleId, service }: { articleId: string; service: Services },
): Record<string, unknown> => {
  const extractors = buildMetadataFieldExtractors(articlePageData);
  const metadata: Record<string, unknown> = {
    articleId,
    service,
  };

  Object.entries(extractors).forEach(([field, extractor]) => {
    metadata[field] = extractor(articlePageData);
  });

  return metadata;
};

/**
 * Compares current article metadata against saved metadata to detect changes.
 * Returns detailed information about which fields changed and their values.
 *
 * Used by metadata sync system to determine if an article needs updating in UAS.
 * Only fields defined in fieldExtractors are compared (extensible design).
 *
 * @param currentMetadata - Live metadata extracted from article
 * @param savedMetadata - Metadata stored in UAS
 * @param fieldExtractors - Definition of which fields to compare
 * @returns Comparison result with hasChanges flag, list of changed fields, and detailed field-by-field comparison
 */
const compareMetadataWithSaved = (
  currentMetadata: Record<string, unknown>,
  savedMetadata: Record<string, unknown>,
  fieldExtractors: MetadataFieldExtractor,
): MetadataComparisonResult => {
  const fieldDetails: MetadataComparisonResult['fieldDetails'] = [];
  const changedFields: string[] = [];

  Object.keys(fieldExtractors).forEach(field => {
    const currentValue = currentMetadata[field];
    const savedValue = savedMetadata[field];
    const hasChanged = currentValue !== savedValue;

    fieldDetails.push({
      field,
      current: currentValue,
      saved: savedValue,
      hasChanged,
    });

    if (hasChanged) {
      changedFields.push(field);
    }
  });

  return {
    hasChanges: changedFields.length > 0,
    changedFields,
    fieldDetails,
  };
};

export {
  USER_ID_COOKIE_KEY,
  FAVOURITES_CONFIG,
  buildGlobalId,
  createFavouritesPayload,
  extractPromoImageFromArticleData,
  buildPromoImageUrl,
  buildMetadataFieldExtractors,
  buildCurrentMetadata,
  compareMetadataWithSaved,
};

export type { MetadataFieldExtractor, MetadataComparisonResult };
