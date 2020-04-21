export default () => {
  describe('Media player embed', () => {
    it('I can see the media player embed', () => {
      const audioPlayerIframe = document.querySelector('iframe, amp-iframe');

      expect(audioPlayerIframe.getAttribute('src')).toMatchSnapshot();
    });

    describe('A11y', () => {
      it('I can read the media player title', () => {
        const mediaPlayerEl = document.querySelector('iframe, amp-iframe');

        expect(mediaPlayerEl).toBeInTheDocument();
        expect(mediaPlayerEl.getAttribute('title')).toBeTruthy();
        expect(mediaPlayerEl.getAttribute('title')).toMatchSnapshot();
      });
    });
  });
};
