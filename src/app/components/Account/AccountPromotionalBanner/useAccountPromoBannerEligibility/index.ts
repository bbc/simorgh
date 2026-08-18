import { use } from 'react';
import { AccountContext } from '#contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useToggle from '#app/hooks/useToggle';

type UseAccountPromoBannerEligibilityOptions = {
  excludeSignedInUsers?: boolean;
};

// Server-side-knowable eligibility for the account promotional banner. Excludes
// the client-only frequency-cap/dismissal checks, handled separately.
//
// `excludeSignedInUsers` lets the experiment wrapper activate Optimizely for
// signed-in users while still gating the banner/view tracking to signed-out users.
const useAccountPromoBannerEligibility = ({
  excludeSignedInUsers = true,
}: UseAccountPromoBannerEligibilityOptions = {}): boolean => {
  const { enabled: accountEnabled } = useToggle('account');
  const { isSignedIn, isIdctaAvailable, signInUrl, registerUrl } =
    use(AccountContext);
  const { translations } = use(ServiceContext);
  const accountPromoBannerTranslations = translations?.accountPromoBanner;
  const passesSignInCheck = !excludeSignedInUsers || !isSignedIn;

  return Boolean(
    accountEnabled &&
    passesSignInCheck &&
    isIdctaAvailable &&
    signInUrl &&
    registerUrl &&
    accountPromoBannerTranslations,
  );
};

export default useAccountPromoBannerEligibility;
