import { use, useCallback, useState } from 'react';
import useUASFetchSaveStatus from '#app/hooks/useUASFetchSaveStatus';
import { AccountContext } from '#app/contexts/AccountContext';
import isLocal from '#app/lib/utilities/isLocal';
import uasApiRequest from '#app/lib/uasApi';
import {
  FAVOURITES_CONFIG,
  createFavouritesPayload,
} from '#app/lib/uasApi/uasUtility';
import useToggle from '../useToggle';

interface UseUASButtonProps {
  articleId: string;
  service: string;
  title: string;
}

interface UseUASButtonReturn {
  showButton: boolean;
  isSaved: boolean;
  isLoading: boolean;
  error: Error | null;
  handleSaveArticle: () => Promise<void>;
}

const useUASButton = ({
  service,
  articleId,
  title,
}: UseUASButtonProps): UseUASButtonReturn => {
  const { isSignedIn } = use(AccountContext);
  const { enabled: featureToggleOn = false, value: accountService = '' } =
    useToggle('uasPersonalization');
  const [isSaving, setIsSaving] = useState(false);

  const isUASEnabled =
    featureToggleOn &&
    (isLocal()
      ? accountService?.toString().split('|').includes(service)
      : true);

  const showButton = isUASEnabled && isSignedIn;

  const { isSaved, isLoading, error, setIsSaved } = useUASFetchSaveStatus(
    showButton ? articleId : '',
  );

  const handleSaveArticle = useCallback(async () => {
    if (isSaving || isSaved) return;

    setIsSaving(true);
    try {
      const body = createFavouritesPayload({ articleId, service, title });
      await uasApiRequest('POST', FAVOURITES_CONFIG.activityType, { body });
      setIsSaved(true);
    } finally {
      setIsSaving(false);
    }
  }, [articleId, service, title, isSaving, isSaved, setIsSaved]);

  return {
    showButton,
    isSaved,
    isLoading: isLoading || isSaving,
    error,
    handleSaveArticle,
  };
};

export default useUASButton;
