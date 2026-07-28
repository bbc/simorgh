import { FAVOURITES_CONFIG } from '#app/lib/uasApi/uasUtility';
import uasKeys from '#app/lib/uasApi/queryKeys';
import useUASStatusHook, { UASStatusField } from '#app/hooks/useUASStatusHook';

/**
 * Fetches an article's saved status from UAS.
 * Wraps the generic useUASStatusHook factory with article-specific config.
 */

interface UseUASFetchSaveStatusReturn {
  isSaved: boolean;
  isLoading: boolean;
  error: Error | null;
  savedMetadata?: Record<string, unknown>;
}

// eslint-disable-next-line react-hooks/rules-of-hooks
const statusHook = useUASStatusHook({
  config: FAVOURITES_CONFIG,
  queryKeyFn: (hashedUserId, articleId) =>
    uasKeys.favouriteStatus(hashedUserId, articleId) as unknown as unknown[],
  statusField: UASStatusField.SAVED,
  enabledFn: articleId => !!articleId,
});

const useUASFetchSaveStatus = (
  articleId: string,
): UseUASFetchSaveStatusReturn => {
  const { isSaved, isLoading, error, metadata } = statusHook(articleId);
  return {
    isSaved,
    isLoading,
    error,
    savedMetadata: metadata,
  };
};

export default useUASFetchSaveStatus;
