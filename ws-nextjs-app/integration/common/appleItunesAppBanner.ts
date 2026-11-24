export default () => {
  describe('Apple iTunes App meta tag', () => {
    const appleItunesApp = document.querySelector(
      'meta[name="apple-itunes-app"]',
    );

    it('should be in the document', () => {
      expect(appleItunesApp).toBeInTheDocument();
    });

    it('should contain content', () => {
      expect(appleItunesApp).toBeInTheDocument();
      const content = appleItunesApp?.getAttribute('content');
      expect(content).toBeTruthy();
    });

    it('should match name and content', () => {
      expect(appleItunesApp).toBeInTheDocument();
      const name = appleItunesApp?.getAttribute('name');
      const content = appleItunesApp?.getAttribute('content');
      expect({ name, content }).toMatchSnapshot();
    });
  });
};
