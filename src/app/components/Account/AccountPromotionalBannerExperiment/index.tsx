import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import useViewTracker from '#app/hooks/useViewTracker';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import AccountPromotionalBanner from '#app/components/Account/AccountPromotionalBanner';

// EXPERIMENT: newswb_ws_article_account_promo_banner
const ACCOUNT_PROMO_BANNER_EXPERIMENT_NAME =
  'newswb_ws_article_account_promo_banner';

const AccountPromotionalBannerControl = ({
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
  const experimentVariant = useOptimizelyVariation({
    experimentName: ACCOUNT_PROMO_BANNER_EXPERIMENT_NAME,
    experimentType: ExperimentType.SERVER_SIDE,
  });

  if (experimentVariant === 'control') {
    return (
      <AccountPromotionalBannerControl experimentVariant={experimentVariant} />
    );
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
