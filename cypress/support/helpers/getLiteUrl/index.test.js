const { default: getLiteUrl } = require('.');

describe('getLiteUrl', () => {
  [
    'http://localhost:7080',
    'https://www.test.bbc.com',
    'https://www.bbc.com',
  ].forEach(baseUrl => {
    describe(`with base url ${baseUrl}`, () => {
      it('should return lite url', () => {
        expect(getLiteUrl(`${baseUrl}/pathname`)).toEqual(
          `${baseUrl}/pathname.lite`,
        );
      });

      it('should not append .lite to lite path', () => {
        expect(getLiteUrl(`${baseUrl}/pathname.lite`)).toEqual(
          `${baseUrl}/pathname.lite`,
        );
      });

      it('should return lite url for path with query string params', () => {
        expect(getLiteUrl(`${baseUrl}/pathname?query_string=value`)).toEqual(
          `${baseUrl}/pathname.lite?query_string=value`,
        );
      });

      it('should not append .lite to lite path with query string params', () => {
        expect(
          getLiteUrl(`${baseUrl}/pathname.lite?query_string=value`),
        ).toEqual(`${baseUrl}/pathname.lite?query_string=value`);
      });
    });
  });
});
