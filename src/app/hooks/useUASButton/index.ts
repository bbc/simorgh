import { use, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUASFetchSaveStatus from '#app/hooks/useUASFetchSaveStatus';
import useUASMetadataSync from '#app/hooks/useUASMetadataSync';
import { ServiceContext } from '#app/contexts/ServiceContext';
import uasApiRequest from '#app/lib/uasApi';
import { buildGlobalId, FAVOURITES_CONFIG } from '#app/lib/uasApi/uasUtility';
import type { SaveArticlePageData } from '#app/lib/utilities/extractSaveArticleProps';
import uasKeys from '#app/lib/uasApi/queryKeys';
import { AccountContext } from '#app/contexts/AccountContext';
import upsertArticleData from '#app/lib/uasApi/upsertArticleData';

enum UASAction {
  SAVE = 'save',
  REMOVE = 'remove',
}

export type UASActionResult = {
  status: 'success' | 'error';
  action: UASAction;
} | null;

interface UseUASButtonReturn {
  isSaved: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  error: Error | null;
  actionResult: UASActionResult;
  resetActionResult: () => void;
  handleSaveAction: (action: UASAction) => void;
}
export interface UseUASButtonProps {
  articleId: string;
  saveArticlePageData: SaveArticlePageData;
}

// NOTE: Using this hook anywhere in the app will eagerly pull TanStack Query into the bundle.
// All TanStack-related code must live exclusively inside the lazy boundary.
const useUASButton = ({
  articleId,
  saveArticlePageData,
}: UseUASButtonProps): UseUASButtonReturn => {
  const { service } = use(ServiceContext);
  const { hashedUserId = '', isRefreshAvailable } = use(AccountContext);
  const queryClient = useQueryClient();
  const { isSaved, isLoading, error, savedMetadata } =
    useUASFetchSaveStatus(articleId);

  // Only ever set from handleSaveAction's own mutate callbacks, so the
  // background metadata resync (which doesn't pass those callbacks) can never affect it.
  const [actionResult, setActionResult] = useState<UASActionResult>(null);

  const mutation = useMutation({
    mutationFn: async (action: UASAction) => {
      if (action === UASAction.SAVE) {
        return upsertArticleData({
          saveArticlePageData,
          articleId,
          service,
          isRefreshAvailable,
        });
      }
      const globalId = buildGlobalId(articleId);
      await uasApiRequest('DELETE', FAVOURITES_CONFIG.activityType, {
        globalId,
        isRefreshAvailable,
      });
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
    mutation.mutate(UASAction.SAVE);
  };

  useUASMetadataSync({
    saveArticlePageData,
    articleId,
    service,
    isSaved,
    savedArticleMetadata: savedMetadata,
    onMetadataOutOfDate: handleMetadataOutOfDate,
  });

  const handleSaveAction = (action: UASAction) =>
    mutation.mutate(action, {
      onSuccess: () => setActionResult({ status: 'success', action }),
      onError: () => setActionResult({ status: 'error', action }),
    });

  const resetActionResult = () => {
    setActionResult(null);
    mutation.reset();
  };

  return {
    isSaved,
    isLoading,
    isUpdating: mutation.isPending,
    error: mutation.error || error,
    actionResult,
    resetActionResult,
    handleSaveAction,
  };
};

export { UASAction };
export default useUASButton;
