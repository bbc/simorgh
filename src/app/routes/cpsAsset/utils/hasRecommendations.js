import pathOr from 'ramda/src/pathOr';
import getConfig from '#app/routes/utils/getConfig';

const hasRecommendations = async (service, variant) => {
  const config = await getConfig(service, variant);

  const serviceHasRecommendations = pathOr(
    false,
    ['recommendations', 'hasStoryRecommendations'],
    config,
  );
  return serviceHasRecommendations;
};

export default hasRecommendations;
