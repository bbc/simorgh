import { use, useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { AccountContext } from '#app/contexts/AccountContext';
import { RequestContext } from '#app/contexts/RequestContext';
import parseRoute from '#app/routes/utils/parseRoute';
import uasApiRequest from '#app/lib/uasApi';
import { buildGlobalId, FAVOURITES_CONFIG } from '#app/lib/uasApi/uasUtility';
import uasKeys from '#app/lib/uasApi/queryKeys';

interface DeleteSavedArticleIfDeletedClientProps {
  errorCode?: number;
}

/**
 * Client-side only component that removes deleted articles from UAS.
 * This component is only rendered on the client after hydration.
 * It uses React hooks safely because it never runs on the server.
 *
 * Note: Page type check is done in ErrorPage before rendering this component.
 * Only renders for article pages (ARTICLE_PAGE, MEDIA_ARTICLE_PAGE).
 */
const DeleteSavedArticleIfDeletedClient = ({
  errorCode,
}: DeleteSavedArticleIfDeletedClientProps) => {
  const { hashedUserId = '' } = use(AccountContext);
  const { pathname } = use(RequestContext);
  const queryClient = useQueryClient();
  const { assetId: articleId } = parseRoute(pathname);
  const hasAttemptedDeletion = useRef(false);

  useEffect(() => {
    if (errorCode !== 404 || !hashedUserId || !articleId) return;

    // Prevent duplicate API calls - only attempt deletion once
    if (hasAttemptedDeletion.current) return;
    hasAttemptedDeletion.current = true;

    const removeDeletedArticleFromUAS = async () => {
      try {
        const cachedSaveStatus = queryClient.getQueryData(
          uasKeys.favouriteStatus(hashedUserId, articleId),
        ) as { isSaved?: boolean } | undefined;

        const isSaved = cachedSaveStatus?.isSaved ?? true;
        if (!isSaved) return;

        const globalId = buildGlobalId(articleId);
        const response = await uasApiRequest(
          'DELETE',
          FAVOURITES_CONFIG.activityType,
          {
            globalId,
            isRefreshAvailable: true,
          },
        );

        if (!response.ok) return;

        queryClient.setQueryData(
          uasKeys.favouriteStatus(hashedUserId, articleId),
          { isSaved: false },
        );

        queryClient.invalidateQueries({
          queryKey: uasKeys.favouritesList(hashedUserId),
        });
      } catch {
        // Silently fail - don't disrupt user experience
      }
    };

    removeDeletedArticleFromUAS();
  }, [queryClient, errorCode, hashedUserId, articleId, pathname]);

  return null;
};

export default DeleteSavedArticleIfDeletedClient;
