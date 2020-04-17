export default () => {
  describe('Media player', () => {
    describe('A11y', () => {
      it('I can read the media player title', () => {
        const mediaPlayerEl = document.querySelector('iframe, amp-iframe');

        expect(mediaPlayerEl).toBeInTheDocument();
        expect(mediaPlayerEl.textContent).toBeTruthy();
        expect(mediaPlayerEl.textContent).toMatchSnapshot();
      });
    });
  });
};
