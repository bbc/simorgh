const { within } = require('@testing-library/dom');

const { amp, canonical } = global;

export default ({
  headlineText,
  timestamp,
  bulletedListItem,
  relatedContentHeadline,
}) => {
  [amp, canonical].forEach(page => {
    it('I can see the headline', () => {
      const { getByText } = within(
        page.document.querySelector('h1[id="content"]'),
      );

      const headline = getByText(headlineText);
      expect(headline).toBeInTheDocument();
    });

    it('I can see the timestamp', () => {
      const { getByText } = within(page.document.querySelector('time'));

      const timestampEl = getByText(timestamp);

      expect(timestampEl).toBeInTheDocument();
    });

    it('I can see the bulleted list item', () => {
      const [bulletedListItemEl] = page.getAllByText(bulletedListItem);
      expect(bulletedListItemEl).toBeInTheDocument();
      expect(bulletedListItemEl.getAttribute('class')).toBe('BulletedListItem');
    });

    it('I can see related content', () => {
      const [relatedContentItemEl] = page.getAllByText(relatedContentHeadline);
      expect(relatedContentItemEl).toBeInTheDocument();
    });
  });
};
