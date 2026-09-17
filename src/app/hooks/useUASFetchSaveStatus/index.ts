import { FAVOURITES_CONFIG } from '#app/lib/uasApi/uasUtility';
import uasKeys from '#app/lib/uasApi/queryKeys';
import useUASStatusHook, { UASStatusField } from '#app/hooks/useUASStatusHook';

/**
 * Fetches an article's saved status from UAS.
 * Wraps the generic useUASStatusHook with article-specific config.
 */

interface UseUASFetchSaveStatusReturn {
  isSaved: boolean;
  isLoading: boolean;
  error: Error | null;
  savedMetadata?: Record<string, unknown>;
}

const useUASFetchSaveStatus = (
  articleId: string,
): UseUASFetchSaveStatusReturn => {
  const { isSaved, isLoading, error, metadata } = useUASStatusHook({
    resourceId: articleId,
    config: FAVOURITES_CONFIG,
    queryKeyFn: (hashedUserId, id) => uasKeys.favouriteStatus(hashedUserId, id),
    statusField: UASStatusField.SAVED,
    enabledFn: id => !!id,
  });

  return {
    isSaved,
    isLoading,
    error,
    savedMetadata: metadata,
  };
};

export default useUASFetchSaveStatus;
