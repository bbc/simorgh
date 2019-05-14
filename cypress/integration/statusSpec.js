import config from '../support/config';
import {
  testContentTypeContains,
  mozartFallbackStatus,
} from '../support/metaTestHelper';

describe('Service worker', () => {
  it('should have the content type set to Javascript', () => {
    testContentTypeContains('/news/articles/sw.js', 'application/javascript');
  });
});

describe('Mozart status', () => {
  it('should not contain the response header X-Mfa set to 1', () => {
    mozartFallbackStatus(`/news/articles/${config.assets.news}`);
  });
});
