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

    it('has a decorative external icon', () => {
      const icon = messageBanner.querySelector('.external-svg');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('aria-hidden', 'true');
      expect(icon).toMatchSnapshot();
    });
  });
};
