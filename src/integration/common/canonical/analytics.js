import '@testing-library/jest-dom/extend-expect';
import { renderFullHTML } from '../../renderApp';

export default ({ pageUrl }) => {
  describe('Analytics', () => {
    it('should have a noscript img tag with the ati url', async () => {
      process.env.SIMORGH_ATI_BASE_URL = 'https://logws1363.ati-host.net?';
      const { document } = await renderFullHTML(pageUrl);
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
