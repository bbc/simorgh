import '@testing-library/jest-dom/extend-expect';
import { renderAsBlah } from './render';
import { ARTICLE_PAGE_URL } from './pageUrls';

let app;

beforeEach(async () => {
  app = await renderAsBlah(ARTICLE_PAGE_URL);
});

it('I can see an image with a caption', () => {
  expect(
    app.getByText('Royal wedding flowers given to Hackney hospice'),
  ).toBeInTheDocument();
});
