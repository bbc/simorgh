import getRecommendationsUrl from '.';

describe('getRecommendationsUrl', () => {
  it('should return endpoint when passed service and assetId', () => {
    expect(getRecommendationsUrl({ service: 'mundo', assetId: '123456' })).toBe(
      '/mundo/123456/recommendations',
    );
  });
  it('should return endpoint when passed service variant and assetId', () => {
    expect(
      getRecommendationsUrl({
        service: 'zhongwen',
        variant: 'trad',
        assetId: '123456',
      }),
    ).toBe('/zhongwen/123456/recommendations/trad');
  });
});
