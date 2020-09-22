import { isMap, isPgl, getHeadingTagOverride } from '.';

describe('isMap', () => {
  it('should return true if cpsType is MAP', () => {
    const map = { cpsType: 'MAP' };
    expect(isMap(map)).toBe(true);
  });

  it('should return true if media key exists', () => {
    const map = { media: {}, cpsType: 'OTH' };
    expect(isMap(map)).toBe(true);
  });

  it("should return false if media doesn't exist and cpsType isn't MAP", () => {
    const pgl = { cpsType: 'PGL' };
    expect(isMap(pgl)).toBe(false);
  });

  it('should return false if item is undefined', () => {
    expect(isMap(null)).toBe(false);
    expect(isMap(undefined)).toBe(false);
  });
});

describe('isPgl', () => {
  it('should return true if cpsType is PGL', () => {
    const pgl = { cpsType: 'PGL' };
    expect(isPgl(pgl)).toBe(true);
  });

  it("should return false if cpsType isn't PGL", () => {
    const map = { cpsType: 'MAP' };
    expect(isPgl(map)).toBe(false);
  });

  it('should return false if item is undefined', () => {
    expect(isPgl(null)).toBe(false);
    expect(isPgl(undefined)).toBe(false);
  });
});

describe('getHeadingTagOverride', () => {
  it('should return h2 if page type is mostWatched', () => {
    const pageType = 'mostWatched';
    const isRecommendation = false;
    const isContentTypeGuide = false;
    expect(
      getHeadingTagOverride({ pageType, isRecommendation, isContentTypeGuide }),
    ).toEqual('h2');
  });

  it('should return div if isRecommendation is true', () => {
    const pageType = 'PGL';
    const isRecommendation = true;
    const isContentTypeGuide = false;
    expect(
      getHeadingTagOverride({ pageType, isRecommendation, isContentTypeGuide }),
    ).toEqual('div');
  });

  it('should return div if isContentTypeGuide is true', () => {
    const pageType = 'PGL';
    const isRecommendation = false;
    const isContentTypeGuide = true;
    expect(
      getHeadingTagOverride({ pageType, isRecommendation, isContentTypeGuide }),
    ).toEqual('div');
  });

  it('should return null if page type is not mostWatched and other args are false', () => {
    const pageType = 'PGL';
    const isRecommendation = false;
    const isContentTypeGuide = false;
    expect(
      getHeadingTagOverride({ pageType, isRecommendation, isContentTypeGuide }),
    ).toBe(null);
  });
});
