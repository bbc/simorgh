import { use, useCallback, useState } from 'react';
import useUASFetchSaveStatus from '#app/hooks/useUASFetchSaveStatus';
import { AccountContext } from '#app/contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import isLocal from '#app/lib/utilities/isLocal';
import uasApiRequest from '#app/lib/uasApi';
import {
  buildGlobalId,
  FAVOURITES_CONFIG,
  createFavouritesPayload,
} from '#app/lib/uasApi/uasUtility';
import buildIChefURL from '#app/lib/utilities/ichefURL';
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
  promoImageObj,
}: SaveArticleButtonProps): UseUASButtonReturn => {
  const { isSignedIn } = use(AccountContext);
  const { service } = use(ServiceContext);
  const { enabled: featureToggleOn = false, value: accountService = '' } =
    useToggle('uasPersonalization');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<Error | null>(null);

  const isUASEnabled =
    featureToggleOn &&
    (isLocal()
      ? accountService?.toString().split('|').includes(service)
      : true);

  const showButton = isUASEnabled && isSignedIn;

  const { isSaved, isLoading, error, setIsSaved } = useUASFetchSaveStatus(
    showButton ? articleId : '',
  );

  const handleSaveAction = useCallback(
    async (action: UASAction) => {
      if (isSaving) return;

      setIsSaving(true);
      try {
        setSaveError(null);

        if (action === UASAction.SAVE) {
          const promoImageBuild =
            promoImageObj?.promoImageRawBlock?.model?.locator &&
            promoImageObj?.promoImageRawBlock?.model?.originCode
              ? buildIChefURL({
                  originCode: promoImageObj.promoImageRawBlock.model.originCode,
                  locator: promoImageObj.promoImageRawBlock.model.locator,
                  resolution: 320,
                })
              : '';
          const body = createFavouritesPayload({
            articleId,
            service,
            articleTitle,
            promoImage: promoImageBuild,
            promoImageAltText: promoImageObj?.altText || '',
          });
          await uasApiRequest('POST', FAVOURITES_CONFIG.activityType, { body });
          setIsSaved(true);
        } else {
          const globalId = buildGlobalId(articleId);
          await uasApiRequest('DELETE', FAVOURITES_CONFIG.activityType, {
            globalId,
          });
          setIsSaved(false);
        }
      } catch (err) {
        const saveErr = err instanceof Error ? err : new Error(String(err));
        setSaveError(saveErr);
      } finally {
        setIsSaving(false);
      }
    },
    [articleId, service, articleTitle, promoImageObj, isSaving, setIsSaved],
  );

  return {
    showButton,
    isSaved,
    isLoading: isLoading || isSaving,
    error: saveError || error,
    handleSaveAction,
  };
};

export { UASAction };
export default useUASButton;
