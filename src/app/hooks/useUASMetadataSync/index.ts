import { useEffect, useRef } from 'react';
import {
  buildCurrentMetadata,
  buildTopicMetadata,
  compareMetadataWithSaved,
  type FollowTopicData,
} from '#app/lib/uasApi/uasUtility';
import type { SaveArticlePageData } from '#app/lib/utilities/extractSaveArticleProps';
import type { Services } from '#app/models/types/global';

interface ArticleMetadataSyncParams {
  saveArticlePageData: SaveArticlePageData;
  articleId: string;
  isSaved: boolean;
  savedArticleMetadata?: Record<string, unknown>;
}

interface TopicMetadataSyncParams {
  followTopicPageData: FollowTopicData;
  topicId: string;
  isFollowed: boolean;
  savedTopicMetadata?: Record<string, unknown>;
}

type UseUASMetadataSyncParams = (
  | ArticleMetadataSyncParams
  | TopicMetadataSyncParams
) & {
  service: Services;
  onMetadataOutOfDate?: () => void;
};

const getMetadataSyncData = (params: UseUASMetadataSyncParams) => {
  if ('followTopicPageData' in params) {
    const { followTopicPageData, topicId, isFollowed, savedTopicMetadata } =
      params;

    return {
      pageData: followTopicPageData,
      resourceId: topicId,
      resourceType: 'topic',
      isActive: isFollowed,
      savedMetadata: savedTopicMetadata,
    };
  }

  const { saveArticlePageData, articleId, isSaved, savedArticleMetadata } =
    params;

  return {
    pageData: saveArticlePageData,
    resourceId: articleId,
    resourceType: 'article',
    isActive: isSaved,
    savedMetadata: savedArticleMetadata,
  };
};

/**
 * Detects stale metadata for saved articles and followed topics.
 * Syncs at most once per resource and service until it is removed or its
 * saved metadata becomes unavailable.
 */

const useUASMetadataSync = (params: UseUASMetadataSyncParams): void => {
  const hasSyncedRef = useRef(false);

  const { service, onMetadataOutOfDate } = params;
  const { pageData, resourceId, resourceType, isActive, savedMetadata } =
    getMetadataSyncData(params);

  const syncKey = `${resourceType}:${service}:${resourceId}`;

  useEffect(() => {
    if (!isActive || !savedMetadata) {
      hasSyncedRef.current = false;
      return;
    }

    // Prevent duplicate sync calls on the same article load
    if (hasSyncedRef.current) {
      return;
    }

    const currentMetadata =
      'topicId' in pageData
        ? buildTopicMetadata(pageData, service)
        : buildCurrentMetadata(pageData, { articleId: resourceId, service });

    const comparisonResult = compareMetadataWithSaved(
      currentMetadata,
      savedMetadata,
    );

    if (comparisonResult.hasChanges) {
      hasSyncedRef.current = true;
      onMetadataOutOfDate?.();
    }
  }, [
    pageData,
    resourceId,
    service,
    isActive,
    savedMetadata,
    syncKey,
    onMetadataOutOfDate,
  ]);
};

export default useUASMetadataSync;
