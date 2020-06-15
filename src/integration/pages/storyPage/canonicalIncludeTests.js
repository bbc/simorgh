export default () => {
  describe('Includes', () => {
    it("I can see the social media provider's JavaScript", () => {
      expect(
        document.querySelector(
          'head > script[src="https://news.files.bbci.co.uk/include/vjassets/js/vendor/require-2.1.20b.min.js"]',
        ),
      ).toBeInTheDocument();
    });
  });
};
