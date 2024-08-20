import {
  PHOTO_GALLERY_PAGE,
  MEDIA_ASSET_PAGE,
} from '#app/routes/utils/pageTypes';
import { isMap, isPgl, getHeadingTagOverride, buildUniquePromoId } from '.';
import {
  completeItem,
  standardLinkItem,
  tipoFormattedTopStoriesItem,
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
    expect(
      buildUniquePromoId({
        promoGroupId: labelId,
        promoItem: secondaryColumnNoAssetURI,
        promoIndex: 0,
      }),
    ).toEqual('promo-test-group-id-news-radiobulletin-1');
  });

  it('should return id using URI if assetURI does not exist', () => {
    expect(
      buildUniquePromoId({
        promoGroupId: labelId,
        promoItem: standardLinkItem,
        promoIndex: 1,
      }),
    ).toEqual('promo-test-group-id-azeri-text-2');
  });

  it('should return id using assetURI does not exist and contentType does not exist', () => {
    expect(
      buildUniquePromoId({
        promoGroupId: labelId,
        promoItem: completeItem,
        promoIndex: 2,
      }),
    ).toEqual('promo-test-group-id-3');
  });

  it('should return id using canonicalUrl if assetUri does not exist and uri does not exist', () => {
    expect(
      buildUniquePromoId({
        promoGroupId: labelId,
        promoItem: tipoFormattedTopStoriesItem,
        promoIndex: 2,
      }),
    ).toEqual('promo-test-group-id-kyrgyzarticlesc6vdqkm8yyvo-3');
  });

  it('should return id with contentType only if assetURI and URI do not exist', () => {
    expect(
      buildUniquePromoId({
        promoGroupId: labelId,
        promoItem: secondaryColumnContentType,
        promoIndex: 3,
      }),
    ).toEqual('promo-test-group-id-radiobulletin-4');
  });

  it('should sanitise link from item and split from last forward slash', () => {
    expect(
      buildUniquePromoId({
        promoGroupId: labelId,
        promoItem: { locators: { assetUri: 'a/a/ab.b.b@c@c@c' } },
        promoIndex: 4,
      }),
    ).toEqual('promo-test-group-id-aaabbbccc-5');
  });

  it('should return id of promo-link with contentType and URI if contentType exists for a "Top Stories" promo', () => {
    expect(
      buildUniquePromoId({
        sectionType: 'top-stories',
        promoGroupId: labelId,
        promoItem: secondaryColumnNoAssetURI,
        promoIndex: 0,
      }),
    ).toEqual('top-stories-promo-test-group-id-news-radiobulletin-1');
  });

  it('should return id of promo-link with contentType and URI if contentType exists for a "Features and Analysis" promo', () => {
    expect(
      buildUniquePromoId({
        sectionType: 'features-and-analysis',
        promoGroupId: labelId,
        promoItem: secondaryColumnNoAssetURI,
        promoIndex: 0,
      }),
    ).toEqual('features-and-analysis-promo-test-group-id-news-radiobulletin-1');
  });
});
