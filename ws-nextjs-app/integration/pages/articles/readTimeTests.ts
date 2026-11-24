export default () => {
  describe('Read Time', () => {
    it('should be in the document', () => {
      const articleReadTime = document.querySelector(
        "[data-testid='read-time']",
      );
      expect(articleReadTime).toBeInTheDocument();
    });
  });
};
