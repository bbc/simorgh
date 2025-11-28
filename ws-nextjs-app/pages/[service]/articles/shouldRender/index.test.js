import shouldRender from '.';

const validPortugueseData = {
  pageData: {
    metadata: {
      passport: {
        home: 'brasil',
      },
    },
  },
  status: 200,
};

const noPassport = {
  pageData: {},
  status: 200,
};

const invalidPortugueseData = {
  pageData: {
    metadata: {
      passport: {
        home: 'brasil',
      },
    },
  },
  status: 404,
};

jest.mock('#app/contexts/ServiceContext', () => {
  const mockReact = jest.requireActual('react');
  return jest.fn().mockImplementation(
    mockReact.createContext({
      passportHomes: ['brasil'],
    }),
  );
});

describe('passport home override', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match passport home override', () => {
    const service = 'portuguese';
    const result = shouldRender(validPortugueseData, service, ['brasil']);
    expect(result).toEqual({
      hasRequestSucceeded: true,
      status: 200,
    });
  });

  it('should NOT match passport home override', () => {
    const service = 'portuguese';
    const result = shouldRender(validPortugueseData, service, ['xyz']);
    expect(result).toEqual({
      hasRequestSucceeded: false,
      status: 404,
    });
  });

  describe('no passportHomeOverride', () => {
    it('should NOT match passport home override', () => {
      const service = 'portuguese';
      const result = shouldRender(validPortugueseData, service);
      expect(result).toEqual({
        hasRequestSucceeded: false,
        status: 404,
      });
    });
  });

  describe('null passportHomeOverride', () => {
    it('should NOT match passport home override', () => {
      const service = 'portuguese';
      const result = shouldRender(validPortugueseData, service, null);
      expect(result).toEqual({
        hasRequestSucceeded: false,
        status: 404,
      });
    });
  });

  describe('data without passport', () => {
    describe('null override', () => {
      it('should NOT match', () => {
        const service = 'portuguese';
        const result = shouldRender(noPassport, service, null);
        expect(result).toEqual({
          hasRequestSucceeded: true,
          status: 200,
        });
      });
    });

    describe('empty override', () => {
      it('should NOT match', () => {
        const service = 'portuguese';
        const result = shouldRender(noPassport, service, []);
        expect(result).toEqual({
          hasRequestSucceeded: true,
          status: 200,
        });
      });
    });
  });

  it('should return 404 status', () => {
    const service = 'portuguese';
    const result = shouldRender(invalidPortugueseData, service, ['brasil']);
    expect(result).toEqual({
      hasRequestSucceeded: false,
      status: 404,
    });
  });
});
