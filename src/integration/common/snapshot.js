const { amp, canonical } = global;

export default () => {
  [amp, canonical].forEach(page => {
    it('I can see the server-rendered HTML', () => {
      expect(page.document.querySelector('html').outerHTML).toMatchSnapshot();
    });
  });
};
