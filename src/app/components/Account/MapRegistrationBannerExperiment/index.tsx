import { use, useEffect } from 'react';
import AccountPromotionalBanner from '#app/components/Account/AccountPromotionalBanner';
import useAccountPromoBannerEligibility from '#app/components/Account/AccountPromotionalBanner/useAccountPromoBannerEligibility';
import {
  ACCOUNT_BANNER_DISMISS_KEY,
  ACCOUNT_BANNER_LAST_DISMISS_KEY,
  DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS,
  isAccountPromoBannerVisible,
} from '#app/components/Account/AccountPromotionalBanner/utilities';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import useHydrationDetection from '#app/hooks/useHydrationDetection';
import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import { MetadataTaggings } from '#app/models/types/metadata';
import { MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';

export const EXPERIMENT_NAME = 'newswb_ws_hindi_map_save_later_promo';
const EDITORIAL_PICKS_BRAND =
  'http://www.bbc.co.uk/things/71cb5f8b-3151-4871-bb15-417304ae9293#id';

const VariantBanner = () => {
  useEffect(() => {
    const showBanner = (
      dismissalCount: string | null,
      lastDismissed: string | null,
    ) => {
      document.documentElement.classList.toggle(
        DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS,
        isAccountPromoBannerVisible({
          cookies: document.cookie,
          dismissalCount,
          lastDismissed,
        }),
      );
    };
    try {
      showBanner(
        localStorage.getItem(ACCOUNT_BANNER_DISMISS_KEY),
        localStorage.getItem(ACCOUNT_BANNER_LAST_DISMISS_KEY),
      );
    } catch {
      showBanner(null, null);
    }
  }, []);

  return (
    <AccountPromotionalBanner
      experimentName={EXPERIMENT_NAME}
      experimentVariant={EXPERIMENT_NAME}
      title="बाद में पढ़ने के लिए सेव करने हेतु साइन इन करें"
      description="अपने मुफ़्त BBC अकाउंट से जब चाहें, वापस आकर पढ़ें।"
    />
  );
};

const EligibleExperiment = () => {
  const variation = useOptimizelyVariation({
    experimentName: EXPERIMENT_NAME,
    experimentType: ExperimentType.CLIENT_SIDE,
  });

  return variation === EXPERIMENT_NAME ? <VariantBanner /> : null;
};

const MapRegistrationBannerExperiment = ({
  taggings,
}: {
  taggings: MetadataTaggings;
}) => {
  const { service } = use(ServiceContext);
  const { pageType } = use(RequestContext);
  const isHydrated = useHydrationDetection();
  const isEligible = useAccountPromoBannerEligibility();
  const isEditorialPicks = taggings.some(
    ({ predicate, value }) =>
      predicate === 'http://www.bbc.co.uk/ontologies/bbc/brand' &&
      value === EDITORIAL_PICKS_BRAND,
  );

  if (
    !isHydrated ||
    !isEligible ||
    service !== 'hindi' ||
    pageType !== MEDIA_ARTICLE_PAGE ||
    !isEditorialPicks
  ) {
    return null;
  }

  return <EligibleExperiment />;
};

export default MapRegistrationBannerExperiment;
