const getMetaTagContent = (selector) =>
  document.querySelector(selector).getAttribute('content');

export default () => {
  describe('SEO & Social Media Metadata', () => {
    it('title', () => {
      const pageTitleEl = document.querySelector('title');

      expect(pageTitleEl).toBeInTheDocument();
      expect(pageTitleEl.textContent).toBeTruthy();
      expect(pageTitleEl.textContent).toMatchSnapshot();
    });

    it('heading level 1', () => {
      const headingEl = document.querySelector('h1');

      expect(headingEl).toBeInTheDocument();
      expect(headingEl.textContent).toBeTruthy();
      expect(headingEl.textContent).toMatchSnapshot();
    });

    it('canonical link', () => {
      const canonicalEl = document.querySelector('head link[rel="canonical"]');

      expect(canonicalEl.getAttribute('href')).toMatchSnapshot();
    });

    it('robots - meta[name="robots"]', () => {
      const robotsEl = document.querySelector('head meta[name="robots"]');
      const robotsContent = robotsEl.getAttribute('content');

      expect(robotsContent).toMatchSnapshot();
    });

    it('lang attribute', () => {
      const htmlEl = document.querySelector('html');

      expect(htmlEl.getAttribute('lang')).toMatchSnapshot();
    });

    it('dir attribute', () => {
      const htmlEl = document.querySelector('html');

      expect(htmlEl.getAttribute('dir')).toMatchSnapshot();
    });

    describe('Facebook', () => {
      it('admins - meta[property="fb:admins"]', () => {
        const metaTagContent = getMetaTagContent('meta[property="fb:admins"]');

        expect(metaTagContent).toBeTruthy();
        expect(metaTagContent).toMatchSnapshot();
      });

      it('application ID - meta[property="fb:app_id"]', () => {
        const metaTagContent = getMetaTagContent('meta[property="fb:app_id"]');

        expect(metaTagContent).toBeTruthy();
        expect(metaTagContent).toMatchSnapshot();
      });

      it('pages - meta[property="fb:pages"]', () => {
        const metaTagContent = getMetaTagContent('meta[property="fb:pages"]');

        expect(metaTagContent).toBeTruthy();
        expect(metaTagContent).toMatchSnapshot();
      });
    });

    describe('OpenGraph', () => {
      it('description - meta[property="og:description"]', () => {
        const metaTagContent = getMetaTagContent(
          'meta[property="og:description"]',
        );

        expect(metaTagContent).toBeTruthy();
        expect(metaTagContent).toMatchSnapshot();
      });

      it('image alt text - meta[property="og:image:alt"]', () => {
        const metaTagContent = getMetaTagContent(
          'meta[property="og:image:alt"]',
        );

        expect(metaTagContent).toBeTruthy();
        expect(metaTagContent).toMatchSnapshot();
      });

      it('image - meta[property="og:image"]', () => {
        const metaTagContent = getMetaTagContent('meta[property="og:image"]');

        expect(metaTagContent).toBeTruthy();
        expect(metaTagContent).toMatchSnapshot();
      });

      it('locale - meta[property="og:locale"]', () => {
        const metaTagContent = getMetaTagContent('meta[property="og:locale"]');

        expect(metaTagContent).toBeTruthy();
        expect(metaTagContent).toMatchSnapshot();
      });

      it('site name (meta[property="og:site_name"])', () => {
        const metaTagContent = getMetaTagContent(
          'meta[property="og:site_name"]',
        );

        expect(metaTagContent).toBeTruthy();
        expect(metaTagContent).toMatchSnapshot();
      });

      it('title - meta[property="og:title"]', () => {
        const metaTagContent = getMetaTagContent('meta[property="og:title"]');

        expect(metaTagContent).toBeTruthy();
        expect(metaTagContent).toMatchSnapshot();
      });

      it('type - meta[property="og:type"]', () => {
        const metaTagContent = getMetaTagContent('meta[property="og:type"]');

        expect(metaTagContent).toBeTruthy();
        expect(metaTagContent).toMatchSnapshot();
      });

      it('url (meta[property="og:url"])', () => {
        const metaTagContent = getMetaTagContent('meta[property="og:url"]');

        expect(metaTagContent).toBeTruthy();
        expect(metaTagContent).toMatchSnapshot();
      });
    });

    describe('Twitter', () => {
      it('card - meta[name="twitter:card"]', () => {
        const metaTagContent = getMetaTagContent('meta[name="twitter:card"]');

        expect(metaTagContent).toBeTruthy();
        expect(metaTagContent).toMatchSnapshot();
      });

      it('creator - meta[name="twitter:creator"]', () => {
        const metaTagContent = getMetaTagContent(
          'meta[name="twitter:creator"]',
        );

        expect(metaTagContent).toBeTruthy();
        expect(metaTagContent).toMatchSnapshot();
      });

      it('description - meta[name="twitter:description"]', () => {
        const metaTagContent = getMetaTagContent(
          'meta[name="twitter:description"]',
        );

        expect(metaTagContent).toBeTruthy();
        expect(metaTagContent).toMatchSnapshot();
      });

      it('image alt text - meta[name="twitter:image:alt"]', () => {
        const metaTagContent = getMetaTagContent(
          'meta[name="twitter:image:alt"]',
        );

        expect(metaTagContent).toBeTruthy();
        expect(metaTagContent).toMatchSnapshot();
      });

      it('image src - meta[name="twitter:image:src"]', () => {
        const metaTagContent = getMetaTagContent(
          'meta[name="twitter:image:src"]',
        );

        expect(metaTagContent).toBeTruthy();
        expect(metaTagContent).toMatchSnapshot();
      });

      it('site - meta[name="twitter:site"]', () => {
        const metaTagContent = getMetaTagContent('meta[name="twitter:site"]');

        expect(metaTagContent).toBeTruthy();
        expect(metaTagContent).toMatchSnapshot();
      });

      it('title - meta[name="twitter:title"]', () => {
        const metaTagContent = getMetaTagContent('meta[name="twitter:title"]');

        expect(metaTagContent).toBeTruthy();
        expect(metaTagContent).toMatchSnapshot();
      });
    });
  });
};
