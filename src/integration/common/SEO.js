import { waitForDomChange } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderApp from '../renderApp';

export default ({ pageUrl, pageTitle, canonicalUrl, language }) => {
  describe('Common SEO tests', () => {
    beforeEach(() => renderApp(pageUrl));

    it('should have a page title', async () => {
      await waitForDomChange();
      const title = document.querySelector('head title');

      expect(title.textContent).toEqual(pageTitle);
    });

    it('should render an H1', () => {
      const headingEl = document.querySelector('h1');

      expect(headingEl).toBeInTheDocument();
    });

    it('should include the canonical URL', async () => {
      await waitForDomChange();

      const canonicalEl = document.querySelector('head link[rel="canonical"]');

      expect(canonicalEl.getAttribute('href')).toEqual(canonicalUrl);
    });

    it('should have a correct robot meta tag', async () => {
      await waitForDomChange();

      const robotsEl = document.querySelector('head meta[name="robots"]');
      const robotsContent = robotsEl.getAttribute('content');

      expect(robotsContent).toEqual('noodp,noydir');
    });

    it('should have lang attribute', async () => {
      await waitForDomChange();

      const htmlEl = document.querySelector('html');

      expect(htmlEl.getAttribute('lang')).toEqual(language);
    });
  });
};
