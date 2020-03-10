import { JSDOM } from 'jsdom';
import '@testing-library/jest-dom/extend-expect';
import { renderAppStaticMarkup } from '../renderApp';

export default ({ pageUrl }) => {
  describe('Common analytics tests', () => {
    it('should have a noscript img tag with the ati url', async () => {
      process.env.SIMORGH_ATI_BASE_URL = 'https://logws1363.ati-host.net?';

      // getting contents inside of a noscript element is tricky
      // if we have to do this again consider some sort of abstraction
      const staticMarkup = await renderAppStaticMarkup(pageUrl); // we have to render static markup because a React render will remove noscript contents
      const appFragment = JSDOM.fragment(staticMarkup); // using JSDOM create a fragment of DOM from the static markup string
      const noscriptContent = appFragment.querySelector('noscript').textContent; // get the noscript el using specifically textContent because it doesn't escape HTML characters
      const noscriptContentEl = JSDOM.fragment(noscriptContent).firstChild; // using JSDOM create a fragment from the noscript content string

      expect(noscriptContentEl.tagName).toEqual('IMG');
      expect(noscriptContentEl.getAttribute('width')).toEqual('1px');
      expect(noscriptContentEl.getAttribute('height')).toEqual('1px');
      expect(noscriptContentEl.getAttribute('src')).toMatch(
        'https://logws1363.ati-host.net?',
      );
      // some sort of cleanup needs to happen here to fix the failing tests
    });
  });
};
