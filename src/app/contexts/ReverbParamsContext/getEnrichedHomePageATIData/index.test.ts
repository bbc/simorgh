import getEnrichedHomePageATIData from '.';
import * as useOptimizelyVariation from '../../../hooks/useOptimizelyVariation';

jest.mock('#app/hooks/useOptimizelyVariation', () => ({
  __esModule: true,
  ...jest.requireActual('#app/hooks/useOptimizelyVariation'),
  default: jest.fn(),
}));

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
    jest
      .spyOn(useOptimizelyVariation, 'default')
      .mockImplementation(() => 'off');

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
    jest
      .spyOn(useOptimizelyVariation, 'default')
      .mockImplementation(() => null);

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
    jest
      .spyOn(useOptimizelyVariation, 'default')
      .mockImplementation(() => 'variant_a');

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
      experimentName: 'test_page_views_aa_4',
      experimentVariant: 'variant_a',
      experimentProps: {
        experimentName: 'test_page_views_aa_4',
        experimentVariant: 'variant_a',
        sendOptimizelyEvents: true,
      },
    });
  });
});
