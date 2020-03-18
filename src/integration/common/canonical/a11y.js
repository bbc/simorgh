import '@testing-library/jest-dom/extend-expect';
import { renderAsReact } from '../../render';

export default ({ pageUrl, skipToContentText, headlineText }) => {
  describe('When I am using assistive technology', () => {
    let app;

    beforeEach(async () => {
      app = await renderAsReact(pageUrl);
    });

    it('I can see a skip to content link that links to the main content of the page', () => {
      const skipToContentEl = app.getByText(skipToContentText);
      const mainContentEl = app.getByText(headlineText);

      expect(skipToContentEl.getAttribute('href')).toBe('#content');
      expect(mainContentEl.getAttribute('id')).toBe('content');
      expect(mainContentEl.getAttribute('tabindex')).toBe('-1');
    });
  });
};
