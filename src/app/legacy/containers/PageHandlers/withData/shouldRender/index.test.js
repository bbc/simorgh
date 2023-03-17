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

const validSportData = {
  pageData: {
    metadata: {
      locators: {
        canonicalUrl: 'https://www.bbc.com/sport/judo/articles/cj80n66ddnko',
      },
    },
  },
  status: 200,
};

const validSportDataStoryPage = {
  pageData: {
    metadata: {
      locators: {
        assetUri: '/sport/football/55790817',
      },
      passport: {
        home: 'http://www.bbc.co.uk/ontologies/passport/home/Sport',
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

jest.mock('../../../../../contexts/ServiceContext', () => {
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

  const pathname = 'portuguese/articles/cerj3rk9mmyo';
  const pageType = 'STY';

  it('should match passport home override', () => {
    const service = 'portuguese';
    const result = shouldRender(
      validPortugueseData,
      service,
      pathname,
      pageType,
      ['brasil'],
    );
    expect(result).toEqual({
      hasData200StatusAndCorrectService: true,
      status: 200,
      pageData: validPortugueseData.pageData,
    });
  });

  it('should NOT match passport home override', () => {
    const service = 'portuguese';
    const result = shouldRender(
      validPortugueseData,
      service,
      pathname,
      pageType,
      ['xyz'],
    );
    expect(result).toEqual({
      hasData200StatusAndCorrectService: false,
      status: 404,
      pageData: validPortugueseData.pageData,
    });
  });

  describe('no passportHomeOverride', () => {
    it('should NOT match passport home override', () => {
      const service = 'portuguese';
      const result = shouldRender(
        validPortugueseData,
        service,
        pathname,
        pageType,
      );
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
      const result = shouldRender(
        validPortugueseData,
        service,
        pathname,
        pageType,
        null,
      );
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
        const result = shouldRender(
          noPassport,
          service,
          pathname,
          pageType,
          null,
        );
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
        const result = shouldRender(
          noPassport,
          service,
          pathname,
          pageType,
          [],
        );
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
    const result = shouldRender(
      invalidPortugueseData,
      service,
      pathname,
      pageType,
      ['brasil'],
    );
    expect(result).toEqual({
      hasData200StatusAndCorrectService: false,
      status: 404,
      pageData: invalidPortugueseData.pageData,
    });
  });
});

describe('sport home article', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const pageType = 'article';

  it('should render sport home article with discipline', () => {
    const pathname = '/sport/judo/articles/cj80n66ddnko';
    const service = 'sport';
    const result = shouldRender(validSportData, service, pathname, pageType);
    expect(result).toEqual({
      hasData200StatusAndCorrectService: true,
      status: 200,
      pageData: validSportData.pageData,
    });
  });

  it('should not render sport home article without discipline', () => {
    const pathname = '/sport/articles/cj80n66ddnko';
    const service = 'sport';
    const result = shouldRender(validSportData, service, pathname, pageType);
    expect(result).toEqual({
      hasData200StatusAndCorrectService: false,
      status: 404,
      pageData: validSportData.pageData,
    });
  });
});

describe('sport home story page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const pageType = 'STY';

  it('should render sport home STY page with discipline', () => {
    const pathname = '/sport/football/64704536.amp';
    const service = 'sport';
    const result = shouldRender(
      validSportDataStoryPage,
      service,
      pathname,
      pageType,
    );
    expect(result).toEqual({
      hasData200StatusAndCorrectService: true,
      status: 200,
      pageData: validSportDataStoryPage.pageData,
    });
  });

  it('should render sport home STY page without discipline', () => {
    const pathname = '/sport/64700054.amp';
    const service = 'sport';
    const result = shouldRender(
      validSportDataStoryPage,
      service,
      pathname,
      pageType,
    );
    expect(result).toEqual({
      hasData200StatusAndCorrectService: true,
      status: 200,
      pageData: validSportDataStoryPage.pageData,
    });
  });
});
