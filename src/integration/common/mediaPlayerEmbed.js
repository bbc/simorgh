export default () => {
  describe('Media player embed', () => {
    const mediaPlayerEl = document.querySelector('iframe, amp-iframe');

    it('should be in the document', () => {
      expect(mediaPlayerEl).toBeInTheDocument();
    });

    it('should have a src attribute value', () => {
      expect(mediaPlayerEl.getAttribute('title')).toBeTruthy();
    });

    it('should match src attribute value', () => {
      expect(mediaPlayerEl.getAttribute('src')).toMatchSnapshot();
    });

    describe('A11y', () => {
      it('should have a title attribute value', () => {
        expect(mediaPlayerEl.getAttribute('title')).toBeTruthy();
      });

      it('should match title attribute value', () => {
        expect(mediaPlayerEl.getAttribute('title')).toMatchSnapshot();
      });
    });
  });
};
