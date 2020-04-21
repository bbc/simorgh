import { getMostReadEndpoint, getLocalMostReadEndpoint } from '.';

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
describe('getLocalMostReadEndpoint', () => {
  it('should return endpoint when passed service', () => {
    expect(getLocalMostReadEndpoint({ service: 'hausa' })).toBe(
      './data/hausa/mostRead/index.json',
    );
  });
  it('should return endpoint when passed service & variant', () => {
    expect(
      getLocalMostReadEndpoint({
        service: 'serbian',
        variant: 'lat',
      }),
    ).toBe('./data/serbian/mostRead/lat.json');
  });
});
