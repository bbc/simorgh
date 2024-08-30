import { ArticlePageProps } from '#app/models/types/optimo';
import {
  getContentId,
  getPageIdentifier,
  getLanguage,
  getPromoHeadline,
  getNationsProducer,
} from '.';

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
    const optimoUrn = getPageIdentifier(
      'news',
      goodData as unknown as ArticlePageProps,
    );

    expect(optimoUrn).toEqual('news.articles.desiredValue.page');
  });

  it('should use "unknown" if optimo id is unknown', () => {
    const optimoUrn = getPageIdentifier(
      'news',
      badData as unknown as ArticlePageProps,
    );

    expect(optimoUrn).toEqual('news.articles.unknown.page');
  });

  it('should use null if service is null', () => {
    // @ts-expect-error - testing null service
    const optimoUrn = getPageIdentifier(null, goodData);

    expect(optimoUrn).toEqual('null.articles.desiredValue.page');
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
        language: 'desired value',
        passport: {
          language: 'desired value',
        },
      },
    } as unknown as ArticlePageProps;

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
    } as unknown as ArticlePageProps;

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
    } as unknown as ArticlePageProps;

    const promoHeadline = getPromoHeadline(goodData);

    expect(promoHeadline).toEqual('desired value');
  });

  it('should return empty string in bad data', () => {
    const badData = {
      promo: {
        headlines: {
          unknown: 'missed value',
        },
      },
    } as unknown as ArticlePageProps;

    const promoHeadline = getPromoHeadline(badData);

    expect(promoHeadline).toEqual('');
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
    } as unknown as ArticlePageProps;

    const nationsProducer = getNationsProducer(hasNationsProducer);

    expect(nationsProducer).toEqual('england');
  });

  it('should return null in bad data', () => {
    const noNationsProducer = {
      metadata: {
        analyticsLabels: {},
      },
    } as unknown as ArticlePageProps;

    const nationsProducer = getNationsProducer(noNationsProducer);

    expect(nationsProducer).toEqual(null);
  });
});
