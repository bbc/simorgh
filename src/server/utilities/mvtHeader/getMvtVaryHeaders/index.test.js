import getMvtVaryHeaders from '.';

const getMockMvtExperiments = (enabled1, enabled2, enabled3) => [
  {
    experimentName: 'simorgh_dark_mode',
    type: 'experiment',
    variation: 'control',
    enabled: enabled1,
  },
  {
    experimentName: 'simorgh_data_saving',
    variation: 'saving',
    enabled: enabled2,
  },
  {
    experimentName: 'foo',
    variation: 'bar',
    enabled: enabled3,
  },
];

describe('getMvtVaryHeaders', () => {
  it('should create a string used in the vary header if a single experiment is enabled', () => {
    expect(
      getMvtVaryHeaders(getMockMvtExperiments(true, false, false)),
    ).toEqual('mvt-simorgh_dark_mode');
  });

  it('should create a string seperated with , delimeter used in the vary header if multiple experiments are enabled', () => {
    expect(getMvtVaryHeaders(getMockMvtExperiments(true, true, false))).toEqual(
      'mvt-simorgh_dark_mode, mvt-simorgh_data_saving',
    );
  });

  it('should return an empty string if experiments are not enabled', () => {
    expect(
      getMvtVaryHeaders(getMockMvtExperiments(false, false, false)),
    ).toEqual('');
  });

  it('should return an empty string if experiments is an empty array', () => {
    expect(getMvtVaryHeaders([])).toEqual('');
  });
});
