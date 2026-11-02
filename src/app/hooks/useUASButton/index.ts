import { use, useEffect, useRef, useState } from 'react';
import {
  onlineManager,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import useUASFetchSaveStatus from '#app/hooks/useUASFetchSaveStatus';
import useUASMetadataSync from '#app/hooks/useUASMetadataSync';
import useErrorTracking from '#app/hooks/useErrorTracking';
import useTrackErrorEffect from '#app/hooks/useTrackErrorEffect';
import {
  ERROR_TRACKING_FEATURES,
  UAS_ERROR_ACTIONS,
} from '#app/hooks/useErrorTracking/errorTracking.const';
import { ServiceContext } from '#app/contexts/ServiceContext';
import uasApiRequest from '#app/lib/uasApi';
import { buildGlobalId, FAVOURITES_CONFIG } from '#app/lib/uasApi/uasUtility';
import type { SaveArticlePageData } from '#app/lib/utilities/extractSaveArticleProps';
import uasKeys from '#app/lib/uasApi/queryKeys';
import { AccountContext } from '#app/contexts/AccountContext';
import upsertArticleData from '#app/lib/uasApi/upsertArticleData';
import { UASAction } from '#app/models/types/action';

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

/**
 * Combines the current save-status fetch, user-initiated save/remove mutations
 * and the background metadata sync behind a single button hook.
 *
 * actionResult is only populated for user-initiated actions so the UI can
 * surface additional information (e.g. a tooltip);
 *
 * NOTE: Using this hook anywhere in the app will eagerly pull TanStack Query
 * into the bundle. All TanStack-related code must live exclusively inside the
 * lazy boundary.
 */
const useUASButton = ({
  articleId,
  saveArticlePageData,
}: UseUASButtonProps): UseUASButtonReturn => {
  const { service } = use(ServiceContext);
  const { hashedUserId = '', isRefreshAvailable } = use(AccountContext);
  const queryClient = useQueryClient();
  const trackError = useErrorTracking();
  const {
    isSaved,
    isLoading,
    error,
    metadata: savedMetadata,
  } = useUASFetchSaveStatus(articleId);

  useTrackErrorEffect({
    error,
    feature: ERROR_TRACKING_FEATURES.SAVE_ARTICLE_UAS,
    action: UAS_ERROR_ACTIONS.FETCH_STATUS,
  });

  // Only set by handleSaveAction, never by the background metadata resync.
  const [actionResult, setActionResult] = useState<UASActionResult>(null);

  // Holds the result produced by an offline click so it can be dismissed
  // automatically once connectivity is restored.
  const offlineActionResultRef = useRef<UASActionResult>(null);
  const isRecoveringRef = useRef(false);

  useEffect(
    () =>
      onlineManager.subscribe(async isOnline => {
        const offlineActionResult = offlineActionResultRef.current;

        if (!isOnline || !offlineActionResult || isRecoveringRef.current) {
          return;
        }

        isRecoveringRef.current = true;

        try {
          // Refresh the button state before dismissing, so the tooltip is only
          // removed once the UI reflects the current saved status.
          await queryClient.invalidateQueries(
            { queryKey: uasKeys.favouriteStatus(hashedUserId, articleId) },
            { throwOnError: true },
          );
        } catch {
          // The refresh failed, so the displayed state is still unverified.
          // Keep the tooltip and the stored result so a later reconnect retries.
          return;
        } finally {
          isRecoveringRef.current = false;
        }

        // A newer action may have replaced the result while the refresh ran.
        if (offlineActionResultRef.current !== offlineActionResult) return;

        offlineActionResultRef.current = null;

        setActionResult(current =>
          current === offlineActionResult ? null : current,
        );
      }),
    [queryClient, hashedUserId, articleId],
  );

  const mutation = useMutation({
    // A status refetch (e.g. the one triggered when connectivity returns) can
    // resolve after the mutation has written the new status, overwriting it
    // with a stale value. Cancelling it first makes the mutation authoritative.
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: uasKeys.favouriteStatus(hashedUserId, articleId),
      });
    },
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

  const handleMetadataOutOfDate = () =>
    mutation.mutate(UASAction.SAVE, {
      onError: mutationError =>
        trackError({
          error: mutationError,
          feature: ERROR_TRACKING_FEATURES.SAVE_ARTICLE_UAS,
          action: UAS_ERROR_ACTIONS.METADATA_SYNC,
        }),
    });

  useUASMetadataSync({
    saveArticlePageData,
    articleId,
    service,
    isSaved,
    savedArticleMetadata: savedMetadata,
    onMetadataOutOfDate: handleMetadataOutOfDate,
  });

  const handleSaveAction = (action: UASAction) => {
    if (!onlineManager.isOnline()) {
      const offlineActionResult: UASActionResult = {
        status: 'error',
        action,
      };
      offlineActionResultRef.current = offlineActionResult;
      setActionResult(offlineActionResult);
      return undefined;
    }

    offlineActionResultRef.current = null;

    return mutation.mutate(action, {
      onSuccess: () => setActionResult({ status: 'success', action }),
      onError: mutationError => {
        setActionResult({ status: 'error', action });
        trackError({
          error: mutationError,
          feature: ERROR_TRACKING_FEATURES.SAVE_ARTICLE_UAS,
          action,
        });
      },
    });
  };

  const resetActionResult = () => {
    offlineActionResultRef.current = null;
    setActionResult(null);
    mutation.reset();
  };

  return {
    isSaved,
    isLoading,
    isUpdating: mutation.isPending && !mutation.isPaused,
    error: mutation.error || error,
    actionResult,
    resetActionResult,
    handleSaveAction,
  };
};

export { UASAction };
export default useUASButton;
