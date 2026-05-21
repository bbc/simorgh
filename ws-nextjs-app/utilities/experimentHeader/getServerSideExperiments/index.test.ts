import getServerSideExperiments from '.';

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

describe('getServerSideExperiments', () => {
  it('should return an empty array when no mvt headers are in the request', () => {
    expect(
      getServerSideExperiments({
        headers: mockHeadersNoMvt,
        service: 'news',
        pageType: 'article',
      }),
    ).toEqual([]);
  });

  it('should return an array of a single experiment object when a single mvt header is in the response', () => {
    expect(
      getServerSideExperiments({
        headers: mockHeadersSingleMvt,
        service: 'news',
        pageType: 'article',
      }),
    ).toEqual([
      {
        experimentName: 'simorgh_dark_mode',
        type: 'experiment',
        variation: 'control',
        enabled: false,
      },
    ]);
  });

  it('should return an array of multiple experiment objects when multiple mvt headers are in the response', () => {
    expect(
      getServerSideExperiments({
        headers: mockHeadersMultipleMvt,
        service: 'news',
        pageType: 'article',
      }),
    ).toEqual([
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
    expect(
      getServerSideExperiments({
        headers: mockHeadersMultipleMvt,
        service: 'news',
        pageType: 'article',
      })[0],
    ).toHaveProperty('type');
  });

  it('should should not create a type key when a string is present with no ; delimeter', () => {
    expect(
      getServerSideExperiments({
        headers: mockHeadersMultipleMvt,
        service: 'news',
        pageType: 'article',
      })[1],
    ).not.toHaveProperty('type');
  });

  it('should omit the mvt prefix from the experiement name', () => {
    expect(
      getServerSideExperiments({
        headers: mockHeadersMultipleMvt,
        service: 'news',
        pageType: 'article',
      })[0],
    ).toHaveProperty('experimentName', 'simorgh_dark_mode');
  });

  it('should return an experiment object with the enabled key set to true if the experiment is in the enabled list and matches the correct pageType and service', () => {
    expect(
      getServerSideExperiments({
        headers: mockHeadersSingleMvt,
        service: 'mundo',
        pageType: 'STY',
      })[0],
    ).toHaveProperty('enabled', true);
  });

  it('should return an experiment object with the enabled key set to false, if experiment is in the enabled list, and matches the correct pageType but does not match service', () => {
    expect(
      getServerSideExperiments({
        headers: mockHeadersSingleMvt,
        service: 'afrique',
        pageType: 'STY',
      })[0],
    ).toHaveProperty('enabled', false);
  });

  it('should return an experiment object with the enabled key set to false, if experiment is in the enabled list, and matches the correct service but does not match pageType', () => {
    expect(
      getServerSideExperiments({
        headers: mockHeadersSingleMvt,
        service: 'mundo',
        pageType: 'PGL',
      })[0],
    ).toHaveProperty('enabled', false);
  });

  it('should return an experiment object with the enabled key set to false, if the experiment is not in the enabled list', () => {
    expect(
      getServerSideExperiments({
        headers: mockHeadersMultipleMvt,
        service: 'afrique',
        pageType: 'STY',
      })[2],
    ).toHaveProperty('enabled', false);
  });
});
