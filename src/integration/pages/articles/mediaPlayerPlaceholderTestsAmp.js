export default () => {
  describe('Media Player Placeholder', () => {
    const mediaPlaceholderEl = document.querySelector(
      document.querySelector('amp-iframe >[data-e2e="image-placeholder"]'),
    );
    const imageEl = mediaPlaceholderEl.querySelector('img');
    it('should be in the document', () => {
      expect(imageEl).toBeInTheDocument();
    });
  });
};
