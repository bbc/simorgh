import '@testing-library/jest-dom/extend-expect';
import { renderAsReact } from '../../../render';
import { ARTICLE_PAGE_URL } from '../../../pageUrls';

export default () => {
  describe('User', () => {
    let app;

    beforeEach(async () => {
      app = await renderAsReact(ARTICLE_PAGE_URL);
    });

    it('should render the headline', () => {
      const headlineEl = app.getByText(
        "Adams Oshiomhole say 'I still be APC National Chairman'",
      );

      expect(headlineEl).toBeInTheDocument();
    });
  });
};
