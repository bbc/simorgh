export default () => {
  describe('embedHtml', () => {
    const embedHtml = document.querySelector(
      'iframe[src="https://www.riddle.com/embed/a/SAVstNdh?lazyImages=true&staticHeight=false"]',
    );

    it('should be in the document', () => {
      expect(embedHtml).toBeInTheDocument();
    });

    it('should match snapshot', () => {
      expect(embedHtml).toMatchSnapshot();
    });
  });
};
