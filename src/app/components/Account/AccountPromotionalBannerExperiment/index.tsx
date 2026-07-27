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
// therefore requires conditionally mounting this component (a hook cannot be
// called conditionally), so that it only fires for users who would actually be
// shown the banner (not dismissed / frequency-capped), mirroring the "on" arm.
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

const AccountPromotionalBannerExperiment = () => {
  const isEligible = useAccountPromoBannerEligibility();
  const isBannerVisible = useIsAccountPromoBannerVisible();
  const experimentVariant = useOptimizelyVariation({
    experimentName: ACCOUNT_PROMO_BANNER_EXPERIMENT_NAME,
    experimentType: ExperimentType.SERVER_SIDE,
  });

  if (!isEligible) {
    return null;
  }

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

export default AccountPromotionalBannerExperiment;
