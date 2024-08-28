import { getMostReadEndpoint, getLocalMostReadEndpoint } from '.';

describe('getMostReadEndpoint', () => {
  it.each`
    service      | variant  | isBff    | expected
    ${'hausa'}   | ${null}  | ${false} | ${'/hausa/mostread.json'}
    ${'hausa'}   | ${null}  | ${true}  | ${'/fd/simorgh-bff?pageType=mostRead&service=hausa'}
    ${'serbian'} | ${'lat'} | ${false} | ${'/serbian/mostread/lat.json'}
    ${'serbian'} | ${'lat'} | ${true}  | ${'/fd/simorgh-bff?pageType=mostRead&service=serbian&variant=lat'}
  `(
    'should return the correct endpoint when service is $service, variant is $variant and isBff is $isBff',
    ({ isBff, service, variant, expected }) => {
      expect(getMostReadEndpoint({ service, variant, isBff })).toBe(expected);
    },
  );
});

describe('getLocalMostReadEndpoint', () => {
  it('should return endpoint when passed service', () => {
    expect(getLocalMostReadEndpoint({ service: 'hausa' })).toBe(
      '#data/hausa/mostRead/index.json',
    );
  });
  it('should return endpoint when passed service & variant', () => {
    expect(
      getLocalMostReadEndpoint({
        service: 'serbian',
        variant: 'lat',
      }),
    ).toBe('#data/serbian/mostRead/lat.json');
  });
});
