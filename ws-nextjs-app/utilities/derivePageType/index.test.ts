import {
  LIVE_PAGE,
  UGC_PAGE,
  AV_EMBEDS,
  DOWNLOADS_PAGE,
  ARTICLE_PAGE,
  HOME_PAGE,
  UNKNOWN_PAGE,
} from '#app/routes/utils/pageTypes';
import derivePageType from '.';

describe('derivePageType', () => {
  it('should strip our query params from the pathname', () => {
    const pathname = '/pidgin/live/xxxxxxxxx?foo=bar';
    const result = derivePageType(pathname);
    expect(result).toEqual(LIVE_PAGE);
  });

  it('should return HOME_PAGE for a base service homepage', () => {
    const pathname = '/pidgin';
    const result = derivePageType(pathname);
    expect(result).toEqual(HOME_PAGE);
  });

  it('should return HOME_PAGE for a service variant homepage', () => {
    const pathname = '/serbian/lat';
    const result = derivePageType(pathname);
    expect(result).toEqual(HOME_PAGE);
  });

  it("should return LIVE_PAGE if pathname includes 'live'", () => {
    const pathname = '/pidgin/live/xxxxxxxxx';
    const result = derivePageType(pathname);
    expect(result).toEqual(LIVE_PAGE);
  });

  it("should return UGC_PAGE if pathname includes 'send'", () => {
    const pathname = '/pidgin/send/xxxxxxxxx';
    const result = derivePageType(pathname);
    expect(result).toEqual(UGC_PAGE);
  });

  it("should return AV_EMBEDS if pathname includes 'av-embeds'", () => {
    const pathname = '/pidgin/av-embeds/xxxxxxxxx';
    const result = derivePageType(pathname);
    expect(result).toEqual(AV_EMBEDS);
  });

  it("should return DOWNLOADS_PAGE if pathname includes 'downloads'", () => {
    const pathname = '/korean/downloads';
    const result = derivePageType(pathname);
    expect(result).toEqual(DOWNLOADS_PAGE);
  });

  it('should return ARTICLE_PAGE if pathname matches Optimo ID pattern', () => {
    const pathname = '/pidgin/articles/c0000000000o';
    const result = derivePageType(pathname);
    expect(result).toEqual(ARTICLE_PAGE);
  });

  it('should return ARTICLE_PAGE if pathname matches CPS ID pattern', () => {
    const pathname = '/pidgin/institutional-1234567';
    const result = derivePageType(pathname);
    expect(result).toEqual(ARTICLE_PAGE);
  });

  it('should return Unknown if pathname does not include live or send', () => {
    const pathname = '/pidgin/xxxxxxxxx';
    const result = derivePageType(pathname);
    expect(result).toEqual(UNKNOWN_PAGE);
  });
});
