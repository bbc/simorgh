import getMostWatchedEndpoint from '.';

describe('getMostWatchEndpoint', () => {
  it('should not return base path nor append .json when env is local', () => {
    expect(getMostWatchedEndpoint({ service: 'hausa', env: 'local' })).toBe(
      '/hausa/mostwatched',
    );
  });
  it('should return test base path and append .json when env is test', () => {
    expect(getMostWatchedEndpoint({ service: 'hausa', env: 'test' })).toBe(
      'https://www.test.bbc.com/hausa/mostwatched.json',
    );
  });
  it('should return live base path and append .json when env is live', () => {
    expect(getMostWatchedEndpoint({ service: 'hausa', env: 'live' })).toBe(
      'https://www.bbc.com/hausa/mostwatched.json',
    );
  });
  it('should return correct path when passed service and variant', () => {
    expect(
      getMostWatchedEndpoint({
        service: 'serbian',
        variant: 'lat',
        env: 'local',
      }),
    ).toBe('/serbian/mostwatched/lat');
  });
});
