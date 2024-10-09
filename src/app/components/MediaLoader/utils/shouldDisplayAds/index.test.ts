import shouldDisplayAds from '.';

describe('Should display ads', () => {
  it.each`
    adsEnabled | showAdsBasedOnLocation | duration | expected | scenario
    ${false}   | ${false}               | ${31}    | ${false} | ${'adsEnabled is false'}
    ${false}   | ${false}               | ${31}    | ${false} | ${'adsEnabled and showAdsBasedOnLocation is false'}
    ${false}   | ${false}               | ${29}    | ${false} | ${'adsEnabled and showAdsBasedOnLocation are false, and duration is too short'}
    ${true}    | ${false}               | ${31}    | ${false} | ${'showAdsBasedOnLocation is false'}
    ${true}    | ${false}               | ${29}    | ${false} | ${'showAdsBasedOnLocation is false and duration is too short'}
    ${true}    | ${true}                | ${29}    | ${false} | ${'duration is too short'}
    ${true}    | ${true}                | ${31}    | ${true}  | ${'adsEnabled and showAdsBasedOnLocation are true, and duration is long enough to allow preroll ads'}
  `(
    'should be $expected because $scenario',
    ({ adsEnabled, showAdsBasedOnLocation, duration, expected }) => {
      expect(
        shouldDisplayAds({ adsEnabled, showAdsBasedOnLocation, duration }),
      ).toBe(expected);
    },
  );
});
