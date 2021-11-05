import path from 'ramda/src/path';
import getConfig from '#app/routes/utils/getConfig';

const hasRecommendations = async (service, variant, pageData) => {
  const config = await getConfig(service, variant);

  const serviceHasRecommendations = path(
    ['recommendations', 'hasStoryRecommendations'],
    config,
  );

  const assetAllowsAdvertising = path(
    ['metadata', 'options', 'allowAdvertising'],
    pageData,
  );

  return serviceHasRecommendations && assetAllowsAdvertising;
};

export default hasRecommendations;
