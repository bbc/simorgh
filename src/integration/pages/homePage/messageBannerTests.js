export default () => {
  describe('messageBanner', () => {
    const messagerBanner = document.querySelector(
      '[data-testid^="message-banner-"]',
    );

    it('Is displayed', () => {
      expect(messagerBanner).toBeInTheDocument();
      expect(messagerBanner).toBeTruthy();
    });

    it('has a link', () => {
      expect(messagerBanner.querySelector('a').href).toMatchSnapshot();
    });
  });
};
