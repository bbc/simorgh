import { use } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUASFetchSaveStatus from '#app/hooks/useUASFetchSaveStatus';
import useUASMetadataSync from '#app/hooks/useUASMetadataSync';
import { ServiceContext } from '#app/contexts/ServiceContext';
import uasApiRequest from '#app/lib/uasApi';
import { buildGlobalId, FAVOURITES_CONFIG } from '#app/lib/uasApi/uasUtility';
import saveOrUpdateArticleMetadata from '#app/lib/uasApi/saveOrUpdateArticleMetadata';
import { Article } from '#app/models/types/optimo';
import uasKeys from '#app/lib/uasApi/queryKeys';
import { AccountContext } from '#app/contexts/AccountContext';
import nodeLogger from '#lib/logger.node';

const logger = nodeLogger(__filename);
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
  const { hashedUserId = '' } = use(AccountContext);
  const queryClient = useQueryClient();
  const { isSaved, isLoading, error, savedMetadata } =
    useUASFetchSaveStatus(articleId);

  useUASMetadataSync({
    articlePageData,
    articleId,
    service,
    isSaved,
    savedArticleMetadata: savedMetadata,
    onMetadataOutOfDate: async () => {
      if (!articlePageData) {
        return;
      }
      try {
        await saveOrUpdateArticleMetadata({
          articlePageData,
          articleId,
          service,
        });
        // Invalidate cache to fetch updated metadata
        queryClient.invalidateQueries({
          queryKey: uasKeys.favouriteStatus(hashedUserId, articleId),
        });
        queryClient.invalidateQueries({
          queryKey: uasKeys.favouritesList(hashedUserId),
        });
      } catch {
        logger.error('Failed to sync updated article metadata with UAS');
      }
    },
  });

  const mutation = useMutation({
    mutationFn: async (action: UASAction) => {
      if (action === UASAction.SAVE) {
        if (!articlePageData) {
          throw new Error('Article data is required to save');
        }
        await saveOrUpdateArticleMetadata({
          articlePageData,
          articleId,
          service,
        });
      } else {
        const globalId = buildGlobalId(articleId);
        await uasApiRequest('DELETE', FAVOURITES_CONFIG.activityType, {
          globalId,
        });
      }
    },
    onSuccess: (_, action) => {
      const isSavedAction = action === UASAction.SAVE;
      queryClient.setQueryData(
        uasKeys.favouriteStatus(hashedUserId, articleId),
        {
          isSaved: isSavedAction,
        },
      );
      queryClient.invalidateQueries({
        queryKey: uasKeys.favouritesList(hashedUserId),
      });
    },
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
