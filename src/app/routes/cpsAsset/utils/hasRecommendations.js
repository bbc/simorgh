import path from 'ramda/src/path';
import getConfig from '#routes/utils/getConfig';

const hasRecommendations = async (service, variant, pageData) => {
  const config = await getConfig(service, variant);

  const serviceHasRecommendations = path(
    ['recommendations', 'hasStoryRecommendations'],
    config,
  );

  const isAdvertisingCPS = path(
    ['metadata', 'options', 'allowAdvertising'],
    pageData,
  );

  const isAdvertisingOptimo = path(
    ['data', 'article', 'metadata', 'allowAdvertising'],
    pageData,
  );

  const advertisingAllowed = isAdvertisingCPS || isAdvertisingOptimo;
  return serviceHasRecommendations && advertisingAllowed;
};

export default hasRecommendations;
