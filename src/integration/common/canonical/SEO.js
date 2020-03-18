import '@testing-library/jest-dom/extend-expect';
import { renderAsJsDom } from '../../render';

let document;

export default ({ pageUrl, pageTitle, canonicalUrl, language }) => {
  describe('When I am a search engine', () => {
    beforeEach(async () => {
      const jsdom = await renderAsJsDom(pageUrl);
      document = jsdom.document;
    });

    it('I can crawl the page title', () => {
      const { title } = document;

      expect(title).toEqual(pageTitle);
    });

    it('I can crawl the heading level 1', () => {
      const headingEl = document.querySelector('h1');

      expect(headingEl).toBeInTheDocument();
    });

    it('I can crawl the canonical link', async () => {
      const canonicalEl = document.querySelector('head link[rel="canonical"]');

      expect(canonicalEl.getAttribute('href')).toEqual(canonicalUrl);
    });

    it('I can crawl the robots meta tag', async () => {
      const robotsEl = document.querySelector('head meta[name="robots"]');
      const robotsContent = robotsEl.getAttribute('content');

      expect(robotsContent).toEqual('noodp,noydir');
    });

    it('I can crawl the lang attribute', async () => {
      const htmlEl = document.querySelector('html');

      expect(htmlEl.getAttribute('lang')).toEqual(language);
    });
  });
};
