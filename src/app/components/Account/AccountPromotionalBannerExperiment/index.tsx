import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import useViewTracker from '#app/hooks/useViewTracker';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import AccountPromotionalBanner from '#app/components/Account/AccountPromotionalBanner';
import useAccountPromoBannerEligibility from '#app/components/Account/AccountPromotionalBanner/useAccountPromoBannerEligibility';
import useIsAccountPromoBannerVisible from '#app/components/Account/AccountPromotionalBanner/useIsAccountPromoBannerVisible';

// EXPERIMENT: newswb_ws_article_account_promo_banner
const ACCOUNT_PROMO_BANNER_EXPERIMENT_NAME =
  'newswb_ws_article_account_promo_banner';

// The view tracker uses alwaysInView, whose timer starts on mount regardless of
// the rendered element. Gating the control's view event on banner visibility
// therefore requires conditionally mounting this component
const AccountPromotionalBannerControlTracker = ({
  experimentVariant,
}: {
  experimentVariant: string;
}) => {
  const viewTracker = useViewTracker({
    componentName: 'account-promotional-banner',
    experimentName: ACCOUNT_PROMO_BANNER_EXPERIMENT_NAME,
    experimentVariant,
    sendOptimizelyEvents: true,
    alwaysInView: true,
  });

  return <VisuallyHiddenText {...viewTracker} />;
};

// Activates the server-side experiment (via useOptimizelyVariation) and renders
// the resulting arm. Mounted only when the user is eligible, so ineligible users
// are never bucketed into the experiment.
const EligibleAccountPromotionalBannerExperiment = () => {
  // Gate the view event on banner visibility so both arms behave under the same
  // circumstances: control fires only when the banner would show, mirroring the
  // "on" arm's own dismissal / frequency-cap suppression.
  const isBannerVisible = useIsAccountPromoBannerVisible();
  const experimentVariant = useOptimizelyVariation({
    experimentName: ACCOUNT_PROMO_BANNER_EXPERIMENT_NAME,
    experimentType: ExperimentType.SERVER_SIDE,
  });

  if (experimentVariant === 'control') {
    return isBannerVisible ? (
      <AccountPromotionalBannerControlTracker
        experimentVariant={experimentVariant}
      />
    ) : null;
  }

  if (experimentVariant === 'on') {
    return (
      <AccountPromotionalBanner
        experimentName={ACCOUNT_PROMO_BANNER_EXPERIMENT_NAME}
        experimentVariant={experimentVariant}
      />
    );
  }

  return null;
};

const AccountPromotionalBannerExperiment = () => {
  const isEligible = useAccountPromoBannerEligibility();

  // Gate activation on eligibility. useOptimizelyVariation activates the
  // experiment as a side effect, so it must not run for ineligible users.
  if (!isEligible) {
    return null;
  }

  return <EligibleAccountPromotionalBannerExperiment />;
};

export default AccountPromotionalBannerExperiment;
