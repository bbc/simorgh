import { use } from 'react';
import AccountPromotionalBanner from '#app/components/Account/AccountPromotionalBanner';
import useAccountPromoBannerEligibility from '#app/components/Account/AccountPromotionalBanner/useAccountPromoBannerEligibility';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import { MetadataTaggings } from '#app/models/types/metadata';
import { MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import {
  MAP_REGISTRATION_EXPERIMENT_NAME,
  MAP_REGISTRATION_EXPERIMENT_VARIANT,
} from './config';

const EDITORIAL_PICKS_BRAND =
  'http://www.bbc.co.uk/things/71cb5f8b-3151-4871-bb15-417304ae9293#id';

const VariantBanner = () => (
  <AccountPromotionalBanner
    experimentName={MAP_REGISTRATION_EXPERIMENT_NAME}
    experimentVariant={MAP_REGISTRATION_EXPERIMENT_VARIANT}
    title="बाद में पढ़ने के लिए सेव करने हेतु साइन इन करें"
    description="अपने मुफ़्त BBC अकाउंट से जब चाहें, वापस आकर पढ़ें।"
  />
);

const EligibleExperiment = () => {
  const variation = useOptimizelyVariation({
    experimentName: MAP_REGISTRATION_EXPERIMENT_NAME,
    experimentType: ExperimentType.SERVER_SIDE,
  });

  return variation === MAP_REGISTRATION_EXPERIMENT_VARIANT ? (
    <VariantBanner />
  ) : null;
};

const MapRegistrationBannerExperiment = ({
  taggings,
}: {
  taggings: MetadataTaggings;
}) => {
  const { service } = use(ServiceContext);
  const { pageType } = use(RequestContext);
  const isEligible = useAccountPromoBannerEligibility();
  const isEditorialPicks = taggings.some(
    ({ predicate, value }) =>
      predicate === 'http://www.bbc.co.uk/ontologies/bbc/brand' &&
      value === EDITORIAL_PICKS_BRAND,
  );

  if (
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
