import {
  LIVE_PAGE,
  UGC_PAGE,
  AV_EMBEDS,
  DOWNLOADS_PAGE,
  ARTICLE_PAGE,
  HOME_PAGE,
  UNKNOWN_PAGE,
  TOPIC_PAGE,
  AUDIO_PAGE,
  TV_PAGE,
  MOST_READ_PAGE,
} from '#app/routes/utils/pageTypes';
import derivePageType from '.';

describe('derivePageType', () => {
  it('should strip out query params from the pathname', () => {
    const pathname = '/pidgin/live/cew7pxl4p4xt?foo=bar';
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

  it("should return LIVE_PAGE if pathname is a TIPO ID and includes 'live'", () => {
    const pathname = '/pidgin/live/cew7pxl4p4xt';
    const result = derivePageType(pathname);
    expect(result).toEqual(LIVE_PAGE);
  });

  it("should return LIVE_PAGE if pathname is a CPS ID and includes 'live'", () => {
    const pathname = '/zhongwen/live/68720252/simp';
    const result = derivePageType(pathname);
    expect(result).toEqual(LIVE_PAGE);
  });

  it("should return UGC_PAGE if pathname is a UGC ID and includes 'send'", () => {
    const pathname = '/pidgin/send/u50853489';
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

  it('should return AUDIO_PAGE if pathname includes `podcast`', () => {
    const pathname = '/arabic/podcasts/p02pc9qc/p08wtg4d';
    const result = derivePageType(pathname);
    expect(result).toEqual(AUDIO_PAGE);
  });

  it('should return AUDIO_PAGE if pathname includes `radio`', () => {
    const pathname = '/arabic/bbc_arabic_radio/w3ct01yb`';
    const result = derivePageType(pathname);
    expect(result).toEqual(AUDIO_PAGE);
  });

  it('should return AUDIO_PAGE if pathname includes `programmes`', () => {
    const pathname = '/arabic/bbc_arabic_radio/programmes/p02pc9qc';
    const result = derivePageType(pathname);
    expect(result).toEqual(AUDIO_PAGE);
  });

  it('should return TV_PAGE for on demand tv brand paths', () => {
    const pathname = '/hindi/bbc_hindi_tv/tv_programmes/w13xttlw';
    const result = derivePageType(pathname);
    expect(result).toEqual(TV_PAGE);
  });

  it('should return TV_PAGE for on demand tv episode paths', () => {
    const pathname = '/hausa/bbc_hausa_tv/tv/w172yjj7rfhxp1p';
    const result = derivePageType(pathname);
    expect(result).toEqual(TV_PAGE);
  });

  it("should return TOPIC_PAGE if pathname includes 'topic'", () => {
    const pathname = '/pidgin/topics/c95y35941vrt';
    const result = derivePageType(pathname);
    expect(result).toEqual(TOPIC_PAGE);
  });

  it('should return MOST_READ_PAGE if pathname includes popular/read', () => {
    const pathname = '/pidgin/popular/read';
    const result = derivePageType(pathname);
    expect(result).toEqual(MOST_READ_PAGE);
  });

  it('should return Unknown if pathname does not include live or send', () => {
    const pathname = '/pidgin/xxxxxxxxx';
    const result = derivePageType(pathname);
    expect(result).toEqual(UNKNOWN_PAGE);
  });
});
