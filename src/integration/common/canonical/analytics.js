import '@testing-library/jest-dom/extend-expect';
import { renderAsJsDom } from '../../render';

export default ({ pageUrl }) => {
  describe('When I am analysing metrics', () => {
    it('I can see the data collected with ATI analytics', async () => {
      process.env.SIMORGH_ATI_BASE_URL = 'https://logws1363.ati-host.net?';
      const { document } = await renderAsJsDom(pageUrl);

      const noscriptImage = document.querySelector('noscript img');

      expect(noscriptImage.tagName).toEqual('IMG');
      expect(noscriptImage.getAttribute('width')).toEqual('1px');
      expect(noscriptImage.getAttribute('height')).toEqual('1px');
      expect(noscriptImage.getAttribute('src')).toMatch(
        'https://logws1363.ati-host.net?',
      );
    });
  });
};
