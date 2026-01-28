import appendCtaQueryParams from '.';

describe('appendCtaQueryParams', () => {
  it('should return the original URL when no parameters are provided', () => {
    const url = 'https://example.com/signin';
    const result = appendCtaQueryParams(url);
    expect(result).toBe('https://example.com/signin');
  });

  it('should add ptrt parameter when pageToReturnTo is provided', () => {
    const url = 'https://example.com/signin';
    const result = appendCtaQueryParams(url, { pageToReturnTo: '/home' });
    expect(result).toBe('https://example.com/signin?ptrt=%2Fhome');
  });

  it('should add lang parameter when lang is provided', () => {
    const url = 'https://example.com/signin';
    const result = appendCtaQueryParams(url, { lang: 'en' });
    expect(result).toBe('https://example.com/signin?lang=en');
  });

  it('should add both ptrt and lang parameters when both are provided', () => {
    const url = 'https://example.com/signin';
    const result = appendCtaQueryParams(url, {
      pageToReturnTo: '/home',
      lang: 'fr',
    });
    expect(result).toBe('https://example.com/signin?ptrt=%2Fhome&lang=fr');
  });

  it('should preserve existing query parameters', () => {
    const url = 'https://example.com/signin?existing=param';
    const result = appendCtaQueryParams(url, {
      pageToReturnTo: '/home',
      lang: 'es',
    });
    expect(result).toBe(
      'https://example.com/signin?existing=param&ptrt=%2Fhome&lang=es',
    );
  });
});
