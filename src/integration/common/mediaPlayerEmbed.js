export default () => {
  describe('Media player embed', () => {
    describe('A11y', () => {
      it('I can see the audio player embed', () => {
        const audioPlayerIframe = document.querySelector('iframe, amp-iframe');

        expect(audioPlayerIframe.getAttribute('src')).toMatchSnapshot();
      });

      it('I can read the media player title', () => {
        const mediaPlayerEl = document.querySelector('iframe, amp-iframe');

        expect(mediaPlayerEl).toBeInTheDocument();
        expect(mediaPlayerEl.getAttribute('title')).toBeTruthy();
        expect(mediaPlayerEl.getAttribute('title')).toMatchSnapshot();
      });
    });
  });
};
