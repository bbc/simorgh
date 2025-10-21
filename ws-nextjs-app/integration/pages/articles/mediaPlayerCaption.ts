export default () => {
  describe('Media Player Caption', () => {
    it('should have a caption under the media player', () => {
      const [, figcaptionEl] = Array.from(
        document.querySelectorAll('figcaption'),
      );
      expect(figcaptionEl).toBeInTheDocument();
      expect(figcaptionEl.textContent).toMatchSnapshot();
    });
  });
};
