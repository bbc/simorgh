const { default: getDataUrl } = require('.');

describe('getDataUrl', () => {
  [
    'http://localhost:7080',
    'https://www.test.bbc.com',
    'https://www.bbc.com',
  ].forEach(baseUrl => {
    describe(`with base url ${baseUrl}`, () => {
      it('should return data url', () => {
        expect(getDataUrl(`${baseUrl}/pathname`)).toEqual(
          `${baseUrl}/pathname.json`,
        );
      });

      it('should return data url for amp path', () => {
        expect(getDataUrl(`${baseUrl}/pathname.amp`)).toEqual(
          `${baseUrl}/pathname.amp.json`,
        );
      });

      it('should return data url for path with query string params', () => {
        expect(getDataUrl(`${baseUrl}/pathname?query_string=value`)).toEqual(
          `${baseUrl}/pathname.json?query_string=value`,
        );
      });

      it('should return data url for amp path with query string params', () => {
        expect(
          getDataUrl(`${baseUrl}/pathname.amp?query_string=value`),
        ).toEqual(`${baseUrl}/pathname.amp.json?query_string=value`);
      });
    });
  });
});
