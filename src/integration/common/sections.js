/* eslint-disable no-restricted-syntax */
export default () => {
  describe('Sections', () => {
    const sections = document.querySelectorAll(
      'section:not([data-e2e="advertisement"])',
    );

    if (sections) {
      for (const section of sections) {
        it('should be in the document', () => {
          expect(section).toBeInTheDocument();
        });

        const headlineEl = section.querySelector('h2');

        it('should have a headline', () => {
          expect(headlineEl).toBeInTheDocument();
        });

        it('should match headline text', () => {
          expect(headlineEl.textContent).toMatchSnapshot();
        });
      }
    }
  });
};
