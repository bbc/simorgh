import { runCommonCrossPlatformTests } from '../../common';

export default () => {
  runCommonCrossPlatformTests();

  it('I can see at least one section', () => {
    const sect = document.querySelector('section');

    expect(sect).toBeInTheDocument();
  });

  it('I can see Index Alsos', () => {
    const topStories = document.querySelector(
      '[aria-labelledby="Top-stories"]',
    );

    if (topStories) {
      const indexAlsos = topStories.querySelector('[data-e2e=index-alsos]');

      if (indexAlsos) {
        const h4 = indexAlsos.querySelector('h4');
        expect(h4.textContent).toMatchSnapshot();

        const data = window.SIMORGH_DATA;

        if (data) {
          const topStoriesGroup = data.pageData.content.groups[0].items[0];
          const { relatedItems } = topStoriesGroup;

          if (relatedItems.length > 1) {
            expect(indexAlsos.getElementsByTagName('ul')).toHaveLength(1);
            expect(indexAlsos.getElementsByTagName('li')).toHaveLength(
              relatedItems.length,
            );
          } else {
            const { headline } = relatedItems[0].headlines;

            expect(indexAlsos.querySelector('div a span').innerHTML).toEqual(
              headline,
            );
          }
        }
      }
    }
  });

  it('I can see Useful Links', () => {
    const usefulLinks = document.querySelector('[data-e2e=useful-links]');

    if (usefulLinks) {
      const links = usefulLinks.querySelectorAll('a');

      links.forEach(linkEl => {
        expect(linkEl).toBeInTheDocument();
        expect(linkEl.textContent).toBeTruthy();
        expect(linkEl.textContent).toMatchSnapshot();
      });
    }
  });
};
