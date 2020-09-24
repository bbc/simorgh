export default () => {
  describe('Apple iTunes App Banner meta tag', () => {
    const appleItunesApp = document.querySelector(
      'meta[name="apple-itunes-app"]',
    );

    const name = appleItunesApp.getAttribute('name');
    const content = appleItunesApp.getAttribute('content');

    it('should be in the document', () => {
      expect(appleItunesApp).toBeInTheDocument();
    });

    it('should contain content', () => {
      expect(content).toBeTruthy();
    });

    it('should match name and content', () => {
      expect({ name, content }).toMatchSnapshot();
    });
  });
};
