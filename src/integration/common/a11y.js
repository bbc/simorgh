export default ({ skipToContentText }) => {
  [amp, canonical].forEach((page) => {
    describe(`And using ${page.platform}`, () => {
      it('I can see a skip to content link that links to the main content of the page', () => {
        const skipToContentEl = page.getByText(skipToContentText);
        const mainContentEl = page.document.querySelector('h1');
        expect(skipToContentEl.getAttribute('href')).toBe('#content');
        expect(mainContentEl.getAttribute('id')).toBe('content');
        expect(mainContentEl.getAttribute('tabindex')).toBe('-1');
      });
    });
  });
};
