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
      expect(messagerBanner.querySelector('a').href).toMatch(
        'https://www.bbc.com/kyrgyz/bbc_kyrgyz_tv/tv_programmes/w13xttqx?limit=4',
      );
    });
  });
};
