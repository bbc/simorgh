import isNotUK from './index';

describe('isNotUK', () => {
  describe('undefined input', () => {
    it('should return true', () => {
      expect(isNotUK()).toEqual(true);
    });
  });

  describe('null input', () => {
    it('should return true', () => {
      expect(isNotUK(null)).toEqual(true);
    });
  });

  describe('empty string input', () => {
    it('should return true', () => {
      expect(isNotUK('')).toEqual(true);
    });
  });

  it('should return false', () => {
    expect(isNotUK('gb')).toEqual(false);
    expect(isNotUK('im')).toEqual(false);
    expect(isNotUK('je')).toEqual(false);
    expect(isNotUK('gg')).toEqual(false);
  });

  it('should return true', () => {
    expect(isNotUK('ng')).toEqual(true);
    expect(isNotUK('us')).toEqual(true);
    expect(isNotUK('de')).toEqual(true);
  });
});
