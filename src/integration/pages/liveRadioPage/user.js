const { amp, canonical } = global;

export default ({ headlineText, summaryText }) => {
  [amp, canonical].forEach(app => {
    it('I can see the headline', () => {
      const headlineEl = app.getByText(headlineText);

      expect(headlineEl).toBeInTheDocument();
    });

    it('I can see the summary', () => {
      const summaryEl = app.getByText(summaryText);

      expect(summaryEl).toBeInTheDocument();
    });
  });
};
