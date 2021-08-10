export default () => {
  describe('gist', () => {
    it('should render the title', () => {
      const gistTitle = document.getElementById('gist-title');
      const gistTitleText = gistTitle.textContent;

      expect(gistTitle).toBeInTheDocument();
      expect(gistTitleText).toBeTruthy();
    });

    it('should render a list', () => {
      const gistList = document.querySelector(
        `div[aria-labelledby='gist-title'] ul[role="list"] > li`,
      );
      expect(gistList).toBeInTheDocument();
    });
  });
};
