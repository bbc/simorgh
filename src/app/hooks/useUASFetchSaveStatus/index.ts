import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import uasApiRequest from '#app/lib/uasApi';
import { buildGlobalId, FAVOURITES_CONFIG } from '#app/lib/uasApi/uasUtility';
import { HTTP_NO_CONTENT } from '#app/lib/statusCodes.const';
import uasKeys from '#app/lib/uasApi/queryKeys';
import { AccountContext } from '#app/contexts/AccountContext';

/** A hook that fetches an article's saved status from the UAS API,
 * also returning saved article metadata if available.
 * Returns the saved status, loading state, error, and metadata. */

interface UseUASFetchSaveStatusReturn {
  isSaved: boolean;
  isLoading: boolean;
  error: Error | null;
  savedMetadata?: Record<string, unknown>;
}

interface SavedArticleDetail {
  metaData?: Record<string, unknown>;
}

const fetchSaveStatusWithMetadata = async (
  articleId: string,
): Promise<{ isSaved: boolean; metadata?: Record<string, unknown> }> => {
  const globalId = buildGlobalId(articleId);
  const response = await uasApiRequest('GET', FAVOURITES_CONFIG.activityType, {
    globalId,
  });

  if (!response.ok || response.status === HTTP_NO_CONTENT) {
    return { isSaved: false };
  }

  try {
    const responseData = (await response.json()) as SavedArticleDetail;
    return {
      isSaved: true,
      metadata: responseData.metaData,
    };
  } catch (error) {
    return { isSaved: true, metadata: undefined };
  }
};

const useUASFetchSaveStatus = (
  articleId: string,
): UseUASFetchSaveStatusReturn => {
  const { hashedUserId = '' } = use(AccountContext);

  const {
    data = { isSaved: false },
    isLoading,
    error,
  } = useQuery({
    queryKey: uasKeys.favouriteStatus(hashedUserId, articleId),
    queryFn: () => fetchSaveStatusWithMetadata(articleId),
    enabled: !!articleId,
  });
  return {
    isSaved: data.isSaved,
    isLoading,
    error: error as Error | null,
    savedMetadata: data.metadata,
  };
};

export default useUASFetchSaveStatus;
