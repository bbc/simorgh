import getConfig from '#routes/utils/getConfig';
import path from 'ramda/src/path';

const hasArticleRecommendations = async (
  service: string,
  isAdvertising: boolean,
  variant?: string,
) => {
  const config = await getConfig(service, variant);

  const serviceHasRecommendations = path(
    ['recommendations', 'hasStoryRecommendations'],
    config,
  );

  return serviceHasRecommendations && isAdvertising;
};

export default hasArticleRecommendations;
