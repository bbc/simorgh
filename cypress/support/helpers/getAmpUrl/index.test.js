const { default: getAmpUrl } = require('.');

describe('getAmpUrl', () => {
  [
    'http://localhost:7080',
    'https://www.test.bbc.com',
    'https://www.bbc.com',
  ].forEach(baseUrl => {
    describe(`with base url ${baseUrl}`, () => {
      it('should return amp url', () => {
        expect(getAmpUrl(`${baseUrl}/pathname`)).toEqual(
          `${baseUrl}/pathname.amp`,
        );
      });

      it('should not append .amp to amp path', () => {
        expect(getAmpUrl(`${baseUrl}/pathname.amp`)).toEqual(
          `${baseUrl}/pathname.amp`,
        );
      });

      it('should return amp url for path with query string params', () => {
        expect(getAmpUrl(`${baseUrl}/pathname?query_string=value`)).toEqual(
          `${baseUrl}/pathname.amp?query_string=value`,
        );
      });

      it('should not append .amp to amp path with query string params', () => {
        expect(getAmpUrl(`${baseUrl}/pathname.amp?query_string=value`)).toEqual(
          `${baseUrl}/pathname.amp?query_string=value`,
        );
      });
    });
  });
});
