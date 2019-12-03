import { setWindowValue, resetWindowValue } from '@bbc/psammead-test-helpers';

const windowLocation = window.location;

describe('getOriginContext', () => {
  beforeEach(() => {
    process.env.APP_ENV = 'test';
  });
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
      assertion: 'should return origin based off of bbcOrigin if provided',
    },
    {
      bbcOrigin: undefined,
      location: 'https://beepboop.com',
      expected: 'https://beepboop.com',
      assertion:
        'should return origin based off of location if bbcOrigin isnt provided',
    },
  ];

  tests.forEach(({ bbcOrigin, location, expected, assertion }) => {
    it(assertion, () => {
      setWindowValue('location', {
        origin: location,
      });

      const getOriginContext = require('./index').default; // eslint-disable-line global-require

      expect(getOriginContext(bbcOrigin)).toEqual(expected);
    });
  });
});

describe('getOriginContext - localhost', () => {
  const getOriginContext = require('./index').default; // eslint-disable-line global-require

  beforeEach(() => {
    process.env.APP_ENV = 'local';
    process.env.SIMORGH_BASE_URL = 'http://localhost:7080';
  });

  const localScenarios = [
    {
      description: 'should return test if local & undefined bbcOrigin',
      bbcOrigin: undefined,
      expected: 'http://localhost:7080',
    },
    {
      description: 'should return bbcOrigin if local & bbcOrigin is defined',
      bbcOrigin: 'https://foobar.co.uk',
      expected: 'https://foobar.co.uk',
    },
  ];

  localScenarios.forEach(({ bbcOrigin, description, expected }) => {
    it(description, () => {
      expect(getOriginContext(bbcOrigin)).toEqual(expected);
    });
  });
});
