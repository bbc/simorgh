import {
  testNonHTMLResponseCode,
  testContentType,
} from '../support/metaTestHelper';

describe('Simorgh Status', () => {
  it('should return 200', () => {
    testNonHTMLResponseCode('/status', 200);
  });

  it('should have the content type set to Javascript', () => {
    testContentType(
      '/news/articles/sw.js',
      'application/javascript; charset=UTF-8',
    );
  });
});
