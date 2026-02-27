export default () => {
  const messageBanner = document.querySelector(
    '[data-testid^="message-banner-"]',
  );

  if (!messageBanner) {
    // If no message banner is present, skip the tests
    return;
  }

  describe('messageBanner', () => {
    it('is displayed', () => {
      expect(messageBanner).toBeInTheDocument();
    });

    it('has a link', () => {
      const link = messageBanner.querySelector('a');
      expect(link?.href).toMatchSnapshot();
    });

    it('has an image', () => {
      const image = messageBanner.querySelector('img');
      expect(image).toMatchSnapshot();
    });
  });
};
