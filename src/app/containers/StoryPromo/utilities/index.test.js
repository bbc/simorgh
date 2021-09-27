import { isMap, isPgl, getHeadingTagOverride } from '.';
import {
  MOST_WATCHED_PAGE,
  PHOTO_GALLERY_PAGE,
  MEDIA_ASSET_PAGE,
} from '#app/routes/utils/pageTypes';

describe('isMap', () => {
  it('should return true if cpsType is MAP', () => {
    const map = { cpsType: MEDIA_ASSET_PAGE };
    expect(isMap(map)).toBe(true);
  });

  it('should return true if media key exists', () => {
    const map = { media: {}, cpsType: 'OTH' };
    expect(isMap(map)).toBe(true);
  });

  it("should return false if media doesn't exist and cpsType isn't MAP", () => {
    const pgl = { cpsType: PHOTO_GALLERY_PAGE };
    expect(isMap(pgl)).toBe(false);
  });

  it('should return false if item is undefined', () => {
    expect(isMap(null)).toBe(false);
    expect(isMap(undefined)).toBe(false);
  });
});

describe('isPgl', () => {
  it('should return true if cpsType is PGL', () => {
    const pgl = { cpsType: PHOTO_GALLERY_PAGE };
    expect(isPgl(pgl)).toBe(true);
  });

  it("should return false if cpsType isn't PGL", () => {
    const map = { cpsType: MEDIA_ASSET_PAGE };
    expect(isPgl(map)).toBe(false);
  });

  it('should return false if item is undefined', () => {
    expect(isPgl(null)).toBe(false);
    expect(isPgl(undefined)).toBe(false);
  });
});

describe('getHeadingTagOverride', () => {
  it('should return h2 if page type is mostWatched', () => {
    const pageType = MOST_WATCHED_PAGE;
    const isContentTypeGuide = false;
    expect(
      getHeadingTagOverride({
        pageType,
        isContentTypeGuide,
      }),
    ).toEqual('h2');
  });

  it('should return div if isContentTypeGuide is true', () => {
    const pageType = PHOTO_GALLERY_PAGE;
    const isContentTypeGuide = true;
    expect(getHeadingTagOverride({ pageType, isContentTypeGuide })).toEqual(
      'div',
    );
  });

  it('should return null if page type is not mostWatched and other args are false', () => {
    const pageType = PHOTO_GALLERY_PAGE;
    const isContentTypeGuide = false;
    expect(getHeadingTagOverride({ pageType, isContentTypeGuide })).toBe(null);
  });
});
