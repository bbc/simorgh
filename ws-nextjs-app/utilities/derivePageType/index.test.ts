import {
  ARTICLE_PAGE,
  AV_EMBEDS,
  DOWNLOADS_PAGE,
  LIVE_PAGE,
  OFFLINE_PAGE,
  UGC_PAGE,
} from '#app/routes/utils/pageTypes';
import derivePageType from '.';

describe('derivePageType', () => {
  it("should return OFFLINE_PAGE if pathname includes 'offline'", () => {
    const pathname = '/news/offline';
    const result = derivePageType(pathname);
    expect(result).toEqual(OFFLINE_PAGE);
  });

  it("should return UGC_PAGE if pathname includes 'send'", () => {
    const pathname = '/burmese/send/xxxxxxxxx';
    const result = derivePageType(pathname);
    expect(result).toEqual(UGC_PAGE);
  });

  it("should return LIVE_PAGE if pathname includes 'live'", () => {
    const pathname = '/burmese/live/xxxxxxxxx';
    const result = derivePageType(pathname);
    expect(result).toEqual(LIVE_PAGE);
  });

  it("should return AV_EMBEDS if pathname includes 'av-embeds'", () => {
    const pathname = '/news/av-embeds/xxxxxxxxx';
    const result = derivePageType(pathname);
    expect(result).toEqual(AV_EMBEDS);
  });

  it("should return DOWNLOADS_PAGE if pathname includes 'downloads'", () => {
    const pathname = '/korean/downloads';
    const result = derivePageType(pathname);
    expect(result).toEqual(DOWNLOADS_PAGE);
  });

  it('should return ARTICLE_PAGE for Optimo article IDs', () => {
    const pathname = '/news/articles/c0123456789o';
    const result = derivePageType(pathname);
    expect(result).toEqual(ARTICLE_PAGE);
  });

  it('should return Unknown if pathname does not match any pattern', () => {
    const pathname = '/burmese/xxxxxxxxx';
    const result = derivePageType(pathname);
    expect(result).toEqual('Unknown');
  });

  it('should strip query params from the pathname', () => {
    const pathname = '/burmese/live/xxxxxxxxx?foo=bar';
    const result = derivePageType(pathname);
    expect(result).toEqual(LIVE_PAGE);
  });
});
