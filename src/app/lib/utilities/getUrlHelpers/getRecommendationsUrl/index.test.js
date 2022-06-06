import getRecommendationsUrl, {
  portugueseRecommendationsExperimentEndpoint,
} from '.';

describe('getRecommendationsUrl', () => {
  it('should return endpoint when passed service and assetUri', () => {
    expect(getRecommendationsUrl({ assetUri: '/mundo/123456' })).toBe(
      '/mundo/123456/recommendations',
    );
  });
  it('should return endpoint when passed service variant and assetUri', () => {
    expect(
      getRecommendationsUrl({
        variant: 'trad',
        assetUri: '/zhongwen/123456',
      }),
    ).toBe('/zhongwen/123456/recommendations/trad');
  });

  describe('Optimizely Experiments', () => {
    describe.only('004_brasil_recommendations_experiment', () => {
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
