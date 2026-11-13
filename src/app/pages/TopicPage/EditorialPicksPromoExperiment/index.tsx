import { use } from 'react';
import AccountPromotionalBanner from '#app/components/Account/AccountPromotionalBanner';
import useAccountPromoBannerEligibility from '#app/components/Account/AccountPromotionalBanner/useAccountPromoBannerEligibility';
import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import { ServiceContext } from '#app/contexts/ServiceContext';

export const EXPERIMENT_NAME = 'newswb_ws_hindi_editorial_picks_follow_promo';
export const EDITORIAL_PICKS_TOPIC_ID = 'crvgyj0g9d5lt';
export const VARIANT_KEY = 'variant';

const BANNER_COPY = {
  title: 'एडिटोरियल पिक्स को फ़ॉलो करें',
  description: "इसे 'मेरी ख़बरें' में फिर से पाएँ",
};

const BannerExperiment = () => {
  const variation = useOptimizelyVariation({
    experimentName: EXPERIMENT_NAME,
    experimentType: ExperimentType.SERVER_SIDE,
  });

  if (variation !== VARIANT_KEY) return null;

  return (
    <AccountPromotionalBanner
      experimentName={EXPERIMENT_NAME}
      experimentVariant={variation}
      title={BANNER_COPY.title}
      description={BANNER_COPY.description}
    />
  );
};

const EditorialPicksPromoExperiment = ({ topicId }: { topicId?: string }) => {
  const { service } = use(ServiceContext);
  const isEligible = useAccountPromoBannerEligibility();

  if (
    service !== 'hindi' ||
    topicId !== EDITORIAL_PICKS_TOPIC_ID ||
    !isEligible
  ) {
    return null;
  }

  return <BannerExperiment />;
};

export default EditorialPicksPromoExperiment;
