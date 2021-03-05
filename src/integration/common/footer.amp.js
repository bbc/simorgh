export default () => {
  describe('Footer', () => {
    describe('Cookie Settings Button', () => {
      const button = document.querySelector(
        'footer [data-testid="amp-cookie-settings-button"]',
      );

      const buttonText = button.textContent;
      const buttonOnHandler = button.getAttribute('on');

      it('should be in the document', () => {
        expect(button).toBeInTheDocument();
      });

      it('should contain text', () => {
        expect(buttonText).toBeTruthy();
      });

      it('should match text and on handler', () => {
        expect({
          text: buttonText,
          on: buttonOnHandler,
        }).toMatchSnapshot();
      });
    });
  });
};
