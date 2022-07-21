import getRecommendationsUrl from '.';

describe('getRecommendationsUrl - getRecommendationsUrl', () => {
  beforeEach(() => {
    process.env.RECOMMENDATIONS_ENDPOINT = 'http://mock-recommendations-path';
  });
  afterEach(() => {
    delete process.env.RECOMMENDATIONS_ENDPOINT;
  });
  it('should return endpoint when passed assetUri', () => {
    expect(getRecommendationsUrl({ assetUri: '/mundo/123456' })).toBe(
      'http://mock-recommendations-path/recommendations/mundo/123456',
    );
  });
  it('should return endpoint when passed assetUri and engine', () => {
    expect(
      getRecommendationsUrl({
        assetUri: '/mundo/123456',
        engine: 'unirecs_datalab',
      }),
    ).toBe(
      'http://mock-recommendations-path/recommendations/mundo/123456?Engine=unirecs_datalab',
    );
  });

  describe('Optimizely Experiments', () => {
    describe('004_brasil_recommendations_experiment', () => {
      it('should return portuguese experimentation endpoint with engine', () => {
        expect(
          getRecommendationsUrl({
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
          getRecommendationsUrl({
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
