import { use } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUASFetchSaveStatus from '#app/hooks/useUASFetchSaveStatus';
import useUASMetadataSync from '#app/hooks/useUASMetadataSync';
import { ServiceContext } from '#app/contexts/ServiceContext';
import uasApiRequest from '#app/lib/uasApi';
import { buildGlobalId, FAVOURITES_CONFIG } from '#app/lib/uasApi/uasUtility';
import { Article } from '#app/models/types/optimo';
import uasKeys from '#app/lib/uasApi/queryKeys';
import { AccountContext } from '#app/contexts/AccountContext';
import upsertArticleData from '#app/lib/uasApi/upsertArticleData';

enum UASAction {
  SAVE = 'save',
  REMOVE = 'remove',
}

interface UseUASButtonReturn {
  isSaved: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  error: Error | null;
  handleSaveAction: (action: UASAction) => void;
}
export interface UseUASButtonProps {
  articleId: string;
  articlePageData?: Article;
}

// NOTE: Using this hook anywhere in the app will eagerly pull TanStack Query into the bundle.
// All TanStack-related code must live exclusively inside the lazy boundary.
const useUASButton = ({
  articleId,
  articlePageData,
}: UseUASButtonProps): UseUASButtonReturn => {
  const { service } = use(ServiceContext);
  const { hashedUserId = '', isRefreshAvailable } = use(AccountContext);
  const queryClient = useQueryClient();
  const { isSaved, isLoading, error, savedMetadata } =
    useUASFetchSaveStatus(articleId);

  const mutation = useMutation({
    mutationFn: async (action: UASAction) => {
      if (action === UASAction.SAVE) {
        if (!articlePageData) {
          throw new Error('Article data is required to save');
        }
        return upsertArticleData({
          articlePageData,
          articleId,
          service,
          isRefreshAvailable,
        });
      }
      const globalId = buildGlobalId(articleId);
      const response = await uasApiRequest(
        'DELETE',
        FAVOURITES_CONFIG.activityType,
        {
          globalId,
          isRefreshAvailable,
        },
      );
      if (!response.ok) {
        throw new Error(`Failed to remove article: ${response.status}`);
      }

      return undefined;
    },
    onSuccess: (metadata, action) => {
      const isSavedAction = action === UASAction.SAVE;
      queryClient.setQueryData(
        uasKeys.favouriteStatus(hashedUserId, articleId),
        {
          isSaved: isSavedAction,
          metadata: isSavedAction ? metadata : undefined,
        },
      );
      queryClient.invalidateQueries({
        queryKey: uasKeys.favouritesList(hashedUserId),
      });
    },
  });

  const handleMetadataOutOfDate = () => {
    if (articlePageData) {
      mutation.mutate(UASAction.SAVE);
    }
  };

  useUASMetadataSync({
    articlePageData,
    articleId,
    service,
    isSaved,
    savedArticleMetadata: savedMetadata,
    onMetadataOutOfDate: handleMetadataOutOfDate,
  });
  return {
    isSaved,
    isLoading,
    isUpdating: mutation.isPending,
    error: mutation.error || error,
    handleSaveAction: mutation.mutate,
  };
};

export { UASAction };
export default useUASButton;
