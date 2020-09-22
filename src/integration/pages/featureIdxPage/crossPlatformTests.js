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

        const h2El = section.querySelector('h2');

        it('should have a headline', () => {
          expect(h2El).toBeInTheDocument();
        });

        it('should have a headline with text', () => {
          expect(h2El.textContent).toBeTruthy();
        });

        it('should match headline text', () => {
          expect(h2El.textContent).toMatchSnapshot();
        });
      });
    }
  });
};
