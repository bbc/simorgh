import { use } from 'react';
import { AccountContext } from '#contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useToggle from '#app/hooks/useToggle';

// Server-side-knowable eligibility for the account promotional banner. Shared by
// the experiment wrapper (to gate both the control and "on" arms before either
// view event can fire) and the banner itself. The localStorage frequency-cap and
// in-session dismissal checks are deliberately excluded here: they are client
// only and handled separately via the inline script and component state.
const useAccountPromoBannerEligibility = (): boolean => {
  const { enabled: accountEnabled } = useToggle('account');
  const { isSignedIn, isIdctaAvailable, signInUrl, registerUrl } =
    use(AccountContext);
  const { translations } = use(ServiceContext);
  const accountPromoBannerTranslations = translations?.accountPromoBanner;

  return Boolean(
    accountEnabled &&
    !isSignedIn &&
    isIdctaAvailable &&
    signInUrl &&
    registerUrl &&
    accountPromoBannerTranslations,
  );
};

export default useAccountPromoBannerEligibility;
