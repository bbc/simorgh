export default () => {
  describe('Timestamp', () => {
    const timestampEl = document.querySelector('time');
    const timestamp = timestampEl.textContent;

    it('should be in the document', () => {
      expect(timestampEl).toBeInTheDocument();
    });

    it('should contain text', () => {
      expect(timestamp).toBeTruthy();
    });

    it('should match text', () => {
      expect(timestamp).toMatchSnapshot();
    });
  });
};
