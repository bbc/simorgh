const { within } = require('@testing-library/dom');

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

      it('I can see the bulleted list item', () => {
        if (bulletedListItem) {
          const { getAllByRole } = within(page.document.querySelector('main'));
          const bulletedLists = getAllByRole('list');
          const [bulletedList] = bulletedLists.filter(list =>
            list.innerHTML.includes(bulletedListItem),
          );
          const { getAllByText } = within(bulletedList);

          expect(getAllByText(bulletedListItem)[0]).toBeInTheDocument();
        }
      });

      it('I can see the related content', () => {
        if (relatedContentHeadline) {
          const { getByRole } = within(page.document.querySelector('section'));
          const relatedContentList = getByRole('list');
          const { getByText } = within(relatedContentList);

          expect(getByText(relatedContentHeadline)).toBeInTheDocument();
        }
      });
    });
  });
};
