import {
  LIVE_PAGE,
  UGC_PAGE,
  AV_EMBEDS,
  DOWNLOADS_PAGE,
  ARTICLE_PAGE,
} from '#app/routes/utils/pageTypes';
import derivePageType from '.';

describe('derivePageType', () => {
  it("should return LIVE_PAGE if pathname includes 'live'", () => {
    const pathname = '/burmese/live/xxxxxxxxx';
    const result = derivePageType(pathname);
    expect(result).toEqual(LIVE_PAGE);
  });

  it("should return UGC_PAGE if pathname includes 'send'", () => {
    const pathname = '/burmese/send/xxxxxxxxx';
    const result = derivePageType(pathname);
    expect(result).toEqual(UGC_PAGE);
  });

  it("should return AV_EMBEDS if pathname includes 'av-embeds'", () => {
    const pathname = '/burmese/av-embeds/xxxxxxxxx';
    const result = derivePageType(pathname);
    expect(result).toEqual(AV_EMBEDS);
  });

  it("should return DOWNLOADS_PAGE if pathname includes 'downloads'", () => {
    const pathname = '/burmese/downloads/xxxxxxxxx';
    const result = derivePageType(pathname);
    expect(result).toEqual(DOWNLOADS_PAGE);
  });

  it('should return ARTICLE_PAGE if pathname matches Optimo ID pattern', () => {
    const pathname = '/burmese/articles/c0000000000o';
    const result = derivePageType(pathname);
    expect(result).toEqual(ARTICLE_PAGE);
  });

  it('should return ARTICLE_PAGE if pathname matches CPS ID pattern', () => {
    const pathname = '/burmese/instituional-1234567';
    const result = derivePageType(pathname);
    expect(result).toEqual(ARTICLE_PAGE);
  });

  it('should return Unknown if pathname does not include live or send', () => {
    const pathname = '/burmese/xxxxxxxxx';
    const result = derivePageType(pathname);
    expect(result).toEqual('Unknown');
  });

  it('should strip our query params from the pathname', () => {
    const pathname = '/burmese/live/xxxxxxxxx?foo=bar';
    const result = derivePageType(pathname);
    expect(result).toEqual(LIVE_PAGE);
  });
});
