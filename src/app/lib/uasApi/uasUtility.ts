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

/**
 * POC (Follow Topics): configuration for the UAS `follows` activity type.
 * Mirrors FAVOURITES_CONFIG so the same generic `uasApiRequest` handler,
 * `buildGlobalId`, error handling and TanStack Query patterns can be reused.
 */
const FOLLOWS_CONFIG = {
  activityType: 'follows',
  resourceDomain: 'world-service-news',
  resourceType: 'topic',
  action: 'followed',
} as const;

export type ActivityType =
  | (typeof FAVOURITES_CONFIG)['activityType']
  | (typeof FOLLOWS_CONFIG)['activityType'];

const buildGlobalId = (
  resourceId: string,
  resourceDomain: string = FAVOURITES_CONFIG.resourceDomain,
  resourceType: string = FAVOURITES_CONFIG.resourceType,
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
  resourceTitle: service,
  metaData: buildCurrentMetadata(saveArticlePageData, {
    articleId,
    service,
  }),
});

/**
 * POC (Follow Topics): the minimal set of topic fields we send to UAS so a
 * followed topic can be rendered later (e.g. in a "Followed topics" list)
 * without an extra lookup.
 */
export interface TopicFollowData {
  topicId: string;
  title: string;
  service: Services;
  url: string;
  description?: string;
  imageUrl?: string;
}

const buildTopicMetadata = ({
  topicId,
  title,
  service,
  url,
  description,
  imageUrl,
}: TopicFollowData): Record<string, unknown> => ({
  topicId,
  service,
  title: sanitiseMetadataString(title),
  locatorUrl: url,
  description: sanitiseMetadataString(description),
  imageUrl,
});

/**
 * POC (Follow Topics): builds the UAS request body for following a topic.
 * Structurally identical to `createFavouritesPayload`, only the config and
 * metadata differ — demonstrating the activity-agnostic reuse of the UAS layer.
 */
const createFollowsPayload = (
  topicData: TopicFollowData,
): UasApiRequestBody => ({
  activityType: FOLLOWS_CONFIG.activityType,
  resourceDomain: FOLLOWS_CONFIG.resourceDomain,
  resourceType: FOLLOWS_CONFIG.resourceType,
  resourceId: topicData.topicId,
  action: FOLLOWS_CONFIG.action,
  resourceTitle: topicData.service,
  metaData: buildTopicMetadata(topicData),
});

export {
  USER_ID_COOKIE_KEY,
  FAVOURITES_CONFIG,
  FOLLOWS_CONFIG,
  buildGlobalId,
  createFavouritesPayload,
  createFollowsPayload,
  buildTopicMetadata,
  buildCurrentMetadata,
  compareMetadataWithSaved,
  sanitiseMetadataString,
};

export type { MetadataComparisonResult };
