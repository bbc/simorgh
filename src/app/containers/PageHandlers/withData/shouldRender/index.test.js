import shouldRender from '.';
import { isValidPassportHome } from '../../../../lib/utilities/passport';

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

jest.mock('../../../../lib/utilities/passport', () => {
  const { getPassportHome } = jest.requireActual(
    '../../../../lib/utilities/passport',
  );
  return {
    getPassportHome,
    isValidPassportHome: jest.fn(),
  };
});

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
    shouldRender(validPortugueseData, service, ['brasil']);
    expect(isValidPassportHome).toHaveBeenCalled();
    expect(isValidPassportHome).toHaveBeenCalledWith('brasil', 'portuguese', [
      'brasil',
    ]);
  });

  it('should NOT match passport home override', () => {
    const service = 'portuguese';
    shouldRender(validPortugueseData, service, ['xyz']);
    expect(isValidPassportHome).toHaveBeenCalled();
    expect(isValidPassportHome).toHaveBeenCalledWith('brasil', 'portuguese', [
      'xyz',
    ]);
  });

  describe('no passportHomeOverride', () => {
    it('should NOT match passport home override', () => {
      const service = 'portuguese';
      shouldRender(validPortugueseData, service);
      expect(isValidPassportHome).toHaveBeenCalled();
      expect(isValidPassportHome).toHaveBeenCalledWith(
        'brasil',
        'portuguese',
        [],
      );
    });
  });

  describe('null passportHomeOverride', () => {
    it('should NOT match passport home override', () => {
      const service = 'portuguese';
      shouldRender(validPortugueseData, service, null);
      expect(isValidPassportHome).toHaveBeenCalled();
      expect(isValidPassportHome).toHaveBeenCalledWith(
        'brasil',
        'portuguese',
        null,
      );
    });
  });

  it('should return 404 status', () => {
    const service = 'portuguese';
    shouldRender(invalidPortugueseData, service, ['brasil']);
    expect(isValidPassportHome).not.toHaveBeenCalled();
  });
});
