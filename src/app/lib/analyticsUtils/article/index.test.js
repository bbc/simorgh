const {
  getContentId,
  getPageIdentifier,
  getLanguage,
  getPromoHeadline,
  getNationsProducer,
} = require('.');

describe('getPageIdentifier', () => {
  const goodData = {
    metadata: {
      analyticsLabels: {
        page: 'service.articles.desiredValue.page',
      },
    },
  };

  const badData = {
    metadata: {
      analyticsLabels: {},
    },
  };

  it('should construct page identifier', () => {
    const pageIdentifier = getPageIdentifier(goodData);

    expect(pageIdentifier).toEqual('service.articles.desiredValue.page');
  });

  it('should return null if metadata.analyticsLabels.page does not exist', () => {
    const pageIdentifier = getPageIdentifier(badData);

    expect(pageIdentifier).toEqual(null);
  });
});

describe('getContentId', () => {
  it('should find value in good data', () => {
    const goodData = {
      metadata: {
        analyticsLabels: {
          contentId: 'urn:bbc:optimo:asset:c0g992jmmkko',
        },
      },
    };

    const contentId = getContentId(goodData);

    expect(contentId).toEqual('urn:bbc:optimo:asset:c0g992jmmkko');
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

describe('getNationsProducer', () => {
  it('should find value in good data', () => {
    const hasNationsProducer = {
      metadata: {
        analyticsLabels: {
          nations_producer: 'england',
        },
      },
    };

    const nationsProducer = getNationsProducer(hasNationsProducer);

    expect(nationsProducer).toEqual('england');
  });

  it('should return null in bad data', () => {
    const noNationsProducer = {
      metadata: {
        analyticsLabels: {},
      },
    };

    const nationsProducer = getNationsProducer(noNationsProducer);

    expect(nationsProducer).toEqual(null);
  });
});
