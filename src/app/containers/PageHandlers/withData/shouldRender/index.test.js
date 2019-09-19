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

describe('passport home override', () => {
  jest.mock('../../../../contexts/ServiceContext', () => {
    const mockReact = jest.requireActual('react');
    return jest.fn().mockImplementation(
      mockReact.createContext({
        passportHomes: ['brasil'],
      }),
    );
  });

  it('should match passport home override', () => {
    const service = 'portuguese';
    const { hasData200StatusAndCorrectService, status } = shouldRender(
      validPortugueseData,
      service,
      ['brasil'],
    );
    expect(status).toEqual(200);
    expect(hasData200StatusAndCorrectService).toEqual(true);
  });

  it('should NOT match passport home override', () => {
    const service = 'portuguese';
    const { hasData200StatusAndCorrectService, status } = shouldRender(
      validPortugueseData,
      service,
      ['xyz'],
    );
    expect(status).toEqual(404);
    expect(hasData200StatusAndCorrectService).toEqual(false);
  });

  describe('no passportHomeOverride', () => {
    it('should NOT match passport home override', () => {
      const service = 'portuguese';
      const { hasData200StatusAndCorrectService, status } = shouldRender(
        validPortugueseData,
        service,
      );
      expect(status).toEqual(404);
      expect(hasData200StatusAndCorrectService).toEqual(false);
    });
  });

  describe('null passportHomeOverride', () => {
    it('should NOT match passport home override', () => {
      const service = 'portuguese';
      const { hasData200StatusAndCorrectService, status } = shouldRender(
        validPortugueseData,
        service,
        null,
      );
      expect(status).toEqual(404);
      expect(hasData200StatusAndCorrectService).toEqual(false);
    });
  });

  it('should return 404 status', () => {
    const service = 'portuguese';
    const { hasData200StatusAndCorrectService, status } = shouldRender(
      invalidPortugueseData,
      service,
      ['brasil'],
    );
    expect(status).toEqual(404);
    expect(hasData200StatusAndCorrectService).toEqual(false);
  });
});
