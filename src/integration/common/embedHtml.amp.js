export default () => {
  describe('Embed HTML', () => {
    const embedErrorMessage = document.querySelector(
      `[data-e2e="embed-error"]`,
    );

    it('should render an Embed error message on AMP', () => {
      expect(embedErrorMessage).toBeInTheDocument();
    });

    it('should match snapshot', () => {
      expect(embedErrorMessage).toMatchSnapshot();
    });
  });
};
