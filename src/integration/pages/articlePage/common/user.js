import '@testing-library/jest-dom/extend-expect';
import { renderAsReact } from '../../../render';
import { ARTICLE_PAGE_URL } from '../../../pageUrls';

export default () => {
  let app;

  beforeEach(async () => {
    app = await renderAsReact(ARTICLE_PAGE_URL);
  });

  it('I can see the headline', () => {
    const headlineEl = app.getByText(
      "Adams Oshiomhole say 'I still be APC National Chairman'",
    );

    expect(headlineEl).toBeInTheDocument();
  });
};
