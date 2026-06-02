import { useEffect, useRef } from 'react';
import {
  buildCurrentMetadata,
  buildMetadataFieldExtractors,
  compareMetadataWithSaved,
} from '#app/lib/uasApi/uasUtility';
import type { Article } from '#app/models/types/optimo';
import type { Services } from '#app/models/types/global';

interface UseUASMetadataSyncParams {
  articlePageData?: Article;
  articleId: string;
  service: Services;
  isSaved: boolean;
  savedArticleMetadata?: Record<string, unknown>;
  onMetadataOutOfDate?: () => void;
}

/**
 * Hook that automatically detects when saved article metadata is out of date
 * by comparing current article metadata with the last saved version.
 *
 * Uses hasSyncedRef to prevent duplicate sync calls on the same article load,
 * ensuring the comparison only happens once when conditions are met.
 *
 * @param articlePageData - Current article data from the page
 * @param articleId - Unique identifier for the article
 * @param service - BBC service name
 * @param isSaved - Whether the article is currently saved to UAS
 * @param savedArticleMetadata - Previously saved article metadata
 * @param onMetadataOutOfDate - Callback triggered when metadata changes are detected
 */

const useUASMetadataSync = ({
  articlePageData,
  articleId,
  service,
  isSaved,
  savedArticleMetadata,
  onMetadataOutOfDate,
}: UseUASMetadataSyncParams): void => {
  const hasSyncedRef = useRef(false);

  useEffect(() => {
    if (!isSaved || !articlePageData || !savedArticleMetadata) {
      hasSyncedRef.current = false;
      return;
    }

    // Prevent duplicate sync calls on the same article load
    if (hasSyncedRef.current) {
      return;
    }

    const fieldExtractors = buildMetadataFieldExtractors(articlePageData);
    const currentMetadata = buildCurrentMetadata(articlePageData, {
      articleId,
      service,
    });
    const comparisonResult = compareMetadataWithSaved(
      currentMetadata,
      savedArticleMetadata,
      fieldExtractors,
    );

    if (comparisonResult.hasChanges) {
      hasSyncedRef.current = true;
      onMetadataOutOfDate?.();
    }
  }, [
    articlePageData,
    articleId,
    service,
    isSaved,
    savedArticleMetadata,
    onMetadataOutOfDate,
  ]);
};

export default useUASMetadataSync;
