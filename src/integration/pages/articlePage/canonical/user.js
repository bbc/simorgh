import '@testing-library/jest-dom/extend-expect';
import renderApp from '../../../renderApp';
import { ARTICLE_PAGE_URL } from '../../../pageUrls';

export default () => {
  describe('User', () => {
    let app;

    beforeEach(async () => {
      app = await renderApp(ARTICLE_PAGE_URL);
    });

    it('should render the headline', () => {
      const headlineEl = app.getByText(
        'This is the headline of this test article',
      );

      expect(headlineEl).toBeInTheDocument();
    });
  });
};
