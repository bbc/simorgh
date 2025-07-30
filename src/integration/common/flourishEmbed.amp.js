export default () => {
  describe('Flourish Embed', () => {
    describe('Error messages', () => {
      const embedErrorMessages = document.querySelectorAll(
        `[data-e2e="embed-error"]`,
      );

      it('should all be in the document', () => {
        expect(embedErrorMessages).toBeTruthy();
        expect(embedErrorMessages.length).toEqual(5);
      });

      embedErrorMessages.forEach(errorEmbed => {
        describe('Link', () => {
          const linkEl = errorEmbed.querySelector('a');
          const text = linkEl.textContent;
          const url = linkEl.getAttribute('href');

          it('should be in the Error Embed', () => {
            expect(linkEl).toBeInTheDocument();
          });

          it('should have text', () => {
            expect(text).toBeTruthy();
          });

          it('should match text and url', () => {
            expect({ text, url }).toMatchSnapshot();
          });
        });
      });
    });
  });
};
