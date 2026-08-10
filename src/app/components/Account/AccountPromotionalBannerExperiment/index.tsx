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
  // useOptimizelyVariation both resolves the variation and activates the
  // experiment. Activation therefore happens regardless of whether the banner is
  // dismissed, but view events are still suppressed for dismissed banners by the
  // shared inline-script + CSS visibility gate.
  const experimentVariant = useOptimizelyVariation({
    experimentName: ACCOUNT_PROMO_BANNER_EXPERIMENT_NAME,
    experimentType: ExperimentType.SERVER_SIDE,
  });

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
  // Server-knowable eligibility gate: ineligible users render nothing and are
  // never activated. Client-side visibility (dismissal / frequency cap) is handled
  // per arm below.
  const isEligible = useAccountPromoBannerEligibility();

  if (!isEligible) {
    return null;
  }

  return <EligibleAccountPromotionalBannerExperiment />;
};

export default AccountPromotionalBannerExperiment;
