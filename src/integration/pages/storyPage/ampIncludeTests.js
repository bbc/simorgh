export default () => {
  describe('Includes', () => {
    it('renders for an IDT2 include as an amp img', () => {
      const idt2ImageElement = document.querySelector(
        'main div amp-img[src="https://www.test.bbc.com/ws/includes/idt2/ae805ced-e912-4f89-a9f5-105510946fad/image/470"]',
      );
      expect(idt2ImageElement).toBeInTheDocument();
      expect(idt2ImageElement).toMatchSnapshot();
    });
  });
};
