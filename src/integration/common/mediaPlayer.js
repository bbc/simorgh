export default () => {
  describe('Media player', () => {
    describe('A11y', () => {
      it('I can read the media player title', () => {
        const mediaPlayerEl = document.querySelector('iframe, amp-iframe');

        expect(mediaPlayerEl).toBeInTheDocument();
        expect(mediaPlayerEl.getAttribute('src')).toBeTruthy();
        expect(mediaPlayerEl.getAttribute('src')).toMatchSnapshot();
      });
    });
  });
};
