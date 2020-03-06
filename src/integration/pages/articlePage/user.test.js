import '@testing-library/jest-dom/extend-expect';
import renderApp from '../../renderApp';
import { ARTICLE_PAGE_URL } from '../../pageUrls';

describe('User tests', () => {
  let app;

  beforeEach(async () => {
    app = await renderApp(ARTICLE_PAGE_URL);
  });

  it('should render the headline', () => {
    const headlineEl = app.getByText(
      "Adams Oshiomhole say 'I still be APC National Chairman'",
    );

    expect(headlineEl).toBeInTheDocument();
  });
});
