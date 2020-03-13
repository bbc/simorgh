import runCanonicalTests from './canonical';

afterEach(() => {
  document.querySelector('html').innerHTML = '';
});

describe('Live radio page', runCanonicalTests);
