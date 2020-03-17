import '@testing-library/jest-dom/extend-expect';
import { renderAsReact } from '../../../render';
import { MEDIA_ASSET_PAGE_URL } from '../../../pageUrls';
import getHeadlineElement from '../../../helpers/getHeadlineElement';

export default () => {
  describe('User', () => {
    let app;

    beforeEach(async () => {
      app = await renderAsReact(MEDIA_ASSET_PAGE_URL);
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

    it.skip('should render a bulleted list', () => {
      const bulletedListItemEl = document.querySelector('[role="listitem"]'); // TODO: distinguish between bulleted list and related content
      const listIem = app
        .within(bulletedListItemEl)
        .getByTextSpecial(
          `Tara Basro: Hak perempuan atas tubuhnya dan batasan pornografi`,
        );

      expect(listIem).toBeInTheDocument();
    });

    it.skip('should render related content', () => {
      const relatedContentListEl = document.querySelector('[role="listitem"]'); // TODO: distinguish between bulleted list and related content
      const relatedContentItem = app
        .within(relatedContentListEl)
        .getByTextSpecial(
          `Foto Tara Basro: Hak perempuan atas tubuhnya dan batasan pornografi`,
        );

      expect(relatedContentItem).toBeInTheDocument();
    });
  });
};
