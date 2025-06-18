export default pageType => {
  describe('Media Loader', () => {
    const mediaPlayerContainer = document.querySelector(
      'figure[data-e2e=media-loader__container]',
    );

    it('renders a valid container', () => {
      expect(mediaPlayerContainer).toBeInTheDocument();
      expect(mediaPlayerContainer).toMatchSnapshot();
    });

    if (!['Media Article Page', 'Media Asset Page'].includes(pageType)) {
      it('renders a placeholder', () => {
        const mediaPlayerPlaceholder = mediaPlayerContainer.querySelector(
          'div[data-e2e=media-loader__placeholder]',
        );
        expect(mediaPlayerPlaceholder).toBeInTheDocument();
        expect(mediaPlayerPlaceholder).toMatchSnapshot();
      });

      it('renders a figure caption', () => {
        const mediaPlayerCaption = mediaPlayerContainer.querySelector(
          'div[data-e2e=media-loader__placeholder]',
        );
        expect(mediaPlayerCaption).toBeInTheDocument();
        expect(mediaPlayerCaption).toMatchSnapshot();
      });

      describe('a11y', () => {
        it('assistive technology can read the media player title', () => {
          const mediaPlayerPlaceholder = mediaPlayerContainer.querySelector(
            'div[data-e2e=media-loader__placeholder] > button > span',
          );

          expect(mediaPlayerPlaceholder.innerHTML).toBeTruthy();
          expect(mediaPlayerPlaceholder.innerHTML).toMatchSnapshot();
        });
      });
    }
  });
};
