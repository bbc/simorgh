import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import AccountPromotionalBanner from '#app/components/Account/AccountPromotionalBanner';

// EXPERIMENT: newswb_ws_homepage_account_promo_banner_copy
const HOMEPAGE_ACCOUNT_PROMO_BANNER_EXPERIMENT_NAME =
  'newswb_ws_homepage_account_promo_banner_copy';

type VariantCopy = {
  title: string;
  description: string;
};

// Hindi-only copy variants for the homepage sign-in banner experiment.
// `control` intentionally has no override so the existing translated copy is used.
const experimentVariantCopy: Record<string, VariantCopy> = {
  variant_1: {
    title: 'इस आर्टिकल को बाद के लिए सेव कीजिए',
    description:
      '‘माई न्यूज़’ में इन्हें पाने के लिए अपना फ्री बीबीसी अकाउंट बनाइए या साइन इन करिए',
  },
  variant_2: {
    title: 'उन स्टोरीज़ को सेव कीजिए, जिन्हें आप पढ़ना चाहते हैं',
    description:
      'बीबीसी का अपना फ्री अकाउंट इस्तेमाल करने के लिए उन्हें ‘माई न्यूज़’ में सेव कीजिए',
  },
  variant_3: {
    title: 'बीबीसी न्यूज़ हिन्दी के आर्टिकल्स को एक जगह सेव कीजिए',
    description:
      '‘माई न्यूज़’ को इस्तेमाल करने के लिए फ्री में साइन इन या रजिस्टर करें',
  },
};

const AccountPromotionalBannerHomePageExperiment = () => {
  const experimentVariant = useOptimizelyVariation({
    experimentName: HOMEPAGE_ACCOUNT_PROMO_BANNER_EXPERIMENT_NAME,
    experimentType: ExperimentType.SERVER_SIDE,
  });

  if (typeof experimentVariant !== 'string') {
    return <AccountPromotionalBanner />;
  }

  const variantCopy = experimentVariantCopy[experimentVariant];

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

export default AccountPromotionalBannerHomePageExperiment;
