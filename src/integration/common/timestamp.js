export default () => {
  describe('Timestamp', () => {
    console.log('DOC', document);
    const timestampEl = document.querySelector('time');
    console.log('timestamp', timestampEl);
    const date = timestampEl.getAttribute('datetime');
    const text = timestampEl.textContent;

    it('should be in the document', () => {
      expect(timestampEl).toBeInTheDocument();
    });

    it('should contain text', () => {
      expect(text).toBeTruthy();
    });

    it('should match text and date', () => {
      expect({ text, date }).toMatchSnapshot();
    });
  });
};
