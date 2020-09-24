import {
  runCommonCrossPlatformTests,
  runMainHeadingTests,
  runStoryPromoTests,
} from '../../common';

export default service => {
  runCommonCrossPlatformTests(service);
  runMainHeadingTests();
  runStoryPromoTests();

  describe('Sections', () => {
    const sections = document.querySelectorAll('section');

    if (sections) {
      sections.forEach(section => {
        it('should be in the document', () => {
          expect(section).toBeInTheDocument();
        });

        const h2El = section.querySelector('h2');

        it('should have a headline', () => {
          expect(h2El).toBeInTheDocument();
        });
      });
    }
  });
};
