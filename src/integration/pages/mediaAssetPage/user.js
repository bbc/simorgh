import shouldRenderHeadline from '../../utilities/shouldRenderHeadline';

const { amp, canonical } = global;

export default ({ headlineText, timestamp, bulletedListItemText }) => {
  [amp, canonical].forEach(page => {
    it('I can see the headline', () => {
      shouldRenderHeadline(page, headlineText);
    });

    it('I can see the timestamp', () => {
      const timestampEl = page.getByText(timestamp);

      expect(timestampEl).toBeInTheDocument();
    });

    it('I can see a bulleted list item', () => {
      const bulletedListItemEl = page.getByText(bulletedListItemText);
      expect(bulletedListItemEl).toBeInTheDocument();
      expect(bulletedListItemEl.getAttribute('class')).toContain(
        'BulletedListItem',
      );
    });

    it.skip('I can see related content', () => {
      const relatedContentListEl = page.document.querySelector(
        '[role="listitem"]',
      ); // TODO: distinguish between bulleted list and related content
      const relatedContentItem = page
        .within(relatedContentListEl)
        .getByTextSpecial(
          `Foto Tara Basro: Hak perempuan atas tubuhnya dan batasan pornografi`,
        );

      expect(relatedContentItem).toBeInTheDocument();
    });
  });
};
