import optimoPromoIdGenerator from '.';

describe('buildUniquePromoId', () => {
  it('should return id of promo-link with contentType and URI if contentType exists', () => {
    expect(
      optimoPromoIdGenerator(
        'Related-Content',
        'https://bbc.com/mundo',
        'https://bbc.com/pidgin',
        'text',
        0,
      ),
    ).toEqual('related-content-promo-httpsbbccommundo-text-1');
  });

  it('should return id using URI if assetURI does not exist', () => {
    expect(
      optimoPromoIdGenerator(
        'Related-Content',
        null,
        'https://bbc.com/pidgin',
        'text',
        0,
      ),
    ).toEqual('related-content-promo-httpsbbccompidgin-text-1');
  });

  it('should return id using assetURI does not exist and contentType does not exist', () => {
    expect(
      optimoPromoIdGenerator(
        'Related-Content',
        null,
        'https://bbc.com/pidgin',
        null,
        0,
      ),
    ).toEqual('related-content-promo-httpsbbccompidgin-1');
  });

  it('should return id with contentType only if assetURI and URI do not exist', () => {
    expect(
      optimoPromoIdGenerator('Related-Content', null, null, 'text', 0),
    ).toEqual('related-content-promo-text-1');
  });

  it('should sanitise link from item and split from last forward slash', () => {
    expect(
      optimoPromoIdGenerator(
        'Related-Content',
        'aaabbbccc',
        'aaabbbccc/',
        'text',
        0,
      ),
    ).toEqual('related-content-promo-aaabbbccc-text-1');
  });
});
