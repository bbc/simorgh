export default () => {
  describe('mostRead', () => {
    const mostRead = document.querySelector(`[data-testid^="most-read"]`);

    it('Is displayed', () => {
      expect(mostRead).toBeInTheDocument();
      expect(mostRead).toBeTruthy();
    });

    it('has a link', () => {
      expect(mostRead.querySelector('a')).toMatchSnapshot();
    });
  });
};
