import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import uasApiRequest from '#app/lib/uasApi';
import { buildGlobalId, FAVOURITES_CONFIG } from '#app/lib/uasApi/uasUtility';
import { HTTP_NO_CONTENT } from '#app/lib/statusCodes.const';
import uasKeys from '#app/lib/uasApi/queryKeys';
import { AccountContext } from '#app/contexts/AccountContext';

/** A hook that fetches an article’s saved status from the UAS API,
 * returning the saved status, loading state, and any error encountered. */

interface UseUASFetchSaveStatusReturn {
  isSaved: boolean;
  isLoading: boolean;
  error: Error | null;
}

const fetchSaveStatus = async (
  articleId: string,
  isRefreshAvailable: boolean,
): Promise<boolean> => {
  const globalId = buildGlobalId(articleId);
  const response = await uasApiRequest('GET', FAVOURITES_CONFIG.activityType, {
    globalId,
    isRefreshAvailable,
  });
  return response.ok && response.status !== HTTP_NO_CONTENT;
};

const useUASFetchSaveStatus = (
  articleId: string,
): UseUASFetchSaveStatusReturn => {
  const { hashedUserId = '', isRefreshAvailable } = use(AccountContext);

  const {
    data: isSaved = false,
    isLoading,
    error,
  } = useQuery({
    queryKey: uasKeys.favouriteStatus(hashedUserId, articleId),
    queryFn: () => fetchSaveStatus(articleId, isRefreshAvailable),
    enabled: !!articleId,
  });

  return { isSaved, isLoading, error: error as Error | null };
};

export default useUASFetchSaveStatus;
