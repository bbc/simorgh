import {
  setWindowValue,
  resetWindowValue,
} from '../../../testHelpers/setWindowValue';

const windowLocation = window.location;

describe('getInitialData', () => {
  afterEach(() => {
    resetWindowValue('location', windowLocation);
  });

  const tests = [
    {
      bbcOrigin: undefined,
      location: undefined,
      expected: { isUK: true, origin: 'https://www.bbc.co.uk' },
      assertion: 'should return defaults if no origin can be found',
    },
    {
      bbcOrigin: 'https://foobar.com',
      location: 'https://beepboop.co.uk',
      expected: { isUK: false, origin: 'https://foobar.com' },
      assertion:
        'should return isUK and origin based off of bbcOrigin if provided',
    },
    {
      bbcOrigin: undefined,
      location: 'https://beepboop.com',
      expected: { isUK: false, origin: 'https://beepboop.com' },
      assertion:
        'should return isUK and origin based off of location if bbcOrigin isnt provided',
    },
    {
      bbcOrigin: 'https://beepboop.org',
      location: 'https://beepboop.org',
      expected: { isUK: true, origin: 'https://beepboop.org' },
      assertion: 'should return isUK as true if tld isnt .com',
    },
  ];

  tests.forEach(({ bbcOrigin, location, expected, assertion }) => {
    it(assertion, () => {
      setWindowValue('location', {
        origin: location,
      });

      const getOriginContext = require('./getOriginContext').default; // eslint-disable-line global-require

      expect(getOriginContext(bbcOrigin)).toEqual(expected);
    });
  });
});
