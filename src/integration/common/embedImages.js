export default () => {
  describe('embedImages', () => {
    const embedImage = document.querySelector("div[data-e2e='embed-image']");

    it('should be in the document', () => {
      expect(embedImage).toBeInTheDocument();
    });

    it('should match snapshot', () => {
      expect(embedImage).toMatchSnapshot();
    });
  });
};
