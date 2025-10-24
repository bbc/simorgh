describe('getOriginContext', () => {
  beforeEach(() => {
    process.env.SIMORGH_APP_ENV = 'test';
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  const tests = [
    {
      bbcOrigin: undefined,
      location: undefined,
      expected: { origin: 'https://www.bbc.co.uk' },
      assertion: 'should return defaults if no origin can be found',
    },
    {
      bbcOrigin: undefined,
      location: 'https://beepboop.com',
      expected: { origin: 'https://beepboop.com' },
      assertion:
        'should return origin based off of location if bbcOrigin isnt provided',
    },
  ];

  tests.forEach(({ bbcOrigin, location, expected, assertion }) => {
    it(assertion, () => {
      jest
        .spyOn(window.location, 'origin', 'get')
        // @ts-expect-error location can be undefined
        .mockImplementation(() => location);

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const getOriginContext = require('./index').default; // eslint-disable-line global-require

      expect(getOriginContext(bbcOrigin)).toEqual(expected);
    });
  });
});

describe('getOriginContext - localhost', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const getOriginContext = require('./index').default; // eslint-disable-line global-require

  beforeEach(() => {
    process.env.SIMORGH_APP_ENV = 'local';
    process.env.SIMORGH_BASE_URL = 'http://localhost:7080';
  });

  const localScenarios = [
    {
      description: 'should return test if local & undefined bbcOrigin',
      bbcOrigin: undefined,
      expected: {
        origin: 'http://localhost:7080',
      },
    },
    {
      description: 'should return bbcOrigin if local & bbcOrigin is defined',
      bbcOrigin: 'https://foobar.co.uk',
      expected: {
        origin: 'https://foobar.co.uk',
      },
    },
  ];

  localScenarios.forEach(({ bbcOrigin, description, expected }) => {
    it(description, () => {
      expect(getOriginContext(bbcOrigin)).toEqual(expected);
    });
  });
});
