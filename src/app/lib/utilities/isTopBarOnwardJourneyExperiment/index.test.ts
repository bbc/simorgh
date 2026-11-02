import isTopBarOnwardJourneyExperiment from '.';

const experimentName = 'newswb_ws_topbarojs_read_more';

describe('isTopBarOnwardJourneyExperiment', () => {
  it.each([
    ['top-bar-top-stories', true],
    ['read-more-a-and-top-stories', true],
    ['top-bar-most-read', false],
    ['control', false],
    ['off', false],
  ])('returns %s for the %s variation', (variation, expected) => {
    expect(
      isTopBarOnwardJourneyExperiment([
        {
          experimentName,
          variation,
          enabled: true,
        },
      ]),
    ).toBe(expected);
  });

  it('returns false when the experiment is absent', () => {
    expect(isTopBarOnwardJourneyExperiment()).toBe(false);
  });
});
