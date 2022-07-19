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

jest.mock('../../../../contexts/ServiceContext', () => {
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
      hasData200StatusAndCorrectService: true,
      status: 200,
      pageData: validPortugueseData.pageData,
    });
  });

  it('should NOT match passport home override', () => {
    const service = 'portuguese';
    const result = shouldRender(validPortugueseData, service, ['xyz']);
    expect(result).toEqual({
      hasData200StatusAndCorrectService: false,
      status: 404,
      pageData: validPortugueseData.pageData,
    });
  });

  describe('no passportHomeOverride', () => {
    it('should NOT match passport home override', () => {
      const service = 'portuguese';
      const result = shouldRender(validPortugueseData, service);
      expect(result).toEqual({
        hasData200StatusAndCorrectService: false,
        status: 404,
        pageData: validPortugueseData.pageData,
      });
    });
  });

  describe('null passportHomeOverride', () => {
    it('should NOT match passport home override', () => {
      const service = 'portuguese';
      const result = shouldRender(validPortugueseData, service, null);
      expect(result).toEqual({
        hasData200StatusAndCorrectService: false,
        status: 404,
        pageData: validPortugueseData.pageData,
      });
    });
  });

  describe('data without passport', () => {
    describe('null override', () => {
      it('should NOT match', () => {
        const service = 'portuguese';
        const result = shouldRender(noPassport, service, null);
        expect(result).toEqual({
          hasData200StatusAndCorrectService: true,
          status: 200,
          pageData: noPassport.pageData,
        });
      });
    });

    describe('empty override', () => {
      it('should NOT match', () => {
        const service = 'portuguese';
        const result = shouldRender(noPassport, service, []);
        expect(result).toEqual({
          hasData200StatusAndCorrectService: true,
          status: 200,
          pageData: noPassport.pageData,
        });
      });
    });
  });

  it('should return 404 status', () => {
    const service = 'portuguese';
    const result = shouldRender(invalidPortugueseData, service, ['brasil']);
    expect(result).toEqual({
      hasData200StatusAndCorrectService: false,
      status: 404,
      pageData: invalidPortugueseData.pageData,
    });
  });
});
