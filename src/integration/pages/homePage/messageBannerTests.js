export default () => {
  describe('messageBanner', () => {
    const messageBanner = document.querySelector(
      '[data-testid^="message-banner-"]',
    );

    if (messageBanner) {
      it('is displayed', () => {
        expect(messageBanner).toBeInTheDocument();
        expect(messageBanner).toBeTruthy();
      });

      it('has a link', () => {
        expect(messageBanner.querySelector('a').href).toMatchSnapshot();
      });

      it('has an image', () => {
        expect(messageBanner.querySelector('img')).toMatchSnapshot();
      });
    }
  });
};
