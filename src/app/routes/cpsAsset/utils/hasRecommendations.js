import path from 'ramda/src/path';
import getConfig from '#app/routes/utils/getConfig';
import { legacyAssetPageDataPath } from '#app/routes/utils/regex';

const hasRecommendations = async (service, variant, pageData, pathname) => {
  const config = await getConfig(service, variant);

  const serviceHasRecommendations = path(
    ['recommendations', 'hasStoryRecommendations'],
    config,
  );

  const assetAllowsAdvertising = path(
    ['metadata', 'options', 'allowAdvertising'],
    pageData,
  );

  // This has been added to prevent TC2 legacy assets from trying to fetch from the OJ Rec Endpoint
  // This is due to the routing on mozart behaving incorrectly
  const assetIsTc2 = RegExp(legacyAssetPageDataPath).test(pathname);

  return serviceHasRecommendations && assetAllowsAdvertising && !assetIsTc2;
};

export default hasRecommendations;
