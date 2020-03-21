const { amp, canonical } = global;

export default ({
  pageTitle,
  canonicalUrl,
  readingDirection,
  language,
  fbAdmins,
  fbAppId,
  ogImage,
  ogImageAlt,
  ogLocale,
  ogType,
  ogUrl,
  ogSiteName,
  twitterCard,
  twitterCreator,
  twitterImageAlt,
  twitterImageSrc,
  twitterSite,
  ogDescription,
  ogTitle,
  twitterDescription,
  twitterTitle,
}) => {
  [amp, canonical].forEach(page => {
    describe(`And using ${page.platform}`, () => {
      it('it can see the page title', () => {
        expect(page.document.title).toEqual(pageTitle);
      });

      it('it can see the heading level 1', () => {
        const headingEl = page.document.querySelector('h1');

        expect(headingEl).toBeInTheDocument();
      });

      it('it can see the canonical link', () => {
        const canonicalEl = page.document.querySelector(
          'head link[rel="canonical"]',
        );

        expect(canonicalEl.getAttribute('href')).toEqual(canonicalUrl);
      });

      it('it can see the robots meta tag', () => {
        const robotsEl = page.document.querySelector(
          'head meta[name="robots"]',
        );
        const robotsContent = robotsEl.getAttribute('content');

        expect(robotsContent).toEqual('noodp,noydir');
      });

      it('it can see the lang attribute', () => {
        const htmlEl = page.document.querySelector('html');

        expect(htmlEl.getAttribute('lang')).toEqual(language);
      });

      it('it can see the dir attribute', () => {
        const htmlEl = page.document.querySelector('html');

        expect(htmlEl.getAttribute('dir')).toEqual(readingDirection);
      });

      it('it can see the shared metadata', () => {
        const fbAdminsEl = page.document.querySelector(
          'meta[property="fb:admins"]',
        );
        const fbAppIdEl = page.document.querySelector(
          'meta[property="fb:app_id"]',
        );
        const ogImageEl = page.document.querySelector(
          'meta[property="og:image"]',
        );
        const ogImageAltEl = page.document.querySelector(
          'meta[property="og:image:alt"]',
        );
        const ogLocaleEl = page.document.querySelector(
          'meta[property="og:locale"]',
        );
        const ogTypeEl = page.document.querySelector(
          'meta[property="og:type"]',
        );
        const ogUrlEl = page.document.querySelector('meta[property="og:url"]');
        const ogSiteNameEl = page.document.querySelector(
          'meta[property="og:site_name"]',
        );
        const twitterCardEl = page.document.querySelector(
          'meta[name="twitter:card"]',
        );
        const twitterCreatorEl = page.document.querySelector(
          'meta[name="twitter:creator"]',
        );
        const twitterImageAltEl = page.document.querySelector(
          'meta[name="twitter:image:alt"]',
        );
        const twitterImageSrcEl = page.document.querySelector(
          'meta[name="twitter:image:src"]',
        );
        const twitterSiteEl = page.document.querySelector(
          'meta[name="twitter:site"]',
        );
        const ogDescriptionEl = page.document.querySelector(
          'meta[property="og:description"]',
        );
        const ogTitleEl = page.document.querySelector(
          'meta[property="og:title"]',
        );
        const twitterDescriptionEl = page.document.querySelector(
          'meta[name="twitter:description"]',
        );
        const twitterTitleEl = page.document.querySelector(
          'meta[name="twitter:title"]',
        );

        expect(fbAdminsEl.getAttribute('content')).toBe(fbAdmins);
        expect(fbAppIdEl.getAttribute('content')).toBe(fbAppId);
        expect(ogImageEl.getAttribute('content')).toBe(ogImage);
        expect(ogImageAltEl.getAttribute('content')).toBe(ogImageAlt);
        expect(ogLocaleEl.getAttribute('content')).toBe(ogLocale);
        expect(ogTypeEl.getAttribute('content')).toBe(ogType);
        expect(ogUrlEl.getAttribute('content')).toBe(ogUrl);
        expect(ogSiteNameEl.getAttribute('content')).toBe(ogSiteName);
        expect(twitterCardEl.getAttribute('content')).toBe(twitterCard);
        expect(twitterCreatorEl.getAttribute('content')).toBe(twitterCreator);
        expect(twitterImageAltEl.getAttribute('content')).toBe(twitterImageAlt);
        expect(twitterImageSrcEl.getAttribute('content')).toBe(twitterImageSrc);
        expect(twitterSiteEl.getAttribute('content')).toBe(twitterSite);
        expect(ogDescriptionEl.getAttribute('content')).toBe(ogDescription);
        expect(ogTitleEl.getAttribute('content')).toBe(ogTitle);
        expect(twitterDescriptionEl.getAttribute('content')).toBe(
          twitterDescription,
        );
        expect(twitterTitleEl.getAttribute('content')).toBe(twitterTitle);
      });
    });
  });
};
