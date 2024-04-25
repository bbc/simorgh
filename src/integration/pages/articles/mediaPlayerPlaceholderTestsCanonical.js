export default () => {
  describe('Media Player Placeholder Canonical', () => {
    const mediaPlaceholderEl = document.querySelector(
      '[data-e2e="media-player"]>:first-child',
    );
    const imageEl = mediaPlaceholderEl.querySelector('img');
    it('should be in the document', () => {
      expect(imageEl).toBeInTheDocument();
    });
  });
};
