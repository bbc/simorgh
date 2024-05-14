import { Article } from '#app/models/types/optimo';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { advertisingAllowed, isSfv } from './paramChecks';

describe('advertisingAllowed', () => {
  it('returns true when advertising is allowed on CPS Assets', () => {
    const articleDataSample = {
      metadata: {
        options: {
          allowAdvertising: true,
        },
      },
    };
    const actual = advertisingAllowed(
      'cpsAsset',
      articleDataSample as unknown as Article,
    );
    expect(actual).toBe(true);
  });

  it('returns true when advertising is allowed on Optimo articles', () => {
    const articleDataSample = {
      metadata: {
        allowAdvertising: true,
      },
    };
    const actual = advertisingAllowed(
      ARTICLE_PAGE,
      articleDataSample as unknown as Article,
    );
    expect(actual).toBe(true);
  });

  it('returns false otherwise', () => {
    const articleDataSample = {};
    const actual = advertisingAllowed(
      ARTICLE_PAGE,
      articleDataSample as unknown as Article,
    );
    expect(actual).toBe(false);
  });
});

describe('isSfv', () => {
  it('returns true when consumableAsSFV is true', () => {
    const articleDataSample = {
      metadata: {
        consumableAsSFV: true,
      },
    };
    const actual = isSfv(articleDataSample as unknown as Article);
    expect(actual).toBe(true);
  });

  it('returns false otherwise', () => {
    const articleDataSample = {};
    const actual = isSfv(articleDataSample as unknown as Article);
    expect(actual).toBe(false);
  });
});
