import extractPromoData from '.';
import { optimoRecommendation, cpsRecommendation } from '../fixture';

describe('extractPromoData', () => {
  it('should get promo data from optimo block', () => {
    expect(extractPromoData({ promo: optimoRecommendation })).toEqual({
      headline:
        'Merkez Bankası politika faizini neden indirdi, enflasyonu düşürmek için ne yapmalı?',
      url: 'https://www.bbc.com/turkce/articles/crg7rvwrxdlo',
      indexImage: {
        width: 1023,
        height: 575,
        altText: 'dolar TL ',
        copyrightHolder: 'Getty Images',
        originCode: 'cpsprodpb',
        locator: '98dd/live/59717db0-1f53-11ed-aa9d-57accb179502.jpg',
      },
    });
  });

  it('should get promo data from cps block', () => {
    expect(extractPromoData({ promo: cpsRecommendation })).toEqual({
      headline: 'Meet boys who dey convert cassava to electricity',
      url: '/pidgin/44508901',
      indexImage: {
        width: 976,
        height: 549,
        altText: 'Kwesi and James dey check radio',
        copyrightHolder: 'BBC',
        originCode: 'cpsprodpb',
        locator: 'C576/production/_102105505_p06bhwsd.jpg',
      },
    });
  });

  it('should return null if no block is passed in', () => {
    expect(extractPromoData({ promo: null })).toBeNull();
  });
});
