export default () => {
  describe('Core Canonical', () => {
    it('Bundle scripts', () => {
      const bundleScriptMatcher = new RegExp(
        `(\\/static\\/js\\/(main|vendor|${global.service})-\\w+\\.\\w+\\.js)`,
        'g',
      );
      const bbcOriginScripts = Array.from(
        document.querySelectorAll('script[src]'),
      ).filter((script) =>
        script.getAttribute('src').startsWith('http://localhost:7080'),
      );

      bbcOriginScripts.forEach((bbcOriginScript) => {
        expect(bbcOriginScript.getAttribute('src')).toMatch(
          bundleScriptMatcher,
        );
      });
    });

    it('Service bundle is loaded', () => {
      const bundleScriptMatcher = new RegExp(
        `(\\/static\\/js\\/(${global.service})-\\w+\\.\\w+\\.js)`,
        'g',
      );
      const bbcOriginScripts = Array.from(
        document.querySelectorAll('script[src]'),
      ).filter((script) =>
        script.getAttribute('src').startsWith('http://localhost:7080'),
      );
      const serviceScripts = bbcOriginScripts.filter((script) =>
        bundleScriptMatcher.test(script.getAttribute('src')),
      );

      expect(serviceScripts.length).toBe(1);
    });

    // it('Page data used for client side app hydration', () => {
    //   const simorghDataScriptEl = Array.from(
    //     document.querySelectorAll('script'),
    //   ).find((script) => script.textContent.startsWith('window.SIMORGH_DATA'));

    //   expect(simorghDataScriptEl).toBeInTheDocument();
    //   expect(simorghDataScriptEl).toMatchSnapshot();
    // });
  });
};
