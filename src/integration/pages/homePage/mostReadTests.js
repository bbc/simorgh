export default () => {
  describe('mostRead', () => {
    const mostRead = document.querySelector(`[data-testid^="most-read"]`);

    it('Is displayed', () => {
      expect(mostRead).toBeInTheDocument();
      expect(mostRead).toBeTruthy();
    });

    it('has multiple items', () => {
      const mostReadLinks = mostRead.querySelectorAll('a');

      mostReadLinks.forEach(link => {
        const url = link.getAttribute('href');
        const text = link.textContent;

        expect({ url, text }).toMatchSnapshot();
      });
    });
  });
};
