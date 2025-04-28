export default () => {
  describe('Lite Site Cta', () => {
    const liteSiteSummary = document.querySelector(
      "section[data-e2e='lite-summary']",
    );

    it('should be in the document', () => {
      expect(liteSiteCta).toBeInTheDocument();
    });

    it('should match snapshot', () => {
      expect(liteSiteCta).toMatchSnapshot();
    });
  });
};
