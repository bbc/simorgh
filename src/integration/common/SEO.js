const { amp, canonical } = global;

export default ({ pageTitle, canonicalUrl, language }) => {
  [amp, canonical].forEach(app => {
    it('it can see the page title', () => {
      expect(app.document.title).toEqual(pageTitle);
    });

    it('it can see the heading level 1', () => {
      const headingEl = app.document.querySelector('h1');

      expect(headingEl).toBeInTheDocument();
    });

    it('it can see the canonical link', () => {
      const canonicalEl = app.document.querySelector(
        'head link[rel="canonical"]',
      );

      expect(canonicalEl.getAttribute('href')).toEqual(canonicalUrl);
    });

    it('it can see the robots meta tag', () => {
      const robotsEl = app.document.querySelector('head meta[name="robots"]');
      const robotsContent = robotsEl.getAttribute('content');

      expect(robotsContent).toEqual('noodp,noydir');
    });

    it('it can see the lang attribute', () => {
      const htmlEl = app.document.querySelector('html');

      expect(htmlEl.getAttribute('lang')).toEqual(language);
    });
  });
};
