export default () => {
  describe('Media Player Placeholder AMP', () => {
    const mediaPlaceholderEl = document.querySelector(
      'amp-iframe >[data-e2e="image-placeholder"]',
    );

    it('should be in the document', () => {
      expect(mediaPlaceholderEl).toBeInTheDocument();
    });
  });
};
