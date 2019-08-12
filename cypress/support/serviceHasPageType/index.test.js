import { hasFrontPage, hasArticlePage, hasLiveRadioPage } from '.';

describe('hasFrontPage', () => {
  it('should return true when a service has a front page', () => {
    expect(hasFrontPage('afaanoromoo')).toBe(true);
    expect(hasFrontPage('afrique')).toBe(true);
  });

  it('should return false when a service does not have a front page', () => {
    expect(hasFrontPage('dummyService')).toBe(false);
  });
});

describe('hasArticlePage', () => {
  it('should return true when a service has an article page', () => {
    expect(hasArticlePage('afaanoromoo')).toBe(true);
    expect(hasArticlePage('afrique')).toBe(true);
  });

  it('should return false when a service does not have an article page', () => {
    expect(hasArticlePage('dummyService')).toBe(false);
  });
});

describe('hasLiveRadioPage', () => {
  it('should return true when a service has a live radio page', () => {
    expect(hasLiveRadioPage('afaanoromoo')).toBe(true);
  });
  it('should return false when a service does not have a live radio page', () => {
    expect(hasLiveRadioPage('afrique')).toBe(false);
  });
});
