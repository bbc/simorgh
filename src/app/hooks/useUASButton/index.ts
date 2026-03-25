import useFetchSaveStatus from '#app/hooks/useUASFetchSaveStatus';
import isLocal from '#app/lib/utilities/isLocal';
import useToggle from '../useToggle';

/** A hook that fetches an article’s saved status and controls showing the save UAS button
 * based on feature toggles and sign in status,
 * with room to later expand for toggling the save state based on user actions. */

interface UseUASButtonProps {
  isSignedIn: boolean;
  articleId: string;
  service: string;
}

interface UseUASButtonReturn {
  showButton: boolean;
  isSaved: boolean;
  loading: boolean;
  error: Error | null;
}

const useUASButton = ({
  service,
  isSignedIn,
  articleId,
}: UseUASButtonProps): UseUASButtonReturn => {
  const {
    enabled: featureToggleOn = false,
    value: accountService = '',
  } = useToggle('uasEnable');

  const isUASEnabled =
    featureToggleOn &&
    (isLocal()
      ? accountService?.toString().split('|').includes(service)
      : true);

  const showButton = isUASEnabled && isSignedIn;

  const { isSaved, loading, error } = useFetchSaveStatus(
    showButton ? articleId : '',
  );
  return {
    showButton,
    isSaved,
    loading,
    error,
  };
};

export default useUASButton;
