/* eslint-disable no-template-curly-in-string */
import Cookie from 'js-cookie';
import onClient from '../utilities/onClient';

let isOnClient = true;

jest.mock('../utilities/onClient', () => jest.fn());
onClient.mockImplementation(() => isOnClient);

jest.mock('#app/lib/utilities/getUUID', () =>
  jest.fn().mockImplementation(() => 'some-random-uuid'),
);

const windowLocationHrefSpy = jest.spyOn(window.location, 'href', 'get');

const {
  enforceLegacyDestinationForJapanese,
  getAppType,
  getHref,
  getReferrer,
  sanitise,
  onOnionTld,
} = require('./index');

const returnsNullWhenOffClient = func => {
  describe('returns null when not on client', () => {
    beforeEach(() => {
      isOnClient = false;
    });

    afterEach(() => {
      isOnClient = true;
    });

    it('should find value in good data', () => {
      expect(func()).toEqual(null);
    });
  });
};

describe('analyticsUtils', () => {
  beforeEach(() => {
    windowLocationHrefSpy.mockImplementation(() => 'http://localhost');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('enforceLegacyDestinationForJapanese', () => {
    it('should return the Reverb tracking URL with the legacy Piano destination for NEWS_LANGUAGES_GNL used by the Japanese service', () => {
      expect(
        enforceLegacyDestinationForJapanese(
          'https://logws1363.ati-host.net/hit.xiti?idclient=9065bbd4-6374-4348-9082-9497ef5a18ad&s=646753&s2=56&p=japanese.articles.cvgr9dk5dlno.page',
        ),
      ).toEqual(
        'https://logws1363.ati-host.net/hit.xiti?idclient=9065bbd4-6374-4348-9082-9497ef5a18ad&s=598289&s2=56&p=japanese.articles.cvgr9dk5dlno.page',
      );
    });
  });

  describe('getAppType', () => {
    const getAppTypeScenarios = [
      {
        platform: 'amp',
        expected: 'amp',
        summary: 'should return amp for amp',
      },
      {
        platform: 'app',
        expected: 'mobile-app',
        summary: 'should return mobile-app for app',
      },
      {
        platform: 'lite',
        expected: 'lite',
        summary: 'should return lite for lite',
      },
      {
        platform: 'canonical',
        expected: 'responsive',
        summary: 'should return responsive for amp',
      },
      {
        platform: null,
        expected: 'responsive',
        summary: 'should return responsive for null',
      },
      {
        platform: undefined,
        expected: 'responsive',
        summary: 'should return responsive for undefined',
      },
    ];

    getAppTypeScenarios.forEach(({ platform, expected, summary }) => {
      it(summary, () => {
        const appType = getAppType(platform);
        expect(appType).toEqual(expected);
      });
    });
  });

  describe('isLocServeCookieSet', () => {
    beforeEach(() => {
      Cookie.remove('loc_serve');
    });
    // eslint-disable-next-line global-require
    returnsNullWhenOffClient(require('./index').isLocServeCookieSet);

    it('should return true if cookie is set', () => {
      const { isLocServeCookieSet } = require('./index'); // eslint-disable-line global-require

      Cookie.set('loc_serve', 'value');

      const locServeCookie = isLocServeCookieSet();

      expect(locServeCookie).toEqual(true);
    });

    it('should return false if cookie is not set', () => {
      const { isLocServeCookieSet } = require('./index'); // eslint-disable-line global-require

      const locServeCookie = isLocServeCookieSet();

      expect(locServeCookie).toEqual(false);
    });
  });

  describe('getHref', () => {
    returnsNullWhenOffClient(getHref);

    it('should return location href', () => {
      windowLocationHrefSpy.mockImplementation(() => 'https://href.com');
      const href = getHref();

      expect(href).toEqual('https://href.com');
    });

    it('should return null if href isnt set', () => {
      windowLocationHrefSpy.mockImplementation(() => null);
      const href = getHref();

      expect(href).toEqual(null);
    });

    it('should return href with anchor text', () => {
      windowLocationHrefSpy.mockImplementation(
        () => 'https://www.example.com/#anchortext',
      );

      const href = getHref();
      expect(href).toEqual('https://www.example.com/#anchortext');
    });
  });

  describe('getReferrer', () => {
    returnsNullWhenOffClient(getHref);

    it('should return document referrer', () => {
      Object.defineProperty(window.document, 'referrer', {
        configurable: true,
        value: 'https://referrer.com',
      });

      const referrer = getReferrer();

      expect(referrer).toEqual('https://referrer.com');
    });

    it('should return null if referrer isnt set', () => {
      Object.defineProperty(window.document, 'referrer', {
        configurable: true,
        value: null,
      });

      const referrer = getReferrer();

      expect(referrer).toEqual(null);
    });
  });

  describe('sanitise', () => {
    it('should replace all spaces with a + character', () => {
      expect(sanitise('hi hello there')).toEqual('hi%20hello%20there');
    });
  });

  describe('onOnionTld', () => {
    it.each`
      expectation               | currentUrl                                                                                            | expectedValue
      ${'true for onion TLD'}   | ${'https://www.bbcnewsd73hkzno2ini43t4gblxvycyac5aw4gnv7t2rccijh7745uqd.onion/news'}                  | ${true}
      ${'true for onion TLD'}   | ${'https://www.bbcweb3hytmzhn5d532owbu6oqadra5z3ar726vq5kgwwn6aucdccrad.onion/russian'}               | ${true}
      ${'true for onion TLD'}   | ${'https://www.bbcweb3hytmzhn5d532owbu6oqadra5z3ar726vq5kgwwn6aucdccrad.onion/russian/news-60699063'} | ${true}
      ${'false for .co.uk TLD'} | ${'https://www.bbc.co.uk/news'}                                                                       | ${false}
      ${'false for .com TLD'}   | ${'https://www.bbc.com/news'}                                                                         | ${false}
      ${'false for .com TLD'}   | ${'https://www.bbcrussian.com/russian/live/news-60661774'}                                            | ${false}
    `('should return $expectation', ({ currentUrl, expectedValue }) => {
      const { host } = new URL(currentUrl);

      jest.spyOn(window.location, 'host', 'get').mockImplementation(() => host);

      expect(onOnionTld()).toEqual(expectedValue);
    });
  });
});
