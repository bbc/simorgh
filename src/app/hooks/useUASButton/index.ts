import { use, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import useUASFetchSaveStatus from '#app/hooks/useUASFetchSaveStatus';
import { AccountContext } from '#app/contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import isLocal from '#app/lib/utilities/isLocal';
import uasApiRequest from '#app/lib/uasApi';
import {
  buildGlobalId,
  FAVOURITES_CONFIG,
  createFavouritesPayload,
  extractPromoImageFromArticleData,
  buildPromoImageUrl,
} from '#app/lib/uasApi/uasUtility';
import uasKeys from '#app/lib/uasApi/queryKeys';
import type { SaveArticleButtonProps } from '#app/components/SaveArticleButton';
import useToggle from '../useToggle';

/** A hook that fetches an article's saved status and controls showing the save UAS button
 * based on feature toggles and sign in status,
 * with room to later expand for toggling the save state based on user actions. */

enum UASAction {
  SAVE = 'save',
  REMOVE = 'remove',
}

interface UseUASButtonReturn {
  showButton: boolean;
  isSaved: boolean;
  isLoading: boolean;
  error: Error | null;
  handleSaveAction: (action: UASAction) => Promise<void>;
}

const useUASButton = ({
  articleId,
  articleTitle,
  articlePageData,
}: SaveArticleButtonProps): UseUASButtonReturn => {
  const { isSignedIn } = use(AccountContext);
  const { service } = use(ServiceContext);
  const { enabled: featureToggleOn = false, value: accountService = '' } =
    useToggle('uasPersonalization');
  const queryClient = useQueryClient();

  const isUASEnabled =
    featureToggleOn &&
    (isLocal()
      ? accountService?.toString().split('|').includes(service)
      : true);

  const showButton = isUASEnabled && isSignedIn;

  const { isSaved, isLoading, error } = useUASFetchSaveStatus(
    showButton ? articleId : '',
  );

  const promoImageObj = extractPromoImageFromArticleData(articlePageData);

  const mutation = useMutation({
    mutationFn: async (action: UASAction) => {
      if (action === UASAction.SAVE) {
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
      const newSavedStatus = action === UASAction.SAVE;
      queryClient.setQueryData(
        uasKeys.favouriteStatus(articleId),
        newSavedStatus,
      );
    },
  });

  const handleSaveAction = useCallback(
    (action: UASAction) => mutation.mutateAsync(action),
    [mutation],
  );

  return {
    showButton,
    isSaved,
    isLoading: isLoading || mutation.isPending,
    error: mutation.error || error,
    handleSaveAction,
  };
};

export { UASAction };
export default useUASButton;
