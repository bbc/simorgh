import { use } from 'react';
import useUASFetchSaveStatus from '#app/hooks/useUASFetchSaveStatus';
import { AccountContext } from '#app/contexts/AccountContext';
import isLocal from '#app/lib/utilities/isLocal';
import useToggle from '../useToggle';

/** A hook that fetches an article’s saved status and controls showing the save UAS button
 * based on feature toggles and sign in status,
 * with room to later expand for toggling the save state based on user actions. */

interface UseUASButtonProps {
  articleId: string;
  service: string;
}

interface UseUASButtonReturn {
  showButton: boolean;
  isSaved: boolean;
  isLoading: boolean;
  error: Error | null;
}

const useUASButton = ({
  service,
  articleId,
}: UseUASButtonProps): UseUASButtonReturn => {
  const { isSignedIn } = use(AccountContext);
  const { enabled: featureToggleOn = false, value: accountService = '' } =
    useToggle('uasPersonalization');

  const isUASEnabled =
    featureToggleOn &&
    (isLocal()
      ? accountService?.toString().split('|').includes(service)
      : true);

  const showButton = isUASEnabled && isSignedIn;

  const { isSaved, isLoading, error } = useUASFetchSaveStatus(
    showButton ? articleId : '',
  );
  return {
    showButton,
    isSaved,
    isLoading,
    error,
  };
};

export default useUASButton;
