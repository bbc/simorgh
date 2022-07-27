import getMvtVaryHeaders from '.';

jest.mock('../enabledExperimentsList', () => [
  {
    name: 'simorgh_dark_mode',
    services: ['pidgin', 'mundo'],
    pageTypes: ['STY', 'IDX'],
  },
  {
    name: 'simorgh_data_saving',
    services: ['pidgin'],
    pageTypes: ['STY', 'IDX'],
  },
]);

const mockMvtExperiments = [
  {
    experimentName: 'simorgh_dark_mode',
    type: 'experiment',
    variation: 'control',
  },
  {
    experimentName: 'simorgh_data_saving',
    variation: 'saving',
  },
  {
    experimentName: 'foo',
    variation: 'bar',
  },
];

describe('getMvtVaryHeaders', () => {
  it('should create a string used in the vary header if a single experiment is in the enabled list, and matches the correct service and page type', () => {
    expect(getMvtVaryHeaders(mockMvtExperiments, 'mundo', 'STY')).toEqual(
      'mvt-simorgh_dark_mode',
    );
  });

  it('should create a string seperated with , delimeter used in the vary header if multiple experiments are in the enabled list, and matches the correct service and page type', () => {
    expect(getMvtVaryHeaders(mockMvtExperiments, 'pidgin', 'STY')).toEqual(
      'mvt-simorgh_dark_mode, mvt-simorgh_data_saving',
    );
  });

  it('should return an empty string if experiment is not in the enabled list', () => {
    expect(getMvtVaryHeaders([mockMvtExperiments[2]], 'mundo', 'STY')).toEqual(
      '',
    );
  });

  it('should return an empty string if experiment is in the enabled list, and matches the correct service but does not match page type', () => {
    expect(getMvtVaryHeaders([mockMvtExperiments[0]], 'mundo', 'PGL')).toEqual(
      '',
    );
  });

  it('should return an empty string if experiment is in the enabled list, and matches the correct page type but does not match service', () => {
    expect(
      getMvtVaryHeaders([mockMvtExperiments[0]], 'afrique', 'PGL'),
    ).toEqual('');
  });
});
