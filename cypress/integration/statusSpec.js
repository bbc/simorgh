import { testContentTypeContains } from '../support/metaTestHelper';

describe('Service worker', () => {
  it('should have the content type set to Javascript', () => {
    testContentTypeContains('/news/articles/sw.js', 'application/javascript');
  });
});
