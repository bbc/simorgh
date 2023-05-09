export default () => {
  describe('messageBanner', () => {
    const messagerBanner = document.querySelector(
      '[data-testid^="message-banner-"]',
    );

    it('message Banner is displayed', () => {
      expect(messagerBanner).toBeInTheDocument();
      expect(messagerBanner).toBeTruthy();
    });

    it('', () => {});
  });
};
