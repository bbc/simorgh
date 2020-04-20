export default ({ service }) => {
  it('Bundle scripts are loaded', () => {
    const bundleScriptMatcher = new RegExp(
      `(\\/static\\/js\\/(main|vendor|${service})-\\w+\\.\\w+\\.js)`,
      'g',
    );
    const bbcOriginScripts = Array.from(
      canonical.document.querySelectorAll('script[src]'),
    ).filter(script =>
      script.getAttribute('src').startsWith('http://localhost:7080'),
    );

    bbcOriginScripts.forEach(bbcOriginScript => {
      expect(bbcOriginScript.getAttribute('src')).toMatch(bundleScriptMatcher);
    });
  });

  it('The service bundle is loaded', () => {
    const bundleScriptMatcher = new RegExp(
      `(\\/static\\/js\\/(${service})-\\w+\\.\\w+\\.js)`,
      'g',
    );
    const bbcOriginScripts = Array.from(
      canonical.document.querySelectorAll('script[src]'),
    ).filter(script =>
      script.getAttribute('src').startsWith('http://localhost:7080'),
    );
    const serviceScripts = bbcOriginScripts.filter(script =>
      bundleScriptMatcher.test(script.getAttribute('src')),
    );

    expect(serviceScripts.length).toBe(1);
  });
};
