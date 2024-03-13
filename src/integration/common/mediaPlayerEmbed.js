export default () => {
  describe('Media Loader', () => {
    const mediaPlayerContainer = document.querySelector(
      'div[data-e2e=media-loader__container]',
    );

    it('renders a valid container', () => {
      expect(mediaPlayerContainer).toBeInTheDocument();
      expect(mediaPlayerContainer).toMatchSnapshot();
    });

    it('renders a placeholder', () => {
      const mediaPlayerPlaceholder = mediaPlayerContainer.querySelector(
        'button[data-e2e=media-loader__placeholder]',
      );
      expect(mediaPlayerPlaceholder).toBeInTheDocument();
      expect(mediaPlayerPlaceholder).toMatchSnapshot();
    });

    it('renders a figure caption', () => {
      const mediaPlayerCaption = mediaPlayerContainer.querySelector(
        'button[data-e2e=media-loader__placeholder]',
      );
      expect(mediaPlayerCaption).toBeInTheDocument();
      expect(mediaPlayerCaption).toMatchSnapshot();
    });

    describe('a11y', () => {
      it('assistive technology can read the media player title', () => {
        const mediaPlayerPlaceholder = mediaPlayerContainer.querySelector(
          'button[data-e2e=media-loader__placeholder]',
        );
        expect(mediaPlayerPlaceholder.getAttribute('title')).toBeTruthy();
        expect(mediaPlayerPlaceholder.getAttribute('title')).toMatchSnapshot();
      });
    });
  });
};
