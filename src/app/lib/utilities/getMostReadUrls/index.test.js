import getMostReadEndpoint from '.';

describe('getMostReadEndpoint', () => {
  it('should return endpoint when passed service', () => {
    expect(getMostReadEndpoint({ service: 'hausa' })).toBe(
      '/hausa/mostread.json',
    );
  });
  it('should return endpoint when passed service and variant', () => {
    expect(getMostReadEndpoint({ service: 'serbian', variant: 'lat' })).toBe(
      '/serbian/mostread/lat.json',
    );
  });
});
