export default () => {
  jest.retryTimes(3);
  // TODO: Figure out why these tests are so flakey
  describe.skip('Includes', () => {
    describe('IDT2', () => {
      it('I can see a "dataPic"', () => {
        const scriptEl = document.querySelector(
          'script[src*="https://b.files.bbci.co.uk/graphics/static/js/dataPic"]',
        );
        expect(scriptEl).toBeInTheDocument();
      });
    });

    /**
     * Temporary coverage for Canonical IDT2 Includes that contain
     * disallowed scripts. These are rendered as images instead.
     */
    it('I can see a fallback image when there are disallowed scripts', () => {
      const imageEl = document.querySelector(
        'img[src="https://www.test.bbc.com/ws/includes/idt2/3686672a-0a64-4cdb-91c6-ae9ed0f214f7/image/816"]',
      );

      expect(imageEl).toBeInTheDocument();
      expect(imageEl).toMatchSnapshot();
    });
  });
};
