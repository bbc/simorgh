import isAmpPath from './isAmpPath';

describe('isAmpPath', () => {
  it('should return false when passed a non-article path', () => {
    expect(isAmpPath('/random')).toEqual(false);
  });
  it('should return false when passed a non-AMP article path', () => {
    expect(isAmpPath('/articles/:id')).toEqual(false);
  });
  it('should return true when passed an AMP article path', () => {
    expect(isAmpPath('/articles/amp/:id')).toEqual(true);
  });
});
