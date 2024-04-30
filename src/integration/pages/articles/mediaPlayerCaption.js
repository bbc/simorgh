export default () => {
  describe('Media Player Caption', () => {
    it('should have a caption under the media player', () => {
      const figcaptionEl = document.querySelectorAll('figcaption')[1];
      expect(figcaptionEl).toBeInTheDocument();
      expect(figcaptionEl.textContent).toMatchSnapshot();
    });
  });
};
