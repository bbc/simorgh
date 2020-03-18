import '@testing-library/jest-dom/extend-expect';
import { renderAsReact } from '../../../render';
import { ARTICLE_PAGE_URL } from '../../../pageUrls';

export default ({ imageAltText, imageCaptionText }) => {
  let app;

  beforeEach(async () => {
    app = await renderAsReact(ARTICLE_PAGE_URL);
  });

  it('I can see an image with a caption', () => {
    const imageEl = app.getByAltText(imageAltText);
    const imageCaptionEl = app.getByText(imageCaptionText);

    expect(imageEl).toBeInTheDocument();
    expect(imageCaptionEl).toBeInTheDocument();
  });
};
