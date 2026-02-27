export default () => {
  if (process.env.DEV_MODE) return;

  const service = (global as Record<string, unknown>)?.service as string;

  it('Bundle scripts', () => {
    const expressBundleMatcher = new RegExp(
      `(\\/static\\/js\\/(?:comscore\\/)?(main|framework|commons|shared|${service}|.+Page).+?.js)|(\\/static\\/.+?-lib.+?.js)`,
      'g',
    );
    const nextBundleMatcher = /_next\/static\/.+\.js/g;
    const combinedMatcher = new RegExp(
      `${expressBundleMatcher.source}|${nextBundleMatcher.source}`,
      'g',
    );

    const bbcOriginScripts = Array.from(
      Array.from(document.querySelectorAll('script[src]')),
    ).filter(script => {
      const src = script.getAttribute('src') ?? '';
      return (
        (src.startsWith('/') && !src.startsWith('//')) ||
        src.startsWith('http://localhost') ||
        src.startsWith('https://localhost')
      );
    });

    bbcOriginScripts.forEach(bbcOriginScript => {
      expect(bbcOriginScript.getAttribute('src')).toMatch(combinedMatcher);
    });
  });

  it('Service bundle is loaded', () => {
    const expressBundleMatcher = new RegExp(
      `(\\/static\\/js\\/(${service})-\\w+\\.\\w+\\.js)`,
      'g',
    );
    const nextBundleMatcher = /_next\/static\/chunks\/.+\.js/g;

    const bbcOriginScripts = Array.from(
      Array.from(document.querySelectorAll('script[src]')),
    ).filter(script => {
      const src = script.getAttribute('src') ?? '';
      return (
        (src.startsWith('/') && !src.startsWith('//')) ||
        src.startsWith('http://localhost') ||
        src.startsWith('https://localhost')
      );
    });

    const legacyMatches = bbcOriginScripts.filter(script => {
      const src = script.getAttribute('src');
      expect(src).toBeTruthy();
      return expressBundleMatcher.test(src as string);
    });
    const nextMatches = bbcOriginScripts.filter(script => {
      const src = script.getAttribute('src');
      expect(src).toBeTruthy();
      return nextBundleMatcher.test(src as string);
    });

    expect(legacyMatches.length + nextMatches.length).toBeGreaterThan(0);
  });
};
