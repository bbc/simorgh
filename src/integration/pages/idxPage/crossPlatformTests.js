import { runCommonCrossPlatformTests, runSectionTests } from '../../common';

export default service => {
  runCommonCrossPlatformTests(service);
  runSectionTests();

  describe('Index Alsos', () => {
    const indexAlsos = document.querySelector('[data-e2e=index-alsos]');

    if (indexAlsos) {
      const h4El = indexAlsos.querySelector('h4');
      it('should match visually hidden text', () => {
        expect(h4El.textContent).toMatchSnapshot();
      });

      if (window.SIMORGH_DATA) {
        const topStoriesGroup =
          window.SIMORGH_DATA.pageData.content.groups[0].items[0];
        const { relatedItems } = topStoriesGroup;

        if (relatedItems.length > 1) {
          it('should have a list', () => {
            expect(indexAlsos.querySelector('ul')).toBeInTheDocument();
          });

          it('should match the length of relatedItems', () => {
            expect(indexAlsos.getElementsByTagName('li')).toHaveLength(
              relatedItems.length,
            );
          });
        } else {
          it('should match content', () => {
            expect(
              indexAlsos.querySelector('div a span').innerHTML,
            ).toMatchSnapshot();
          });
        }
      }
    }
  });

  describe('Useful Links', () => {
    const usefulLinks = document.querySelector('[data-e2e=useful-links]');

    if (usefulLinks) {
      const links = usefulLinks.querySelectorAll('a');

      links.forEach(linkEl => {
        const linkText = linkEl.textContent;
        const linkUrl = linkEl.getAttribute('href');
        it('should be in the document', () => {
          expect(linkEl).toBeInTheDocument();
        });

        it('should contain text', () => {
          expect(linkText).toBeTruthy();
        });

        it('should match text and url', () => {
          expect(`${linkText} - ${linkUrl}`).toMatchSnapshot();
        });
      });
    }
  });

  describe('Story Promo', () => {
    const section = document.querySelector('section');

    if (section) {
      it('should be in the document', () => {
        expect(section).toBeInTheDocument();
      });

      describe('Image', () => {
        const imageEl = section.querySelector('img, amp-img');

        it('should be in the section', () => {
          expect(imageEl).toBeInTheDocument();
        });

        it('should match image', () => {
          expect(imageEl).toMatchSnapshot();
        });
      });

      describe('Headline', () => {
        const h3El = section.querySelector('h3');

        it('should be in the section', () => {
          expect(h3El).toBeInTheDocument();
        });

        it('should have text', () => {
          expect(h3El.textContent).toBeTruthy();
        });

        it('should match text', () => {
          expect(h3El.textContent).toMatchSnapshot();
        });
      });
    }
  });
};
