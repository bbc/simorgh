export default () => {
  describe('Most Read', () => {
    const mostRead = document.querySelector(`[data-e2e="most-read"]`);

    if (mostRead) {
      it('is displayed', () => {
        expect(mostRead).toBeInTheDocument();
        expect(mostRead).toBeTruthy();
      });

      it('has item with rank', () => {
        const mostReadLinks = mostRead.querySelectorAll('a');

        mostReadLinks.forEach(link => {
          const url = link.getAttribute('href');
          const text = link.textContent;

          expect({ url, text }).toMatchSnapshot();
        });
      });
    }
  });
};
