export default () => {
  // eslint-disable-next-line no-only-tests/no-only-tests
  describe.only('Media Player Caption', () => {
    it('should have a caption under the media player', () => {
      const figcaptionEl = document.querySelectorAll('figcaption')[1];
      console.log(`figcaptionEl is ${figcaptionEl}`);
      expect(figcaptionEl).toBeInTheDocument();
      expect(figcaptionEl.textContent).toMatchSnapshot();
    });
  });
};
