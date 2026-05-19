import { use } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUASFetchSaveStatus from '#app/hooks/useUASFetchSaveStatus';
import { ServiceContext } from '#app/contexts/ServiceContext';
import uasApiRequest from '#app/lib/uasApi';
import {
  buildGlobalId,
  FAVOURITES_CONFIG,
  createFavouritesPayload,
  extractPromoImageFromArticleData,
  buildPromoImageUrl,
} from '#app/lib/uasApi/uasUtility';
import { Article } from '#app/models/types/optimo';
import uasKeys from '#app/lib/uasApi/queryKeys';
import { AccountContext } from '#app/contexts/AccountContext';

enum UASAction {
  SAVE = 'save',
  REMOVE = 'remove',
}

interface UseUASButtonReturn {
  isSaved: boolean;
  isLoading: boolean;
  isMutating: boolean;
  error: Error | null;
  handleSaveAction: (action: UASAction) => void;
}
export interface UseUASButtonProps {
  articleId: string;
  articleTitle: string;
  articlePageData?: Article;
}

// NOTE: Using this hook anywhere in the app will eagerly pull TanStack Query into the bundle.
// All TanStack-related code must live exclusively inside the lazy boundary.
const useUASButton = ({
  articleId,
  articleTitle,
  articlePageData,
}: UseUASButtonProps): UseUASButtonReturn => {
  const { service } = use(ServiceContext);
  const { hashedUserId = '' } = use(AccountContext);
  const queryClient = useQueryClient();
  const { isSaved, isLoading, error } = useUASFetchSaveStatus(articleId);

  const mutation = useMutation({
    mutationFn: async (action: UASAction) => {
      if (action === UASAction.SAVE) {
        const promoImageObj = extractPromoImageFromArticleData(articlePageData);
        const promoImageBuild = buildPromoImageUrl(promoImageObj);
        const body = createFavouritesPayload({
          articleId,
          service,
          articleTitle,
          promoImage: promoImageBuild,
          promoImageAltText: promoImageObj?.altText || '',
          locatorUrl: articlePageData?.metadata?.locators?.canonicalUrl || '',
        });
        await uasApiRequest('POST', FAVOURITES_CONFIG.activityType, { body });
      } else {
        const globalId = buildGlobalId(articleId);
        await uasApiRequest('DELETE', FAVOURITES_CONFIG.activityType, {
          globalId,
        });
      }
    },
    onSuccess: (_, action) => {
      queryClient.setQueryData(
        uasKeys.favouriteStatus(hashedUserId, articleId),
        action === UASAction.SAVE,
      );
    },
  });

  return {
    isSaved,
    isLoading,
    isMutating: mutation.isPending,
    error: mutation.error || error,
    handleSaveAction: mutation.mutate,
  };
};

export { UASAction };
export default useUASButton;
