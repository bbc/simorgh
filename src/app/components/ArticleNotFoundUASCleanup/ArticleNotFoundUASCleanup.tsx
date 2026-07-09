import { use, useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { AccountContext } from '#app/contexts/AccountContext';
import { RequestContext } from '#app/contexts/RequestContext';
import parseRoute from '#app/routes/utils/parseRoute';
import uasApiRequest from '#app/lib/uasApi';
import {
  buildGlobalId,
  FAVOURITES_CONFIG,
  SavedArticle,
} from '#app/lib/uasApi/uasUtility';
import uasKeys from '#app/lib/uasApi/queryKeys';
import { UAS_API_ERROR } from '#app/lib/logger.const';
import nodeLogger from '#lib/logger.node';

const logger = nodeLogger(__filename);

/**
 * Client-side only component that removes a 404'd article from UAS favourites.
 * Rendered only after hydration (ssr: false in index.tsx) to avoid SSR errors
 * from useQueryClient. Mount conditions (personalization, pageType, errorCode)
 * are checked in ErrorPage before rendering this component.
 */
const ArticleNotFoundUASCleanup = () => {
  const { hashedUserId = '', isRefreshAvailable } = use(AccountContext);
  const { pathname } = use(RequestContext);
  const queryClient = useQueryClient();
  const { assetId: articleId } = parseRoute(pathname);
  const hasAttemptedDeletion = useRef(false);

  useEffect(() => {
    if (!hashedUserId || !articleId || hasAttemptedDeletion.current) return;

    const removeDeletedArticleFromUAS = async () => {
      try {
        hasAttemptedDeletion.current = true;

        const cachedPages = queryClient.getQueriesData<{
          savedArticles: SavedArticle[];
        }>({ queryKey: uasKeys.favouritesList(hashedUserId) });

        const isInFavouritesList = cachedPages.some(([, data]) =>
          data?.savedArticles?.some(article => article.id === articleId),
        );

        if (!isInFavouritesList) return;

        const globalId = buildGlobalId(articleId);
        await uasApiRequest('DELETE', FAVOURITES_CONFIG.activityType, {
          globalId,
          isRefreshAvailable,
        });

        queryClient.removeQueries({
          queryKey: uasKeys.favouritesList(hashedUserId),
        });
      } catch {
        logger.error(UAS_API_ERROR, {
          error: 'Failed to remove deleted article from UAS favourites',
        });
      }
    };

    removeDeletedArticleFromUAS();
  }, [queryClient, hashedUserId, articleId, isRefreshAvailable]);
  return null;
};

export default ArticleNotFoundUASCleanup;
