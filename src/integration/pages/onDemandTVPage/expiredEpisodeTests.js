import getTextContent from '../../utils/getTextContent';
import runCommonEpisodeTests from './commonEpisodeTests';

export default () => {
  describe('Expired Episode', () => {
    runCommonEpisodeTests();

    it(`I can see the 'Content is not available' placeholder`, () => {
      const contentNotAvailableEl = document.querySelector('main div strong');

      expect(contentNotAvailableEl).toBeInTheDocument();
      expect(getTextContent(contentNotAvailableEl)).toBeTruthy();
      expect(getTextContent(contentNotAvailableEl)).toMatchSnapshot();
    });
  });
};
