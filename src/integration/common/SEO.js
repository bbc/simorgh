const runMetaTagTest = metaTagSelector => {
  const metaTagEl = document.querySelector(`head ${metaTagSelector}`);
  const metaTagContent = metaTagEl.getAttribute('content');

  it('should be in the document', () => {
    expect(metaTagEl).toBeInTheDocument();
  });

  it('should have content', () => {
    expect(metaTagContent).toBeTruthy();
  });

  it('should match content', () => {
    expect(metaTagContent).toMatchSnapshot();
  });
};

export default () => {
  describe('SEO', () => {
    describe('Page title', () => {
      const pageTitleEl = document.querySelector('title');
      const pageTitleText = pageTitleEl.textContent;

      it('should be in the document', () => {
        expect(pageTitleEl).toBeInTheDocument();
      });

      it('should have text', () => {
        expect(pageTitleText).toBeTruthy();
      });

      it('should match text', () => {
        expect(pageTitleText).toMatchSnapshot();
      });
    });

    describe('Heading level 1', () => {
      const headingEl = document.querySelector('h1');
      const headingText = headingEl.textContent;

      it('should be in the document', () => {
        expect(headingEl).toBeInTheDocument();
      });

      it('should have text', () => {
        expect(headingText).toBeTruthy();
      });

      it('should match text', () => {
        expect(headingText).toMatchSnapshot();
      });
    });

    describe('Canonical link', () => {
      const canonicalEl = document.querySelector('head link[rel="canonical"]');
      const canonicalUrl = canonicalEl.getAttribute('href');

      it('should be in the document', () => {
        expect(canonicalEl).toBeInTheDocument();
      });

      it('should have url', () => {
        expect(canonicalUrl).toBeTruthy();
      });

      it('should match url', () => {
        expect(canonicalUrl).toMatchSnapshot();
      });
    });

    describe('Lang attribute', () => {
      const htmlEl = document.querySelector('html');
      const language = htmlEl.getAttribute('lang');

      expect(htmlEl.getAttribute('lang')).toMatchSnapshot();

      it('should be in the document', () => {
        expect(htmlEl).toBeInTheDocument();
      });

      it('should have lang value', () => {
        expect(language).toBeTruthy();
      });

      it('should match lang value', () => {
        expect(language).toMatchSnapshot();
      });
    });

    describe('Dir attribute', () => {
      const htmlEl = document.querySelector('html');
      const readingDirection = htmlEl.getAttribute('dir');

      it('should be in the document', () => {
        expect(htmlEl).toBeInTheDocument();
      });

      it('should have dir value', () => {
        expect(readingDirection).toBeTruthy();
      });

      it('should match dir value', () => {
        expect(readingDirection).toMatchSnapshot();
      });
    });

    describe('Robots meta tag', () => {
      runMetaTagTest('meta[name="robots"]');
    });

    describe('FB admins', () => {
      runMetaTagTest('meta[property="fb:admins"]');
    });

    describe('FB app ID', () => {
      runMetaTagTest('meta[property="fb:app_id"]');
    });

    describe('OG image', () => {
      runMetaTagTest('meta[property="og:image"]');
    });

    describe('OG image alt', () => {
      runMetaTagTest('meta[property="og:image:alt"]');
    });

    describe('OG locale', () => {
      runMetaTagTest('meta[property="og:locale"]');
    });

    describe('OG type', () => {
      runMetaTagTest('meta[property="og:type"]');
    });

    describe('OG url', () => {
      runMetaTagTest('meta[property="og:url"]');
    });

    describe('OG site name', () => {
      runMetaTagTest('meta[property="og:site_name"]');
    });

    describe('Twitter card', () => {
      runMetaTagTest('meta[name="twitter:card"]');
    });

    describe('Twitter creator', () => {
      runMetaTagTest('meta[name="twitter:creator"]');
    });

    describe('Twitter image alt', () => {
      runMetaTagTest('meta[name="twitter:image:alt"]');
    });

    describe('Twitter image src', () => {
      runMetaTagTest('meta[name="twitter:image:src"]');
    });

    describe('Twitter site', () => {
      runMetaTagTest('meta[name="twitter:site"]');
    });

    describe('OG description', () => {
      runMetaTagTest('meta[property="og:description"]');
    });

    describe('OG title', () => {
      runMetaTagTest('meta[property="og:title"]');
    });

    describe('Twitter description', () => {
      runMetaTagTest('meta[name="twitter:description"]');
    });

    describe('Twitter title', () => {
      runMetaTagTest('meta[name="twitter:title"]');
    });

    describe('Linked data', () => {
      const linkedDataEl = document.querySelector(
        'script[type="application/ld+json"]',
      );
      const linkedDataContent = linkedDataEl.textContent;

      it('should be in the document', () => {
        expect(linkedDataEl).toBeInTheDocument();
      });

      it('should have content', () => {
        expect(linkedDataContent).toBeTruthy();
      });

      it('should match content', () => {
        expect(JSON.parse(linkedDataContent)).toMatchSnapshot();
      });
    });
  });
};
