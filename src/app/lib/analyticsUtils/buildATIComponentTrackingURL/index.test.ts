import buildATIComponentTrackingURL from '.';

describe('buildATIComponentTrackingURL', () => {
  it('should return the correct url', () => {
    process.env.SIMORGH_ATI_BASE_URL = 'http://foobar.com?';

    const atiComponentTrackingURL = buildATIComponentTrackingURL({
      pageIdentifier: 'pageIdentifier',
      service: 'news',
      platform: 'canonical',
      statsDestination: 'statsDestination',
      componentName: 'component',
      type: 'type',
      campaignID: 'campaignID',
      format: 'format',
      url: 'url',
      detailedPlacement: 'detailedPlacement',
      experimentVariant: 'variant_1',
    });

    expect(
      Object.fromEntries(
        new URL(atiComponentTrackingURL).searchParams.entries(),
      ),
    ).toEqual(
      expect.objectContaining({
        atc: 'PUB-[campaignID]-[component]-[variant_1]-[format]-[pageIdentifier]-[detailedPlacement]-[]-[url]',
        lng: 'en-US',
        mv_creation: 'variant_1',
        mv_test: 'Top Bar OJs experiment',
        p: 'pageIdentifier',
        r: '0x0x24x24',
        re: '1024x768',
        s: '598285',
        type: 'AT',
      }),
    );
  });
});
