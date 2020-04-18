export default () => {
  describe('Media player -', () => {
    describe('a11y -', () => {
      it('assistive technology can read the media player title', () => {
        const mediaPlayerEl = document.querySelector('iframe, amp-iframe');

        expect(mediaPlayerEl).toBeInTheDocument();
        expect(mediaPlayerEl.getAttribute('title')).toBeTruthy();
        expect(mediaPlayerEl.getAttribute('title')).toMatchSnapshot();
      });
    });

    it('I can see an iframe with a url', () => {
      const mediaPlayerEl = document.querySelector('iframe, amp-iframe');

      expect(mediaPlayerEl).toBeInTheDocument();
      expect(mediaPlayerEl.getAttribute('src')).toBeTruthy();
      expect(mediaPlayerEl.getAttribute('src')).toMatchSnapshot();
    });
  });
};
