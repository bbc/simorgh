/**
 * @service gahuza
 * @pathname /gahuza/articles/c5y51yxeg53o
 */

import liteSiteLink from '../liteSiteLink';
import runCanonicalTests from '../canonicalTests';
import readTimeTests from '../readTimeTests';

describe('Canonical', () => {
  describe(pageType, () => {
    liteSiteLink();
    readTimeTests();
    runCanonicalTests(service);
  });
});
