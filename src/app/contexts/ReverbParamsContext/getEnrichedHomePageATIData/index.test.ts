import getEnrichedHomePageATIData from '.';
import useExperimentVariation from '../../../hooks/useExperimentVariation';

jest.mock('#app/hooks/useExperimentVariation', () => ({
  __esModule: true,
  ...jest.requireActual('#app/hooks/useExperimentVariation'),
  default: jest.fn(),
}));

const mockUseExperimentVariation = jest.mocked(useExperimentVariation);

const pageMetadata = {
  atiAnalytics: {
    contentType: 'index-home',
    language: 'ha',
    ldpThingIds: 'urn:bbc:tipo:topic:cy1v5ngp4d9t',
    ldpThingLabels: null,
    pageIdentifier: 'hausa.page',
    pageTitle: 'Labaran Duniya - BBC News Hausa',
    producerId: null,
    producerName: 'HAUSA',
  },
  type: 'home',
};

describe('getEnrichedHomePageATIData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the ATI data unchanged when the experiment is off', () => {
    mockUseExperimentVariation.mockImplementation(() => 'off');

    const enrichedData = getEnrichedHomePageATIData({ pageMetadata });

    expect(enrichedData).toEqual({
      contentType: 'index-home',
      language: 'ha',
      ldpThingIds: 'urn:bbc:tipo:topic:cy1v5ngp4d9t',
      ldpThingLabels: null,
      pageIdentifier: 'hausa.page',
      pageTitle: 'Labaran Duniya - BBC News Hausa',
      producerId: null,
      producerName: 'HAUSA',
    });
  });

  it('should return the ATI data unchanged when there is no variant', () => {
    mockUseExperimentVariation.mockImplementation(() => null);

    const enrichedData = getEnrichedHomePageATIData({ pageMetadata });

    expect(enrichedData).toEqual({
      contentType: 'index-home',
      language: 'ha',
      ldpThingIds: 'urn:bbc:tipo:topic:cy1v5ngp4d9t',
      ldpThingLabels: null,
      pageIdentifier: 'hausa.page',
      pageTitle: 'Labaran Duniya - BBC News Hausa',
      producerId: null,
      producerName: 'HAUSA',
    });
  });

  it('should include experiment details when a variant is active', () => {
    mockUseExperimentVariation.mockImplementation(() => 'variant_a');

    const enrichedData = getEnrichedHomePageATIData({ pageMetadata });

    expect(enrichedData).toEqual({
      contentType: 'index-home',
      language: 'ha',
      ldpThingIds: 'urn:bbc:tipo:topic:cy1v5ngp4d9t',
      ldpThingLabels: null,
      pageIdentifier: 'hausa.page',
      pageTitle: 'Labaran Duniya - BBC News Hausa',
      producerId: null,
      producerName: 'HAUSA',
      experimentName: 'test_homepage_client_side_aa',
      experimentVariant: 'variant_a',
      experimentProps: {
        experimentName: 'test_homepage_client_side_aa',
        experimentVariant: 'variant_a',
      },
    });
  });
});
