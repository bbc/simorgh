export default () => {
  describe('Lite Site Summary', () => {
    const liteSiteSummary = document.querySelector(
      "section[data-e2e='lite-summary']",
    );

    it('should be in the document', () => {
      expect(liteSiteSummary).toBeInTheDocument();
    });

    it('should match snapshot', () => {
      expect(liteSiteSummary).toMatchSnapshot();
    });
  });
};
