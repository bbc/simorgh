const {
  getPageIdentifier,
  getOptimoUrn,
  getLanguage,
  getPromoHeadline,
  getPublishedTime,
  getThingAttributes,
  getArticleHomeService,
} = require('./article');

describe('getPageIdentifier', () => {
  const goodData = {
    metadata: {
      locators: {
        optimoUrn: 'prefix:desiredValue',
      },
    },
  };

  const badData = {
    metadata: {
      locators: {
        unknownUrn: 'prefix:missedValue',
      },
    },
  };

  it('should construct page identifier', () => {
    const optimoUrn = getPageIdentifier('service', goodData);

    expect(optimoUrn).toEqual('health::service.articles.desiredValue.page');
  });

  it('should use "unknown" if optimo id is unknown', () => {
    const optimoUrn = getPageIdentifier('service', badData);

    expect(optimoUrn).toEqual('health::service.articles.unknown.page');
  });

  it('should use null if service is null', () => {
    const optimoUrn = getPageIdentifier(null, goodData);

    expect(optimoUrn).toEqual('health::news.articles.desiredValue.page');
  });
});

describe('getOptimoUrn', () => {
  it('should find value in good data', () => {
    const goodData = {
      metadata: {
        locators: {
          optimoUrn: 'desired value',
        },
      },
    };

    const optimoUrn = getOptimoUrn(goodData);

    expect(optimoUrn).toEqual('desired value');
  });

  it('should return null in bad data', () => {
    const badData = {
      metadata: {
        locators: {
          unknownUrn: 'missed value',
        },
      },
    };

    const optimoUrn = getOptimoUrn(badData);

    expect(optimoUrn).toEqual(null);
  });
});

describe('getLanguage', () => {
  it('should find value in good data', () => {
    const goodData = {
      metadata: {
        passport: {
          language: 'desired value',
        },
      },
    };

    const language = getLanguage(goodData);

    expect(language).toEqual('desired value');
  });

  it('should return null in bad data', () => {
    const badData = {
      metadata: {
        passport: {
          unknown: 'missed value',
        },
      },
    };

    const language = getLanguage(badData);

    expect(language).toEqual(null);
  });
});

describe('getPromoHeadline', () => {
  it('should find value in good data', () => {
    const goodData = {
      promo: {
        headlines: {
          seoHeadline: 'desired value',
        },
      },
    };

    const promoHeadline = getPromoHeadline(goodData);

    expect(promoHeadline).toEqual('desired value');
  });

  it('should return null in bad data', () => {
    const badData = {
      promo: {
        headlines: {
          unknown: 'missed value',
        },
      },
    };

    const promoHeadline = getPromoHeadline(badData);

    expect(promoHeadline).toEqual(null);
  });
});

describe('getPublishedTime', () => {
  const data = {
    metadata: {
      firstPublished: 946688461000,
      invalidDate: 'foobar',
    },
  };

  it('should find value in good data', () => {
    const publishedTime = getPublishedTime('firstPublished', data);

    expect(publishedTime).toEqual('2000-01-01T01:01:01.000Z');
  });

  it('should return null if type not found', () => {
    const publishedTime = getPublishedTime('foobar', data);

    expect(publishedTime).toEqual(null);
  });

  it('should return null if timestamp is invalid', () => {
    const publishedTime = getPublishedTime('invalidDate', data);

    expect(publishedTime).toEqual(null);
  });
});

describe('getThingAttributes', () => {
  const data = {
    metadata: {
      tags: {
        about: [{ thingId: 'foo' }, { thingId: 'bar' }],
      },
    },
  };

  it('should find value in good data', () => {
    const thingAttributes = getThingAttributes('thingId', data);

    expect(thingAttributes).toEqual('foo~bar');
  });

  it('should return null if type not found', () => {
    const thingAttributes = getThingAttributes('fooBar', data);

    expect(thingAttributes).toEqual(null);
  });

  it('should return null if invalid data', () => {
    const thingAttributes = getThingAttributes('fooBar', {});

    expect(thingAttributes).toEqual(null);
  });
});

describe('getArticleHomeService', () => {
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

  it('should return valid service in good data', () => {
    const homeService = getArticleHomeService(data);

    expect(homeService).toEqual('news');
  });

  it('should return null if data is null or empty', () => {
    const homeService = getArticleHomeService({});

    expect(homeService).toEqual(null);
  });

  it('should return null if home is not in data', () => {
    const homeService = getArticleHomeService(invalidData);

    expect(homeService).toEqual(null);
  });
});
