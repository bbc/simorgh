import appendAdDomainsToScriptSrc from '.';

describe('appendAdDomainsToCSPHeader', () => {
  const MOCK_AD_DOMAINS = [
    'doubleclick.net',
    'amazon-adsystem.com',
    'googlesyndication.com',
  ];
  const BASE_CSP =
    "default-src 'self';script-src 'self' *.bbc.co.uk;style-src 'self' 'unsafe-inline';img-src 'self' data:";

  it('should append ad domains to script-src directive', () => {
    const result = appendAdDomainsToScriptSrc(BASE_CSP, MOCK_AD_DOMAINS);

    const scriptSrcMatch = result.match(/script-src[^;]+/) || [];
    const scriptSrcDirective = scriptSrcMatch[0];

    MOCK_AD_DOMAINS.forEach(domain => {
      expect(scriptSrcDirective).toContain(domain);
    });

    expect(scriptSrcDirective).toContain("'self'");
    expect(scriptSrcDirective).toContain('*.bbc.co.uk');
  });

  it('should leave other directives unaffected', () => {
    const result = appendAdDomainsToScriptSrc(BASE_CSP, MOCK_AD_DOMAINS);

    expect(result).toContain("style-src 'self' 'unsafe-inline'");
    expect(result).toContain("default-src 'self'");
    expect(result).toContain("img-src 'self' data:");
  });

  it('should handle empty CSP header string', () => {
    const result = appendAdDomainsToScriptSrc('', MOCK_AD_DOMAINS);
    expect(result).toBe('');
  });
});
