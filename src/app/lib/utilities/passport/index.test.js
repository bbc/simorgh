import {
  getCanonicalUrl,
  matchesCanonicalUrl,
  getPassportHome,
  isValidPassportHome,
} from '.';

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
  const dataWithGlobalDomain = {
    metadata: {
      locators: {
        canonicalUrl: 'https://www.bbc.com/sport/judo/articles/cj80n66ddnko',
      },
    },
  };

  const dataWithUkDomain = {
    metadata: {
      locators: {
        canonicalUrl: 'https://www.bbc.co.uk/sport/judo/articles/cj80n66ddnko',
      },
    },
  };

  const invalidData = {
    metadata: {
      locators: {},
    },
  };

  it('should return a valid service when a valid canonical object is passed with a global domain', () => {
    const canonicalUrl = getCanonicalUrl(dataWithGlobalDomain);

    expect(canonicalUrl).toEqual('/sport/judo/articles/cj80n66ddnko');
  });

  it('should return a valid service when a valid canonical object is passed with a uk domain', () => {
    const canonicalUrl = getCanonicalUrl(dataWithUkDomain);

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

describe('matchesCanonicalUrl', () => {
  const canonicalUrl = '/sport/judo/articles/cj80n66ddnko';
  const pathName = '/sport/judo/articles/cj80n66ddnko';
  const pathNameAmp = '/sport/judo/articles/cj80n66ddnko.amp';
  const pathNameEnvLive = '/sport/judo/articles/cj80n66ddnko?render_env=live';
  const pathNameNoDiscipline = '/sport/articles/cj80n66ddnko';
  it('should return true when the pathname and canonicalUrl match', () => {
    const isMatch = matchesCanonicalUrl(canonicalUrl, pathName);

    expect(isMatch).toEqual(true);
  });

  it('should return true when the pathname with amp extension and canonicalUrl match', () => {
    const isMatch = matchesCanonicalUrl(canonicalUrl, pathNameAmp);

    expect(isMatch).toEqual(true);
  });

  it('should return true when the pathname with the render live parameter and canonicalUrl match', () => {
    const isMatch = matchesCanonicalUrl(canonicalUrl, pathNameEnvLive);

    expect(isMatch).toEqual(true);
  });
  it('should return false when the pathname and canonicalUrl do not match', () => {
    const isMatch = matchesCanonicalUrl(canonicalUrl, pathNameNoDiscipline);

    expect(isMatch).toEqual(false);
  });
});
