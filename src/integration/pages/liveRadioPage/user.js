export default ({ headlineText, summaryText }) => {
  [amp, canonical].forEach(page => {
    describe(`And using ${page.platform}`, () => {
      it('I can see the headline', () => {
        const headlineEl = page.getByText(headlineText);

        expect(headlineEl).toBeInTheDocument();
      });

      it('I can see the summary', () => {
        const summaryEl = page.getByText(summaryText);

        expect(summaryEl).toBeInTheDocument();
      });
    });
  });
};
