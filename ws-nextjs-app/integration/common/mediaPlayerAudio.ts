export default () => {
  describe('Media Loader', () => {
    const mediaPlayerContainer = document.querySelector(
      'figure[data-e2e=media-loader__container]',
    );

    it('renders a valid container', () => {
      expect(mediaPlayerContainer).toBeInTheDocument();
      expect(mediaPlayerContainer).toMatchSnapshot();
    });
  });
};
