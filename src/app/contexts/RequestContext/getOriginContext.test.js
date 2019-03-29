import {
  setWindowValue,
  resetWindowValue,
} from '../../helpers/tests/setWindowValue';

const windowLocation = window.location;

describe('getInitialData', () => {
  afterEach(() => {
    resetWindowValue('location', windowLocation);
  });

  const tests = [
    {
      bbcOrigin: undefined,
      origin: undefined,
      expected: { isUK: true, origin: 'https://www.bbc.co.uk' },
      assertion: 'should return defaults if no origin can be found',
    },
    {
      bbcOrigin: 'https://foobar.com',
      origin: 'https://beepboop.co.uk',
      expected: { isUK: false, origin: 'https://foobar.com' },
      assertion:
        'should return isUK and origin based off of bbcOrigin if provided',
    },
    {
      bbcOrigin: undefined,
      origin: 'https://beepboop.com',
      expected: { isUK: false, origin: 'https://beepboop.com' },
      assertion:
        'should return isUK and origin based off of origin if bbcOrigin isnt provided',
    },
    {
      bbcOrigin: 'https://beepboop.org',
      origin: 'https://beepboop.org',
      expected: { isUK: true, origin: 'https://beepboop.org' },
      assertion: 'should return isUK as true if tld isnt .com',
    },
  ];

  tests.forEach(({ bbcOrigin, origin, expected, assertion }) => {
    it(assertion, () => {
      setWindowValue('location', {
        origin,
      });

      const getOriginContext = require('./getOriginContext').default; // eslint-disable-line global-require

      expect(getOriginContext(bbcOrigin)).toEqual(expected);
    });
  });
});
