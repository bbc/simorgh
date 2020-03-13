import '@testing-library/jest-dom/extend-expect';
import renderApp from '../../../renderApp';
import { MEDIA_ASSET_PAGE_URL } from '../../../pageUrls';
import getHeadlineElement from '../../../helpers/getHeadlineElement';

export default () => {
  describe('User', () => {
    let app;

    beforeEach(async () => {
      app = await renderApp(MEDIA_ASSET_PAGE_URL);
    });

    it('should render the headline', () => {
      const headlineEl = getHeadlineElement();
      const headline = app
        .within(headlineEl)
        .getByText(
          'Hari perempuan internasional: Bergulat demi kebebasan perempuan',
        );

      expect(headline).toBeInTheDocument();
    });

    it('should render a paragraph', () => {
      const paragraphEl = app.getByText(
        'Vinesh berasal dari Haryana, kota kecil di utara India. Gulat, yang kerap diasosiasikan sebagai olahraga maskulin, kini bergeser berkat Vinesh dan pegulat perempuan lainnya.',
      );

      expect(paragraphEl).toBeInTheDocument();
    });

    it('should render a bulleted list', () => {
      const bulletedListItemEl = document.querySelector('[role="listitem"]');
      const listIem = app
        .within(bulletedListItemEl)
        .getByTextSpecial(
          `Tara Basro: Hak perempuan atas tubuhnya dan batasan pornografi`,
        );

      expect(listIem).toBeInTheDocument();
    });

    it('should render related content', () => {
      const relatedContentListEl = document.querySelector('[role="listitem"]');
      const relatedContentItem = app
        .within(relatedContentListEl)
        .getByTextSpecial(
          `Foto Tara Basro: Hak perempuan atas tubuhnya dan batasan pornografi`,
        );

      expect(relatedContentItem).toBeInTheDocument();
    });
  });
};
