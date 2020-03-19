const { amp, canonical } = global;

export default ({ pageTitle, canonicalUrl, language }) => {
  [amp, canonical].forEach(app => {
    it('I can crawl the page title', () => {
      expect(app.document.title).toEqual(pageTitle);
    });

    it('I can crawl the heading level 1', () => {
      const headingEl = app.document.querySelector('h1');

      expect(headingEl).toBeInTheDocument();
    });

    it('I can crawl the canonical link', () => {
      const canonicalEl = app.document.querySelector(
        'head link[rel="canonical"]',
      );

      expect(canonicalEl.getAttribute('href')).toEqual(canonicalUrl);
    });

    it('I can crawl the robots meta tag', () => {
      const robotsEl = app.document.querySelector('head meta[name="robots"]');
      const robotsContent = robotsEl.getAttribute('content');

      expect(robotsContent).toEqual('noodp,noydir');
    });

    it('I can crawl the lang attribute', () => {
      const htmlEl = app.document.querySelector('html');

      expect(htmlEl.getAttribute('lang')).toEqual(language);
    });
  });
};
