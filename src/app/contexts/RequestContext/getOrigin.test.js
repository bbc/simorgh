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
      location: undefined,
      expected: 'https://www.bbc.co.uk',
      assertion: 'should return defaults if no origin can be found',
    },
    {
      bbcOrigin: 'https://foobar.com',
      location: 'https://beepboop.co.uk',
      expected: 'https://foobar.com',
      assertion:
        'should return isUK and origin based off of bbcOrigin if provided',
    },
    {
      bbcOrigin: undefined,
      location: 'https://beepboop.com',
      expected: 'https://beepboop.com',
      assertion:
        'should return isUK and origin based off of location if bbcOrigin isnt provided',
    },
    {
      bbcOrigin: 'https://beepboop.org',
      location: 'https://beepboop.org',
      expected: 'https://beepboop.org',
      assertion: 'should return isUK as true if tld isnt .com',
    },
  ];

  tests.forEach(({ bbcOrigin, location, expected, assertion }) => {
    it(assertion, () => {
      setWindowValue('location', {
        origin: location,
      });

      const getOrigin = require('./getOrigin').default; // eslint-disable-line global-require

      expect(getOrigin(bbcOrigin)).toEqual(expected);
    });
  });
});
