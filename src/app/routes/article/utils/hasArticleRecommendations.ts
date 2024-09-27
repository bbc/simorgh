import getConfig from '#app/routes/utils/getConfig';

const hasArticleRecommendations = async (
  service: string,
  isAdvertising: boolean,
  variant?: string,
) => {
  const config = await getConfig(service, variant);

  const serviceHasRecommendations =
    config?.recommendations?.hasStoryRecommendations;

  return serviceHasRecommendations && isAdvertising;
};

export default hasArticleRecommendations;
