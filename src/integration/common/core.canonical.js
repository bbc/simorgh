export default () => {
  if (process.env.DEV_MODE) return;

  it('Bundle scripts', () => {
    const expressBundleMatcher = new RegExp(
      `(\\/static\\/js\\/(?:comscore\\/)?(main|framework|commons|shared|${global.service}|.+Page).+?.js)|(\\/static\\/.+?-lib.+?.js)`,
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
      const src = script.getAttribute('src');
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
      `(\\/static\\/js\\/(${global.service})-\\w+\\.\\w+\\.js)`,
      'g',
    );
    const nextBundleMatcher = /_next\/static\/chunks\/.+\.js/g;

    const bbcOriginScripts = Array.from(
      Array.from(document.querySelectorAll('script[src]')),
    ).filter(script => {
      const src = script.getAttribute('src');
      return (
        (src.startsWith('/') && !src.startsWith('//')) ||
        src.startsWith('http://localhost') ||
        src.startsWith('https://localhost')
      );
    });

    const legacyMatches = bbcOriginScripts.filter(script =>
      expressBundleMatcher.test(script.getAttribute('src')),
    );
    const nextMatches = bbcOriginScripts.filter(script =>
      nextBundleMatcher.test(script.getAttribute('src')),
    );

    expect(legacyMatches.length + nextMatches.length).toBeGreaterThan(0);
  });
};
