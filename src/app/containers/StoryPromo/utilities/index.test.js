import { isMap, isPgl, getHeadingTagOverride, buildUniquePromoId } from '.';
import {
  MOST_WATCHED_PAGE,
  PHOTO_GALLERY_PAGE,
  MEDIA_ASSET_PAGE,
} from '#app/routes/utils/pageTypes';
import {
  completeItem,
  standardLinkItem,
  secondaryColumnNoAssetURI,
  secondaryColumnContentType,
} from '../helpers/fixtureData';

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

describe('buildUniquePromoId', () => {
  const labelId = 'test-group-id';
  it('should return id of promo-link with contentType and URI if contentType exists', () => {
    expect(buildUniquePromoId(labelId, secondaryColumnNoAssetURI, 0)).toEqual(
      'promo-test-group-id-news-radiobulletin-1',
    );
  });

  it('should return id using URI if assetURI does not exist', () => {
    expect(buildUniquePromoId(labelId, standardLinkItem, 1)).toEqual(
      'promo-test-group-id-azeri-text-2',
    );
  });

  it('should return id using assetURI does not exist and contentType does not exist', () => {
    expect(buildUniquePromoId(labelId, completeItem, 2)).toEqual(
      'promo-test-group-id-3',
    );
  });

  it('should return id with contentType only if assetURI and URI do not exist', () => {
    expect(buildUniquePromoId(labelId, secondaryColumnContentType, 3)).toEqual(
      'promo-test-group-id-radiobulletin-4',
    );
  });

  it('should sanitise link from item and split from last forward slash', () => {
    expect(
      buildUniquePromoId(
        labelId,
        { locators: { assetUri: 'a/a/ab.b.b@c@c@c' } },
        4,
      ),
    ).toEqual('promo-test-group-id-aaabbbccc-5');
  });
});
