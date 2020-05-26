export default () => {
  describe('A11y', () => {
    describe('Skip to content link', () => {
      const skipToContentEl = document.querySelector('a[href="#content"]');

      it('should be in the document', () => {
        expect(skipToContentEl).toBeInTheDocument();
      });

      it('should have text', () => {
        expect(skipToContentEl.textContent).toBeTruthy();
      });

      it('should match text', () => {
        expect(skipToContentEl.textContent).toMatchSnapshot();
      });
    });

    it('Accessible main headline', () => {
      const headingEl = document.querySelector('h1');
      const headingId = headingEl.getAttribute('id');
      const headingTabIndex = headingEl.getAttribute('tabindex');

      expect(headingEl).toBeInTheDocument();
      expect(headingId).toBe('content');
      expect(headingTabIndex).toBe('-1');
    });
  });
};
