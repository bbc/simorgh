const {
  getContentId,
  getPageIdentifier,
  getLanguage,
  getPromoHeadline,
} = require('.');

describe('getPageIdentifier', () => {
  const goodData = {
    metadata: {
      locators: {
        optimoUrn: 'prefix1:prefix2:prefix3:desiredValue',
      },
    },
  };

  const badData = {
    metadata: {
      locators: {
        unknownUrn: 'prefix1:prefix2:prefix3:missedValue',
      },
    },
  };

  it('should construct page identifier', () => {
    const optimoUrn = getPageIdentifier('service', goodData);

    expect(optimoUrn).toEqual('service.articles.desiredValue.page');
  });

  it('should use "unknown" if optimo id is unknown', () => {
    const optimoUrn = getPageIdentifier('service', badData);

    expect(optimoUrn).toEqual('service.articles.unknown.page');
  });

  it('should use null if service is null', () => {
    const optimoUrn = getPageIdentifier(null, goodData);

    expect(optimoUrn).toEqual('null.articles.desiredValue.page');
  });
});

describe('getContentId', () => {
  it('should find value in good data', () => {
    const goodData = {
      metadata: {
        locators: {
          optimoUrn: 'urn:bbc:optimo:asset:c0g992jmmkko',
        },
      },
    };

    const contentId = getContentId(goodData);

    expect(contentId).toEqual('urn:bbc:optimo:c0g992jmmkko');
  });

  it('should return null in bad data', () => {
    const badData = {
      metadata: {
        locators: {
          unknownUrn: 'missed value',
        },
      },
    };

    const contentId = getContentId(badData);

    expect(contentId).toEqual(null);
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
