export default () => {
  describe('Includes', () => {
    describe('IDT2', () => {
      it('I can see a fallback image', () => {
        const imageEl = document.querySelector(
          'amp-img[src="https://ichef.bbci.co.uk/news/1280/idt2-test/idt2/3686672a-0a64-4cdb-91c6-ae9ed0f214f7/image/640"]',
        );

        expect(imageEl).toBeInTheDocument();
        expect(imageEl).toMatchSnapshot();
      });
    });
  });
};
