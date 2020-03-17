import '@testing-library/jest-dom/extend-expect';
import { renderAsJsDom } from '../../render';

let document;

export default ({ pageUrl, pageTitle, canonicalUrl, language }) => {
  describe('SEO', () => {
    beforeEach(async () => {
      const jsdom = await renderAsJsDom(pageUrl);
      document = jsdom.document;
    });

    it('should have a page title', () => {
      const { title } = document;

      expect(title).toEqual(pageTitle);
    });

    it('should render an H1', () => {
      const headingEl = document.querySelector('h1');

      expect(headingEl).toBeInTheDocument();
    });

    it('should include the canonical URL', async () => {
      const canonicalEl = document.querySelector('head link[rel="canonical"]');

      expect(canonicalEl.getAttribute('href')).toEqual(canonicalUrl);
    });

    it('should have a correct robot meta tag', async () => {
      const robotsEl = document.querySelector('head meta[name="robots"]');
      const robotsContent = robotsEl.getAttribute('content');

      expect(robotsContent).toEqual('noodp,noydir');
    });

    it('should have lang attribute', async () => {
      const htmlEl = document.querySelector('html');

      expect(htmlEl.getAttribute('lang')).toEqual(language);
    });

    it.skip('should have correct things (example of failing test)', async () => {
      expect(true).toEqual(false);
    });
  });
};
