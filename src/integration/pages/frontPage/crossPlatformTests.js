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

        if (window.SIMORGH_DATA) {
          const topStoriesGroup =
            window.SIMORGH_DATA.pageData.content.groups[0].items[0];
          const { relatedItems } = topStoriesGroup;

          if (relatedItems.length > 1) {
            expect(indexAlsos.querySelector('ul')).toBeInTheDocument();
            expect(indexAlsos.getElementsByTagName('li')).toHaveLength(
              relatedItems.length,
            );
          } else {
            expect(
              indexAlsos.querySelector('div a span').innerHTML,
            ).toMatchSnapshot();
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
