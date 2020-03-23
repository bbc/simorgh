const { within } = require('@testing-library/dom');

const { amp, canonical } = global;

export default ({
  headlineText,
  timestamp,
  bulletedListItem,
  relatedContentHeadline,
}) => {
  [amp, canonical].forEach(page => {
    describe(`And using ${page.platform}`, () => {
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

      it.skip('I can see the bulleted list item', () => {
        const { getAllByText } = within(
          page.document.querySelector(`[class^="Wrapper"]`),
        );

        const [bulletedListItemEl] = getAllByText(bulletedListItem);
        expect(bulletedListItemEl).toBeInTheDocument();
      });

      it('I can see related content', () => {
        const { getByText } = within(
          page.document.querySelector(`[class^="StoryPromoUl"]`),
        );
        const relatedContentItemEl = getByText(relatedContentHeadline);

        expect(relatedContentItemEl).toBeInTheDocument();
      });
    });
  });
};
