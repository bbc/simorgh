import { use } from 'react';
import { AccountContext } from '#contexts/AccountContext';
import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import useViewTracker from '#app/hooks/useViewTracker';
import AccountPromotionalBanner from '#app/components/Account/AccountPromotionalBanner';
import useAccountPromoBannerEligibility from '#app/components/Account/AccountPromotionalBanner/useAccountPromoBannerEligibility';
import useIsAccountPromoBannerVisible from '#app/components/Account/AccountPromotionalBanner/useIsAccountPromoBannerVisible';

// EXPERIMENT: newswb_ws_article_account_promo_banner
const ACCOUNT_PROMO_BANNER_EXPERIMENT_NAME =
  'newswb_ws_article_account_promo_banner';

// Only fires a control view once the client-side check confirms the banner would
// actually be shown, mirroring the "on" arm's dismissal / frequency-cap
// suppression so both arms are counted under the same conditions.
const AccountPromotionalBannerControlTracker = ({
  experimentVariant,
}: {
  experimentVariant: string;
}) => {
  const isBannerVisible = useIsAccountPromoBannerVisible();
  const viewTracker = useViewTracker({
    componentName: 'account-promotional-banner',
    experimentName: ACCOUNT_PROMO_BANNER_EXPERIMENT_NAME,
    experimentVariant,
    sendOptimizelyEvents: true,
  });

  if (!isBannerVisible) return null;

  // Tracked element for the control view: useViewTracker's IntersectionObserver
  // needs a block element with a non-zero box
  return <div {...viewTracker} aria-hidden="true" style={{ height: '1px' }} />;
};

const EligibleAccountPromotionalBannerExperiment = () => {
  const { isSignedIn } = use(AccountContext);

  // Activates regardless of sign-in status so signed-in page views are tracked;
  // signed-in users are excluded below from the banner/view tracking.
  const experimentVariant = useOptimizelyVariation({
    experimentName: ACCOUNT_PROMO_BANNER_EXPERIMENT_NAME,
    experimentType: ExperimentType.SERVER_SIDE,
  });

  if (isSignedIn) {
    return null;
  }

  if (experimentVariant === 'on') {
    return (
      <AccountPromotionalBanner
        experimentName={ACCOUNT_PROMO_BANNER_EXPERIMENT_NAME}
        experimentVariant={experimentVariant}
      />
    );
  }

  if (experimentVariant === 'control') {
    return (
      <AccountPromotionalBannerControlTracker
        experimentVariant={experimentVariant}
      />
    );
  }

  return null;
};

const AccountPromotionalBannerExperiment = () => {
  const isEligible = useAccountPromoBannerEligibility({
    excludeSignedInUsers: false,
  });

  if (!isEligible) {
    return null;
  }

  return <EligibleAccountPromotionalBannerExperiment />;
};

export default AccountPromotionalBannerExperiment;
