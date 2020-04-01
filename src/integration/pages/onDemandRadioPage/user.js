export default ({ brandTitle, episodeTitle, episodeSummary }) => {
  [amp, canonical].forEach((page) => {
    describe(`And using ${page.platform}`, () => {
      it('I can see the brand title', () => {
        const brandTitleEl = page.getByText(brandTitle);

        expect(brandTitleEl).toBeInTheDocument();
      });

      it('I can see the episode title', () => {
        const episodeTitleEl = page.getByText(episodeTitle);

        expect(episodeTitleEl).toBeInTheDocument();
      });

      it('I can see the episode summary', () => {
        const episodeSummaryEl = page.getByText(episodeSummary);

        expect(episodeSummaryEl).toBeInTheDocument();
      });
    });
  });
};
