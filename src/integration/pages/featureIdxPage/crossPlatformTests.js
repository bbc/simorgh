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
};
