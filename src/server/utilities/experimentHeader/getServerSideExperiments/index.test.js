import getMvtExperiments from '.';

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

const mockHeadersNoMvt = {
  host: 'localhost:7080',
  connection: 'keep-alive',
  'sec-fetch-mode': 'cors',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
};

const mockHeadersSingleMvt = {
  ...mockHeadersNoMvt,
  'mvt-simorgh_dark_mode': 'experiment;control',
};

const mockHeadersMultipleMvt = {
  ...mockHeadersSingleMvt,
  'mvt-simorgh_data_saving': 'saving',
  'mvt-simorgh_new_recs': 'new',
};

describe('getMvtExperiments', () => {
  it('should return an empty array when no mvt headers are in the request', () => {
    expect(getMvtExperiments(mockHeadersNoMvt)).toEqual([]);
  });

  it('should return an array of a single experiment object when a single mvt header is in the response', () => {
    expect(getMvtExperiments(mockHeadersSingleMvt)).toEqual([
      {
        experimentName: 'simorgh_dark_mode',
        type: 'experiment',
        variation: 'control',
        enabled: false,
      },
    ]);
  });

  it('should return an array of multiple experiment objects when multiple mvt headers are in the response', () => {
    expect(getMvtExperiments(mockHeadersMultipleMvt)).toEqual([
      {
        experimentName: 'simorgh_dark_mode',
        type: 'experiment',
        variation: 'control',
        enabled: false,
      },
      {
        experimentName: 'simorgh_data_saving',
        variation: 'saving',
        enabled: false,
      },
      {
        experimentName: 'simorgh_new_recs',
        variation: 'new',
        enabled: false,
      },
    ]);
  });

  it('should should create a type key when a string is present before a ; delimeter in the header content', () => {
    expect(getMvtExperiments(mockHeadersMultipleMvt)[0]).toHaveProperty('type');
  });

  it('should should not create a type key when a string is present with no ; delimeter', () => {
    expect(getMvtExperiments(mockHeadersMultipleMvt)[1]).not.toHaveProperty(
      'type',
    );
  });

  it('should omit the mvt prefix from the experiement name', () => {
    expect(getMvtExperiments(mockHeadersMultipleMvt)[0]).toHaveProperty(
      'experimentName',
      'simorgh_dark_mode',
    );
  });

  it('should return an experiment object with the enabled key set to true if the experiment is in the enabled list and matches the correct pageType and service', () => {
    expect(
      getMvtExperiments(mockHeadersSingleMvt, 'mundo', 'STY')[0],
    ).toHaveProperty('enabled', true);
  });

  it('should return an experiment object with the enabled key set to false, if experiment is in the enabled list, and matches the correct pageType but does not match service', () => {
    expect(
      getMvtExperiments(mockHeadersSingleMvt, 'afrique', 'STY')[0],
    ).toHaveProperty('enabled', false);
  });

  it('should return an experiment object with the enabled key set to false, if experiment is in the enabled list, and matches the correct service but does not match pageType', () => {
    expect(
      getMvtExperiments(mockHeadersSingleMvt, 'mundo', 'PGL')[0],
    ).toHaveProperty('enabled', false);
  });

  it('should return an experiment object with the enabled key set to false, if the experiment is not in the enabled list', () => {
    expect(
      getMvtExperiments(mockHeadersMultipleMvt, 'afrique', 'STY')[2],
    ).toHaveProperty('enabled', false);
  });
});
