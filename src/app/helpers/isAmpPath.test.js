import isAmpPath from './isAmpPath';

describe('isAmpPath', () => {
  it('should return false when passed a non-AMP article ID', () => {
    expect(isAmpPath('c0000000025o')).toEqual(false);
  });
  it('should return true when passed an AMP article ID', () => {
    expect(isAmpPath('c0000000025o.amp')).toEqual(true);
  });
});
