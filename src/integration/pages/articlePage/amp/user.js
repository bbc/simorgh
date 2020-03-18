import '@testing-library/jest-dom/extend-expect';
import { renderAsJsDom } from '../../../render';
import { ARTICLE_PAGE_URL } from '../../../pageUrls';

export default ({ imageAltText }) => {
  let app;

  beforeEach(async () => {
    app = await renderAsJsDom(ARTICLE_PAGE_URL, { isAmp: true });
  });

  it('I can see an amp image', () => {
    console.log('mmmmm', app.document.querySelector('body').innerHTML);
    const image = app.getByAltText(app.document.body, imageAltText);

    expect(image).toBeInTheDocument();
    expect(image.tagName).toBe('AMP-IMG');
  });
};
