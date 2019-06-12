import urlWithPageAnchor from './pageAnchor';

describe('urlWithPageAnchor', () => {
  beforeEach(() => {
    window.location.hash = '';
  });

  it('should return false when no anchor', () => {
    expect(urlWithPageAnchor()).toBeFalsy();
  });

  it('should return the hash value when present', () => {
    window.location.hash = 'foobar';
    expect(urlWithPageAnchor()).toEqual('#foobar');
  });
});
