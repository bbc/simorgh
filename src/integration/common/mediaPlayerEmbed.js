export default () => {
  describe('Media Player', () => {
    const mediaPlayerIframe = document.querySelector('iframe, amp-iframe');

    beforeEach(() => {
      expect(mediaPlayerIframe).toBeInTheDocument();
    });

    it('should be rendered', () => {
      expect(mediaPlayerIframe.getAttribute('src')).toBeTruthy();
      expect(mediaPlayerIframe.getAttribute('src')).toMatchSnapshot();
    });

    describe('a11y', () => {
      it('assistive technology can read the media player title', () => {
        expect(mediaPlayerIframe.getAttribute('title')).toBeTruthy();
        expect(mediaPlayerIframe.getAttribute('title')).toMatchSnapshot();
      });
    });
  });
};
