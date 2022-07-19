import generatePromoId from '.';

describe('generate Promo Id', () => {
  it.each`
    expectation                                               | sectionType          | assetUri                    | uri                          | contentType | promoIndex | expected
    ${' contentType and URI'}                                 | ${'Related-Content'} | ${'https://bbc.com/mundo'}  | ${'https://bbc.com/pidgin'}  | ${'text'}   | ${0}       | ${'related-content-promo-httpsbbccommundo-text-1'}
    ${' URI if assetURI does not exist'}                      | ${'Related-Content'} | ${null}                     | ${'https://bbc.com/pidgin'}  | ${'text'}   | ${0}       | ${'related-content-promo-httpsbbccompidgin-text-1'}
    ${'out assetURI and contentType'}                         | ${'Related-Content'} | ${null}                     | ${'https://bbc.com/pidgin'}  | ${null}     | ${0}       | ${'related-content-promo-httpsbbccompidgin-1'}
    ${' contentType only when assetURI and URI do not exist'} | ${'Related-Content'} | ${null}                     | ${null}                      | ${'text'}   | ${0}       | ${'related-content-promo-text-1'}
    ${' sanitised link and split the last forward slash'}     | ${'Related-Content'} | ${'https://bbc.com/mundo/'} | ${'https://bbc.com/pidgin/'} | ${'text'}   | ${0}       | ${'related-content-promo-httpsbbccommundo-text-1'}
  `(
    'should return id with$expectation',
    ({ sectionType, assetUri, uri, contentType, promoIndex, expected }) => {
      expect(
        generatePromoId({
          sectionType,
          assetUri,
          uri,
          contentType,
          promoIndex,
        }),
      ).toEqual(expected);
    },
  );
});
