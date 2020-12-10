import getRecommendationsUrl from '.';

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
});
