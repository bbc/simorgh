import { whereEq } from 'ramda';
import type { Services } from '#app/models/types/global';
import type { SaveArticlePageData } from '#app/lib/utilities/extractSaveArticleProps';
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

interface MetadataComparisonResult {
  hasChanges: boolean;
}

/**
 * Extracts current live metadata from article page data.
 *
 * To add a new field: add it to the returned object below.
 * The compareMetadataWithSaved function will automatically include it.
 *
 * @param saveArticlePageData - Current article metadata props
 * @param articleId - Article's unique identifier
 * @param service - BBC service name (e.g., 'arabic', 'portuguese')
 * @returns Object with tracked metadata fields
 */
const sanitiseMetadataString = (value: string | null | undefined): string =>
  value?.replace(/\s+/g, ' ').trim() ?? '';

const buildCurrentMetadata = (
  saveArticlePageData: SaveArticlePageData,
  { articleId, service }: { articleId: string; service: Services },
): Record<string, unknown> => {
  const { headline, promoImage, promoImageAltText, canonicalUrl } =
    saveArticlePageData;
  return {
    articleId,
    service,
    title: sanitiseMetadataString(headline),
    promoImage,
    promoImageAltText: sanitiseMetadataString(promoImageAltText),
    locatorUrl: canonicalUrl,
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
  saveArticlePageData,
}: {
  articleId: string;
  service: Services;
  saveArticlePageData: SaveArticlePageData;
}): UasApiRequestBody => ({
  activityType: FAVOURITES_CONFIG.activityType,
  resourceDomain: FAVOURITES_CONFIG.resourceDomain,
  resourceType: FAVOURITES_CONFIG.resourceType,
  resourceId: articleId,
  action: FAVOURITES_CONFIG.action,
  metaData: buildCurrentMetadata(saveArticlePageData, {
    articleId,
    service,
  }),
});

export {
  USER_ID_COOKIE_KEY,
  FAVOURITES_CONFIG,
  buildGlobalId,
  createFavouritesPayload,
  buildCurrentMetadata,
  compareMetadataWithSaved,
  extractHeadlineFromBlocks,
  sanitiseMetadataString,
};

export type { MetadataComparisonResult };
