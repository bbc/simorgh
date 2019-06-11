import hasPageAnchor from './pageAnchor';

describe('hasPageAnchor', () => {
  beforeEach(() => {
    window.location.hash = '';
  });

  it('should return false when no anchor', () => {
    expect(hasPageAnchor()).toBeFalsy();
  });

  it('should return the hash value when present', () => {
    window.location.hash = 'foobar';
    expect(hasPageAnchor()).toEqual('#foobar');
  });
});
