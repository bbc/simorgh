import { use } from 'react';
import AccountPromotionalBanner from '#app/components/Account/AccountPromotionalBanner';
import useAccountPromoBannerEligibility from '#app/components/Account/AccountPromotionalBanner/useAccountPromoBannerEligibility';
import Experiment, { ExperimentType } from '#app/components/Experiment';
import { ServiceContext } from '#app/contexts/ServiceContext';

export const EXPERIMENT_NAME = 'newswb_ws_hindi_editorial_picks_follow_promo';
export const EDITORIAL_PICKS_TOPIC_ID = 'crvgyj0g9d5lt';
export const VARIANT_KEY = 'variant';

const BANNER_COPY = {
  title: 'एडिटोरियल पिक्स को फ़ॉलो करें',
  description: "इसे 'मेरी ख़बरें' में फिर से पाएँ",
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

  return (
    <Experiment name={EXPERIMENT_NAME} type={ExperimentType.SERVER_SIDE}>
      {variation =>
        variation === VARIANT_KEY && (
          <AccountPromotionalBanner
            title={BANNER_COPY.title}
            description={BANNER_COPY.description}
          />
        )
      }
    </Experiment>
  );
};

export default EditorialPicksPromoExperiment;
