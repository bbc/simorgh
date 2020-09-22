import { runCommonCrossPlatformTests, runMainHeadingTests } from '../../common';

export default service => {
  runCommonCrossPlatformTests(service);
  runMainHeadingTests();

  describe('Sections', () => {
    const sections = document.querySelectorAll('section');

    if (sections) {
      sections.forEach(section => {
        it('should be in the document', () => {
          expect(section).toBeInTheDocument();
        });

        const h3El = section.querySelector('h3');

        it('should have a headline', () => {
          expect(h3El).toBeInTheDocument();
        });

        it('should have a headline with text', () => {
          expect(h3El.textContent).toBeTruthy();
        });

        it('should match headline text', () => {
          expect(h3El.textContent).toMatchSnapshot();
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
