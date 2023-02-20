import { getCanonicalUrl, getPassportHome, isValidPassportHome } from '.';

describe('getPassportHome', () => {
  const data = {
    metadata: {
      passport: {
        home: 'http://www.bbc.co.uk/ontologies/passport/home/News',
      },
    },
  };

  const invalidData = {
    metadata: {
      passport: {},
    },
  };

  it('should return a valid service when a valid passport object is passed', () => {
    const homeService = getPassportHome(data);

    expect(homeService).toEqual('news');
  });

  it('should return null when an empty or null object is passed', () => {
    const homeService = getPassportHome({});

    expect(homeService).toEqual(null);
  });

  it('should return null if home is not in the passport object', () => {
    const homeService = getPassportHome(invalidData);

    expect(homeService).toEqual(null);
  });
});

describe('isValidPassportHome', () => {
  it('should give true for same value', () => {
    expect(isValidPassportHome('yoruba', 'yoruba')).toEqual(true);
  });

  it('should give true with the override', () => {
    expect(isValidPassportHome('yoruba', 'igbo', ['YORUBA'])).toEqual(true);
  });

  it('should give false with invalid overrides', () => {
    expect(isValidPassportHome('yoruba', 'igbo', ['IGBO'])).toEqual(false);
  });

  it('should give false for different values', () => {
    expect(isValidPassportHome('yoruba', 'igbo')).toEqual(false);
  });

  it('should give true for null passportHome', () => {
    expect(isValidPassportHome(null, 'portuguese')).toEqual(true);
  });

  it('should give true for null service', () => {
    expect(isValidPassportHome('brasil', null, ['brasil'])).toEqual(true);
  });

  it('should give true for null passportHome with overrides', () => {
    expect(isValidPassportHome(null, 'portuguese', ['brasil'])).toEqual(true);
  });
});

describe('getCanonicalURL', () => {
  const data = {
    data: {
      article: {
        metadata: {
          locators: {
            canonicalUrl:
              'https://www.bbc.com/sport/judo/articles/cj80n66ddnko',
          },
        },
      },
    },
  };

  const invalidData = {
    data: {
      article: {
        metadata: {
          locators: {},
        },
      },
    },
  };

  it('should return a valid service when a valid canonical object is passed', () => {
    const canonicalUrl = getCanonicalUrl(data);

    expect(canonicalUrl).toEqual('/sport/judo/articles/cj80n66ddnko');
  });

  it('should return null when an empty or null object is passed', () => {
    const canonicalUrl = getCanonicalUrl({});

    expect(canonicalUrl).toEqual(null);
  });

  it('should return null if home is not in the canonical object', () => {
    const canonicalUrl = getCanonicalUrl(invalidData);

    expect(canonicalUrl).toEqual(null);
  });
});
