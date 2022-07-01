import getRecommendationsUrl, {
  portugueseRecommendationsExperimentEndpoint,
} from '.';

describe('getRecommendationsUrl', () => {
  it('should return endpoint when passed assetUri', () => {
    expect(getRecommendationsUrl({ assetUri: '/mundo/123456' })).toBe(
      'https://onward-journeys.api.bbci.co.uk/api/recommendations/mundo/123456',
    );
  });

  describe('Optimizely Experiments', () => {
    describe('004_brasil_recommendations_experiment', () => {
      beforeEach(() => {
        process.env.RECOMMENDATIONS_ENDPOINT =
          'http://mock-recommendations-path';
      });

      afterEach(() => {
        delete process.env.RECOMMENDATIONS_ENDPOINT;
      });
      it('should return portuguese experimentation endpoint with engine', () => {
        expect(
          portugueseRecommendationsExperimentEndpoint({
            assetUri: '/portuguese/brasil-59876053',
            service: 'portuguese',
            engine: 'unirecs_datalab',
          }),
        ).toBe(
          'http://mock-recommendations-path/recommendations/portuguese/brasil-59876053?Engine=unirecs_datalab',
        );
      });

      it('should return portuguese experimentation endpoint with engine and engine variant', () => {
        expect(
          portugueseRecommendationsExperimentEndpoint({
            assetUri: '/portuguese/brasil-59876053',
            service: 'portuguese',
            engine: 'unirecs_datalab',
            engineVariant: 'hybrid',
          }),
        ).toBe(
          'http://mock-recommendations-path/recommendations/portuguese/brasil-59876053?Engine=unirecs_datalab&EngineVariant=hybrid',
        );
      });
    });
  });
});
