import appendCtaQueryParams from '.';

describe('appendCtaQueryParams', () => {
  it('should always append required params when no optional params provided', () => {
    const url = 'https://example.com/signin';
    const result = appendCtaQueryParams(url);
    expect(result).toBe(
      'https://example.com/signin?skipAgeBracketScreen=true&userOrigin=WS_NEWS_HINDI_TEST&context=international',
    );
  });

  it('should add ptrt parameter when pageToReturnTo is provided', () => {
    const url = 'https://example.com/signin';
    const result = appendCtaQueryParams(url, { pageToReturnTo: '/home' });
    expect(result).toBe(
      'https://example.com/signin?ptrt=%2Fhome&skipAgeBracketScreen=true&userOrigin=WS_NEWS_HINDI_TEST&context=international',
    );
  });

  it('should add lang parameter when lang is provided', () => {
    const url = 'https://example.com/signin';
    const result = appendCtaQueryParams(url, { lang: 'en' });
    expect(result).toBe(
      'https://example.com/signin?lang=en&skipAgeBracketScreen=true&userOrigin=WS_NEWS_HINDI_TEST&context=international',
    );
  });

  it('should set userOrigin to WS_NEWS_HINDI when env is live', () => {
    const url = 'https://example.com/signin';
    const result = appendCtaQueryParams(url, { userOrigin: 'WS_NEWS_HINDI' });
    expect(result).toBe(
      'https://example.com/signin?skipAgeBracketScreen=true&userOrigin=WS_NEWS_HINDI&context=international',
    );
  });

  it('should set userOrigin to WS_NEWS_HINDI_TEST when env is test', () => {
    const url = 'https://example.com/signin';
    const result = appendCtaQueryParams(url, {
      userOrigin: 'WS_NEWS_HINDI_TEST',
    });
    expect(result).toBe(
      'https://example.com/signin?skipAgeBracketScreen=true&userOrigin=WS_NEWS_HINDI_TEST&context=international',
    );
  });

  it('should set userOrigin to WS_NEWS_HINDI_TEST for local/dev/sandbox env', () => {
    const url = 'https://example.com/signin';
    const result = appendCtaQueryParams(url, {
      userOrigin: 'WS_NEWS_HINDI_TEST',
    });
    expect(result).toBe(
      'https://example.com/signin?skipAgeBracketScreen=true&userOrigin=WS_NEWS_HINDI_TEST&context=international',
    );
  });

  it('should preserve existing non-conflicting query parameters', () => {
    const url = 'https://example.com/signin?existing=param';
    const result = appendCtaQueryParams(url, {
      pageToReturnTo: '/home',
      lang: 'es',
    });
    expect(result).toBe(
      'https://example.com/signin?existing=param&ptrt=%2Fhome&lang=es&skipAgeBracketScreen=true&userOrigin=WS_NEWS_HINDI_TEST&context=international',
    );
  });

  it('should overwrite existing conflicting params', () => {
    const url =
      'https://example.com/signin?skipAgeBracketScreen=false&context=local';
    const result = appendCtaQueryParams(url);
    expect(result).toBe(
      'https://example.com/signin?skipAgeBracketScreen=true&context=international&userOrigin=WS_NEWS_HINDI_TEST',
    );
  });
});
