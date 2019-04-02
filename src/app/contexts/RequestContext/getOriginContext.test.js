import {
  setWindowValue,
  resetWindowValue,
} from '../../helpers/tests/setWindowValue';

const windowLocation = window.location;

describe('getInitialData', () => {
  afterEach(() => {
    resetWindowValue('location', windowLocation);
  });

  const inputArticleData = {
    metadata: {
      id: 'optimoId',
    },
  };

  const tests = [
    {
      input: {
        bbcOrigin: null,
        service: 'news',
        articleData: inputArticleData,
      },
      windowValues: {
        origin: null,
        href: null,
        referrer: null,
      },
      expected: {
        isUK: true,
        origin: 'https://www.bbc.co.uk',
        env: 'live',
        href: 'https://www.bbc.co.uk/news/optimoId',
        referrer: null,
      },
      assertion: 'should return defaults if no origin can be found',
    },
    {
      input: {
        bbcOrigin: 'https://foobar.com',
        service: 'news',
        articleData: inputArticleData,
      },
      windowValues: {
        origin: null,
        href: null,
        referrer: null,
      },
      expected: {
        isUK: false,
        origin: 'https://foobar.com',
        env: 'live',
        href: 'https://foobar.com/news/optimoId',
        referrer: null,
      },
      assertion:
        'should return isUK and origin based off of bbcOrigin if provided',
    },
    {
      input: {
        bbcOrigin: null,
        service: 'news',
        articleData: inputArticleData,
      },
      windowValues: {
        origin: 'https://barfoo.com',
        href: null,
        referrer: null,
      },
      expected: {
        isUK: false,
        origin: 'https://barfoo.com',
        env: 'live',
        href: 'https://barfoo.com/news/optimoId',
        referrer: null,
      },
      assertion:
        'should return isUK and origin based off of origin if bbcOrigin isnt provided',
    },
    {
      input: {
        bbcOrigin: null,
        service: 'news',
        articleData: inputArticleData,
      },
      windowValues: {
        origin: 'https://barfoo.org',
        href: null,
        referrer: null,
      },
      expected: {
        isUK: true,
        origin: 'https://barfoo.org',
        env: 'live',
        href: 'https://barfoo.org/news/optimoId',
        referrer: null,
      },
      assertion: 'should return isUK as true if tld isnt .com',
    },

    {
      input: {
        bbcOrigin: null,
        service: 'news',
        articleData: inputArticleData,
      },
      windowValues: {
        origin: 'https://barfoo.org',
        href: null,
        referrer: null,
      },
      expected: {
        isUK: true,
        origin: 'https://barfoo.org',
        env: 'live',
        href: 'https://barfoo.org/news/optimoId',
        referrer: null,
      },
      assertion: 'should return isUK as true if tld isnt .com',
    },
  ];

  tests.forEach(({ input, windowValues, expected, assertion }) => {
    it(assertion, () => {
      setWindowValue('location', {
        origin: windowValues.origin,
        href: windowValues.href,
      });

      Object.defineProperty(window.document, 'referrer', {
        configurable: true,
        value: windowValues.referrer,
      });

      const getOriginContext = require('./getOriginContext').default; // eslint-disable-line global-require

      const { bbcOrigin, service, articleData } = input;

      expect(getOriginContext(bbcOrigin, service, articleData)).toEqual(
        expected,
      );
    });
  });
});
