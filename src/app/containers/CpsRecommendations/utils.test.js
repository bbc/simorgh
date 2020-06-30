import transformToStoryPromoItems from './utils';
import data from './recommendations.ltr.json';

describe('transformToStoryPromoItems', () => {
  it('should transform a list of recommendation items to a story promo format', () => {
    const expected = [
      {
        headlines: {
          headline:
            'Argentina ordena cuarentena total obligatoria por el coronavirus',
        },
        locators: {
          assetUri: '/mundo/noticias-america-latina-51975331',
        },
        indexImage: {
          path:
            'http://c.files.bbci.co.uk/5A4D/production/_111371132_hi060727445.jpg',
          altText: 'Image Alt text',
        },
        uri: '/mundo/noticias-america-latina-51975331',
      },
      {
        headlines: {
          headline:
            'Por qué México se convirtió en el gran obstáculo del plan de la OPEP para aumentar el precio del petróleo',
        },
        locators: {
          assetUri: '/mundo/noticias-america-latina-52250630',
        },
        indexImage: {
          path:
            'http://c.files.bbci.co.uk/49F7/production/_111753981_03009521-c6ba-41e6-8328-65d0caf07635.jpg',
          altText: 'Image Alt text',
        },
        uri: '/mundo/noticias-america-latina-52250630',
      },
      {
        headlines: {
          headline:
            'El inédito y cuestionado plan de emergencia económica de Ecuador contra la crisis del coronavirus',
        },
        locators: {
          assetUri: '/mundo/noticias-52275464',
        },
        indexImage: {
          path:
            'http://c.files.bbci.co.uk/34F5/production/_111775531_tv061050412.jpg',
          altText: 'Image Alt text',
        },
        uri: '/mundo/noticias-52275464',
      },
      {
        headlines: {
          headline:
            'La guerra de precios entre Arabia Saudita y Rusia que hundió el valor del petróleo y las bolsas en medio de la crisis por el coronavirus',
        },
        locators: {
          assetUri: '/mundo/noticias-51796524',
        },
        indexImage: {
          path:
            'http://c.files.bbci.co.uk/4627/production/_111195971_mediaitem111195968.jpg',
          altText: 'Image Alt text',
        },
        uri: '/mundo/noticias-51796524',
      },
    ];
    expect(transformToStoryPromoItems(data.items)).toEqual(expected);
  });
});
