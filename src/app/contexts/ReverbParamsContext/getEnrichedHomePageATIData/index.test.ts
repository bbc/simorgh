import getEnrichedHomePageATIData from '.';

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
  it('should return the ATI data unchanged when the experiment is off', () => {
    const enrichedData = getEnrichedHomePageATIData({
      pageMetadata,
      experimentVariant: 'off',
    });

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
    const enrichedData = getEnrichedHomePageATIData({
      pageMetadata,
      experimentVariant: null,
    });

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
    const enrichedData = getEnrichedHomePageATIData({
      pageMetadata,
      experimentVariant: 'variant_a',
    });

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
