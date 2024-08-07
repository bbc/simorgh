export default () => {
  describe('Includes', () => {
    describe('IDT2', () => {
      it('I can see a fallback image', () => {
        const imageEl = document.querySelector(
          'amp-img[src="https://www.test.bbc.com/ws/includes/idt2/3686672a-0a64-4cdb-91c6-ae9ed0f214f7/image/640"]',
        );

        expect(imageEl).toBeInTheDocument();
        expect(imageEl).toMatchSnapshot();
      });
    });
  });
};
