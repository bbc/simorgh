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

const articleDataWithoutKeySummaryPointsTagging = {
  pageData: {},
  status: 200,
};

const articleDataWithKeySummaryPointsTagging = {
  pageData: {
    metadata: {
      passport: {
        taggings: [
          {
            predicate: 'http://www.bbc.co.uk/ontologies/creativework/format',
            value:
              'http://www.bbc.co.uk/things/6b6d33cc-3e32-43e6-b06f-d43e71d44bad#id',
          },
        ],
      },
    },
  },
  status: 200,
};

jest.mock('#contexts/ServiceContext', () => {
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
      hasRequestSucceeded: true,
      status: 200,
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
      hasRequestSucceeded: false,
      status: 404,
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
        hasRequestSucceeded: false,
        status: 404,
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
        hasRequestSucceeded: false,
        status: 404,
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
          hasRequestSucceeded: true,
          status: 200,
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
          hasRequestSucceeded: true,
          status: 200,
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
      hasRequestSucceeded: false,
      status: 404,
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
      hasRequestSucceeded: true,
      status: 200,
    });
  });

  it('should not render sport home article without discipline', () => {
    const pathname = '/sport/articles/cj80n66ddnko';
    const service = 'sport';
    const result = shouldRender(validSportData, service, pathname, pageType);
    expect(result).toEqual({
      hasRequestSucceeded: false,
      status: 404,
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
      hasRequestSucceeded: true,
      status: 200,
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
      hasRequestSucceeded: true,
      status: 200,
    });
  });
});

describe('article page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const pageType = 'article';
  const pathname = 'pidgin/articles/cj80n66ddnko';
  const service = 'pidgin';

  it('should render article page when "Key/Summary Points" tagging is not set', () => {
    const result = shouldRender(
      articleDataWithoutKeySummaryPointsTagging,
      service,
      pathname,
      pageType,
    );

    expect(result).toEqual({
      hasRequestSucceeded: true,
      status: 200,
    });
  });

  it('should render a 404 for an article page when "Key/Summary Points" tagging is set', () => {
    const result = shouldRender(
      articleDataWithKeySummaryPointsTagging,
      service,
      pathname,
      pageType,
    );

    expect(result).toEqual({
      hasRequestSucceeded: false,
      status: 404,
    });
  });
});
