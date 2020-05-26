import { runCommonCrossPlatformTests } from '../../common';

export default () => {
  runCommonCrossPlatformTests();

  it('I can see the headline', () => {
    const h1El = document.querySelector('h1');

    expect(h1El).toBeInTheDocument();
    expect(h1El.textContent).toBeTruthy();
    expect(h1El.textContent).toMatchSnapshot();
  });

  it('I can see sections', () => {
    const sections = document.querySelectorAll('section');

    if (sections) {
      sections.forEach(section => {
        expect(section).toBeInTheDocument();

        const h2El = section.querySelector('h2');

        expect(h2El).toBeInTheDocument();
        expect(h2El.textContent).toBeTruthy();
        expect(h2El.textContent).toMatchSnapshot();
      });
    }
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
