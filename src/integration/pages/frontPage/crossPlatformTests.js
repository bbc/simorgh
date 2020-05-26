import { runCommonCrossPlatformTests } from '../../common';

export default () => {
  runCommonCrossPlatformTests();

  describe('Section', () => {
    const sectionEl = document.querySelector('section');

    it('should have at least one section', () => {
      expect(sectionEl).toBeInTheDocument();
    });
  });

  describe('Index Alsos', () => {
    const topStories = document.querySelector(
      '[aria-labelledby="Top-stories"]',
    );

    if (topStories) {
      const indexAlsos = topStories.querySelector('[data-e2e=index-alsos]');

      if (indexAlsos) {
        const h4 = indexAlsos.querySelector('h4');

        it('should have heading matching text', () => {
          expect(h4.textContent).toMatchSnapshot();
        });

        if (window.SIMORGH_DATA) {
          const topStoriesGroup =
            window.SIMORGH_DATA.pageData.content.groups[0].items[0];
          const { relatedItems } = topStoriesGroup;

          if (relatedItems.length > 1) {
            it('should be in the document', () => {
              expect(indexAlsos.querySelector('ul')).toBeInTheDocument();
            });

            it('should render all items', () => {
              expect(indexAlsos.getElementsByTagName('li')).toHaveLength(
                relatedItems.length,
              );
            });
          } else {
            it('should match text', () => {
              expect(
                indexAlsos.querySelector('div a span').textContent,
              ).toMatchSnapshot();
            });
          }
        }
      }
    }
  });

  describe('Useful Links', () => {
    const usefulLinksEl = document.querySelector('[data-e2e=useful-links]');

    if (usefulLinksEl) {
      const links = usefulLinksEl.querySelectorAll('a');

      links.forEach(linkEl => {
        it('should be in the document', () => {
          expect(linkEl).toBeInTheDocument();
        });

        it('should have text', () => {
          expect(linkEl.textContent).toBeTruthy();
        });

        it('should match text', () => {
          expect(linkEl.textContent).toMatchSnapshot();
        });
      });
    }
  });
};
