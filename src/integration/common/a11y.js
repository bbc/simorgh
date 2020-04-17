export default () => {
  describe('A11y', () => {
    it('I can see the skip to content link', () => {
      const skipToContentEl = document.querySelector('[href="#content"]');

      expect(skipToContentEl).toBeInTheDocument();
      expect(skipToContentEl.textContent).toBeTruthy();
      expect(skipToContentEl.textContent).toMatchSnapshot();
    });

    it('Headline in main content', () => {
      const accessibleH1El = document.querySelector(
        'h1[id="content"][tabindex="-1"]',
      );

      expect(accessibleH1El).toBeInTheDocument();
    });
  });
};
