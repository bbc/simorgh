export default () => {
  describe('Includes', () => {
    it('I can see the require script is included', () => {
      expect(
        document.querySelector(
          'head > script[src="https://news.files.bbci.co.uk/include/vjassets/js/vendor/require-2.1.20b.min.js"]',
        ),
      ).toBeInTheDocument();
    });
  });
};
