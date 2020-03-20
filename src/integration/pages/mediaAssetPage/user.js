import shouldRenderHeadline from '../../utilities/shouldRenderHeadline';

const { amp, canonical } = global;

export default ({
  headlineText,
  timestamp,
  bulletedListItem,
  relatedContentHeadline,
}) => {
  [amp, canonical].forEach(page => {
    it('I can see the headline', () => {
      shouldRenderHeadline(page, headlineText);
    });

    it('I can see the timestamp', () => {
      const timestampEl = page.getByText(timestamp);

      expect(timestampEl).toBeInTheDocument();
    });

    it('I can see the bulleted list item', () => {
      const [bulletedListItemEl] = page.getAllByText(bulletedListItem);
      expect(bulletedListItemEl).toBeInTheDocument();
      expect(bulletedListItemEl.getAttribute('class')).toContain(
        'BulletedListItem',
      );
    });

    it('I can see related content', () => {
      const [relatedContentItemEl] = page.getAllByText(relatedContentHeadline);
      expect(relatedContentItemEl).toBeInTheDocument();
    });
  });
};
