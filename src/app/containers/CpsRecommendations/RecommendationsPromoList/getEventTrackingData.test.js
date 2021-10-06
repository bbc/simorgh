import getEventTrackingData from './getEventTrackingData';

process.env.SIMORGH_BASE_URL = 'http://bbc.com';

describe('getEventTrackingData', () => {
  it('should return correct block event tracking data', () => {
    const expected = {
      block: { componentName: 'wsoj' },
    };
    const actual = getEventTrackingData();

    expect(actual).toEqual(expected);
  });

  it('should return correct block and link event tracking data', () => {
    const itemFixture = {
      headlines: {
        headline:
          'Soy una mujer genocida y aún me persiguen los recuerdos de lo que hice',
      },
      locators: {
        assetUri: '/mundo/noticias-internacional-53113381',
      },
    };
    const expected = {
      block: { componentName: 'wsoj' },
      link: {
        campaignID: 'cps_wsoj',
        componentName:
          'Soy%20una%20mujer%20genocida%20y%20a%C3%BAn%20me%20persiguen%20los%20recuerdos%20de%20lo%20que%20hice',
        format: 'CHD=promo::3',
        advertiserID: 'mundo',
        url: 'http://bbc.com/mundo/noticias-internacional-53113381',
      },
    };
    const actual = getEventTrackingData({ item: itemFixture, index: 2 });

    expect(actual).toEqual(expected);
  });

  it('should return correct block and link event tracking data when there is an assetTypeCode', () => {
    const itemFixture = {
      assetTypeCode: 'PRO',
      name: 'Soy una mujer genocida y aún me persiguen los recuerdos de lo que hice',
      uri: '/mundo/noticias-internacional-53113381',
    };
    const expected = {
      block: { componentName: 'wsoj' },
      link: {
        campaignID: 'cps_wsoj',
        componentName:
          'Soy%20una%20mujer%20genocida%20y%20a%C3%BAn%20me%20persiguen%20los%20recuerdos%20de%20lo%20que%20hice',
        format: 'CHD=promo::1',
        advertiserID: 'mundo',
        url: 'http://bbc.com/mundo/noticias-internacional-53113381',
      },
    };
    const actual = getEventTrackingData({ item: itemFixture, index: 0 });

    expect(actual).toEqual(expected);
  });
});
