import { waitForDomChange } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderApp from '../renderApp';

export default ({ pageUrl, pageTitle }) => {
  describe('SEO', () => {
    beforeEach(() => renderApp(pageUrl));

    it('should have a page title', async () => {
      await waitForDomChange();
      const title = document.querySelector('head title');

      expect(title.textContent).toEqual(pageTitle);
    });

    it('should render an H1', () => {
      const headingEl = document.querySelector('h1');

      // console.log(document.body.innerHTML);

      expect(headingEl).toBeInTheDocument();
    });
  });
};
