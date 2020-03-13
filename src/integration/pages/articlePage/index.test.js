import runCanonicalTests from './canonical';

afterEach(() => {
  document.querySelector('html').innerHTML = '';
});

describe('Article page', runCanonicalTests);
