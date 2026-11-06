import { use } from 'react';
import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import AccountPromotionalBanner from '#app/components/Account/AccountPromotionalBanner';
import useAccountPromoBannerEligibility from '#app/components/Account/AccountPromotionalBanner/useAccountPromoBannerEligibility';
import { ServiceContext } from '#app/contexts/ServiceContext';

const HOMEPAGE_ACCOUNT_PROMO_BANNER_EXPERIMENT_NAME =
  'newswb_ws_homepage_account_promo_banner_copy_rerun';
const EXPERIMENT_SERVICE = 'hindi';

const experimentVariantCopy = {
  variant_3: {
    title: 'बीबीसी न्यूज़ हिन्दी के आर्टिकल्स को एक जगह सेव कीजिए',
    description:
      '‘माई न्यूज़’ को इस्तेमाल करने के लिए फ्री में साइन इन या रजिस्टर करें',
  },
} as const;

const EligibleAccountPromotionalBannerHomePageExperiment = () => {
  const experimentVariant = useOptimizelyVariation({
    experimentName: HOMEPAGE_ACCOUNT_PROMO_BANNER_EXPERIMENT_NAME,
    experimentType: ExperimentType.SERVER_SIDE,
  });

  if (typeof experimentVariant !== 'string') {
    return <AccountPromotionalBanner />;
  }

  const normalizedExperimentVariant = experimentVariant.replace('-', '_');

  const variantCopy =
    experimentVariantCopy[
      normalizedExperimentVariant as keyof typeof experimentVariantCopy
    ];

  return (
    <AccountPromotionalBanner
      experimentName={HOMEPAGE_ACCOUNT_PROMO_BANNER_EXPERIMENT_NAME}
      experimentVariant={experimentVariant}
      {...(variantCopy && {
        title: variantCopy.title,
        description: variantCopy.description,
      })}
    />
  );
};

const AccountPromotionalBannerHomePageExperiment = () => {
  const { service } = use(ServiceContext);
  const isEligible = useAccountPromoBannerEligibility();

  if (!isEligible || service !== EXPERIMENT_SERVICE) {
    return <AccountPromotionalBanner />;
  }

  return <EligibleAccountPromotionalBannerHomePageExperiment />;
};

export default AccountPromotionalBannerHomePageExperiment;
