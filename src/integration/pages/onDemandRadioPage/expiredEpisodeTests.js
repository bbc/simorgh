import runCommonEpisodeTests from './commonEpisodeTests';

export default () => {
  describe('Expired Episode', () => {
    runCommonEpisodeTests();

    it(`I can see the 'Content is not available' placeholder`, () => {
      const contentNotAvailableEl = document.querySelector('main div strong');

      expect(contentNotAvailableEl).toBeInTheDocument();
      expect(contentNotAvailableEl.textContent).toBeTruthy();
      expect(contentNotAvailableEl.textContent).toMatchSnapshot();
    });
  });
};
