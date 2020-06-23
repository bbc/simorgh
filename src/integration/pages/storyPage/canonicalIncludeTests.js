export default () => {
  describe('Includes', () => {
    describe('IDT2', () => {
      it('I can see a "dataPic"', () => {
        const scriptEl = document.querySelector(
          'script[src="https://news.test.files.bbci.co.uk/include/idt2/static/js/dataPic.64a69df2.js"]',
        );
        expect(scriptEl).toBeInTheDocument();
        expect(scriptEl).toMatchSnapshot();
      });
    });
  });
};
