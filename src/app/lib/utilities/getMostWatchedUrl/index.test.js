import getMostWatchedEndpoint from '.';

describe('getMostReadEndpoint', () => {
  it('should return endpoint when passed service', () => {
    expect(getMostWatchedEndpoint({ service: 'hausa' })).toBe(
      '/hausa/mostwatched.json',
    );
  });
  it('should return endpoint when passed service and variant', () => {
    expect(getMostWatchedEndpoint({ service: 'serbian', variant: 'lat' })).toBe(
      '/serbian/mostwatched/lat.json',
    );
  });
});
