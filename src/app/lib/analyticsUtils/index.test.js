/* eslint-disable no-template-curly-in-string */
import Cookie from 'js-cookie';
import {
  setWindowValue,
  resetWindowValue,
} from '#psammead/psammead-test-helpers/src';
import onClient from '../utilities/onClient';

let isOnClient = true;

jest.mock('../utilities/onClient', () => jest.fn());
onClient.mockImplementation(() => isOnClient);

jest.mock('#app/lib/utilities/getUUID', () =>
  jest.fn().mockImplementation(() => 'some-random-uuid'),
);

const {
  getDestination,
  getScreenInfo,
  getBrowserViewPort,
  getCurrentTime,
  getDeviceLanguage,
  getAppType,
  getHref,
  getReferrer,
  getPublishedDatetime,
  getAtUserId,
  sanitise,
  getAtiUrl,
  getEventInfo,
  getThingAttributes,
  getXtorMarketingString,
  getCampaignType,
  getRSSMarketingString,
  getAffiliateMarketingString,
  getSLMarketingString,
  getEmailMarketingString,
  getCustomMarketingString,
  getDisplayMarketingString,
  getATIMarketingString,
  onOnionTld,
  getContentId,
} = require('./index');

const FIXTURE_PAGEDATA = {
  metadata: {
    analyticsLabels: {
      contentId: 'urn:bbc:cps:curie:asset:29375628-9511-42e6-be88-ebaa1158f597',
    },
  },
};

const SRC_RSS_FIXTURE = {
  key: 'src_medium',
  description: 'rss campaign prefix',
  value: 'RSS',
  wrap: false,
};

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
  describe('getDestination', () => {
    it.each`
      platform       | statsDestination
      ${'amp'}       | ${null}
      ${'canonical'} | ${null}
      ${null}        | ${null}
      ${'amp'}       | ${undefined}
      ${'canonical'} | ${undefined}
      ${undefined}   | ${undefined}
    `(
      'should return the safe default (NEWS_PS) where statsDestination is nullish',
      ({ platform, statsDestination }) => {
        expect(getDestination(platform, statsDestination)).toBe(598285);
      },
    );

    it.each`
      platform     | statsDestination   | expected
      ${null}      | ${'SPORT_PS_TEST'} | ${598311}
      ${undefined} | ${'PS_HOMEPAGE'}   | ${598273}
    `(
      'should return the correct destination id if platform is nullish',
      ({ platform, statsDestination, expected }) => {
        expect(getDestination(platform, statsDestination)).toBe(expected);
      },
    );

    it.each`
      statsDestination   | expected
      ${'NEWS_PS'}       | ${598285}
      ${'NEWS_GNL_TEST'} | ${598288}
      ${'NEWSROUND'}     | ${598293}
      ${'SPORT_PS_TEST'} | ${598311}
    `(
      'should return the correct destination id for $statsDestination on canonical',
      ({ statsDestination, expected }) => {
        expect(getDestination('canonical', statsDestination)).toBe(expected);
      },
    );

    it('should return amp substitution expression for destination with GNL and PS destinations defined', () => {
      expect(getDestination('amp', 'NEWS_LANGUAGES_PS')).toBe(
        '$IF($EQUALS($MATCH(${ampGeo}, gbOrUnknown, 0), gbOrUnknown), 598291, 598289)',
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

  describe('getScreenInfo', () => {
    const windowScreen = window.screen;

    afterEach(() => {
      resetWindowValue('screen', windowScreen);
    });

    returnsNullWhenOffClient(getScreenInfo);

    it('should concat screen values, joined by "x"', () => {
      setWindowValue('screen', {
        width: 1,
        height: 2,
        colorDepth: 3,
        pixelDepth: 4,
      });

      const screenInfo = getScreenInfo();

      expect(screenInfo).toEqual('1x2x3x4');
    });

    it('should use 0 to fill unknown values', () => {
      setWindowValue('screen', {
        width: 1,
        height: 2,
        colorDepth: null,
        pixelDepth: null,
      });

      const screenInfo = getScreenInfo();

      expect(screenInfo).toEqual('1x2x0x0');
    });
  });

  describe('getBrowserViewPort', () => {
    const windowInnerWidth = window.innerWidth;
    const windowInnerHeight = window.innerHeight;

    afterEach(() => {
      resetWindowValue('innerWidth', windowInnerWidth);
      resetWindowValue('innerHeight', windowInnerHeight);
    });

    returnsNullWhenOffClient(getBrowserViewPort);

    it('should concat values, joined by "x"', () => {
      setWindowValue('innerWidth', 1234);
      setWindowValue('innerHeight', 4321);

      const browserViewPort = getBrowserViewPort();

      expect(browserViewPort).toEqual('1234x4321');
    });

    it('should use 0 to fill unknown values', () => {
      setWindowValue('innerWidth', null);
      setWindowValue('innerHeight', 4321);

      const browserViewPort = getBrowserViewPort();

      expect(browserViewPort).toEqual('0x4321');
    });
  });

  describe('getCurrentTime', () => {
    const originalDate = global.Date;

    afterEach(() => {
      global.Date = originalDate;
    });

    returnsNullWhenOffClient(getCurrentTime);

    it('should return hours, mins and seconds joined by "x"', () => {
      const mockDate = {
        getHours: jest.fn().mockReturnValue('12'),
        getMinutes: jest.fn().mockReturnValue('23'),
        getSeconds: jest.fn().mockReturnValue('45'),
      };
      global.Date = jest.fn(() => mockDate);

      const ATITime = getCurrentTime();

      expect(ATITime).toEqual('12x23x45');
    });
  });

  describe('getDeviceLanguage', () => {
    const windowNavigator = window.navigator;

    afterEach(() => {
      resetWindowValue('navigator', windowNavigator);
    });

    returnsNullWhenOffClient(getDeviceLanguage);

    it('should return navigator language', () => {
      setWindowValue('navigator', {
        language: 'abc',
      });

      const deviceLanguage = getDeviceLanguage();

      expect(deviceLanguage).toEqual('abc');
    });

    it('should return null if langage isnt set', () => {
      setWindowValue('navigator', {
        language: null,
      });

      const deviceLanguage = getDeviceLanguage();

      expect(deviceLanguage).toEqual(null);
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

  describe('getContentId', () => {
    it('should return content id when its present in the data', () => {
      const expectedResult =
        'urn:bbc:cps:curie:asset:29375628-9511-42e6-be88-ebaa1158f597';
      const result = getContentId(FIXTURE_PAGEDATA);
      expect(result).toEqual(expectedResult);
    });

    it('should return null when no data is present', () => {
      const result = getContentId({});
      expect(result).toEqual(null);
    });

    it('should return null when data is invalid', () => {
      const result = getContentId('hello world');
      expect(result).toEqual(null);
    });
  });

  describe('getHref', () => {
    const windowLocation = window.location;

    afterEach(() => {
      resetWindowValue('location', windowLocation);
    });

    returnsNullWhenOffClient(getHref);

    it('should return location href', () => {
      setWindowValue('location', {
        href: 'https://href.com',
      });

      const href = getHref();

      expect(href).toEqual('https://href.com');
    });

    it('should return null if href isnt set', () => {
      setWindowValue('location', {
        href: null,
      });

      const href = getHref();

      expect(href).toEqual(null);
    });

    it('should return href with anchor text', () => {
      setWindowValue('location', {
        href: 'https://www.example.com/#anchortext',
      });
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

  describe('getPublishedDatetime', () => {
    const data = {
      metadata: {
        firstPublished: 946688461000,
        seconds: 1504785600000,
        invalidDate: 'foobar',
      },
    };

    it('should find value in good data', () => {
      const publishedTime = getPublishedDatetime('firstPublished', data);

      expect(publishedTime).toEqual('2000-01-01T01:01:01.000Z');
    });

    it('should autodetect timestamp in seconds and autocorrect', () => {
      const secondsTimestamp = getPublishedDatetime('seconds', data);

      expect(secondsTimestamp).toEqual('2017-09-07T12:00:00.000Z');
    });

    it('should return null if type not found', () => {
      const publishedTime = getPublishedDatetime('foobar', data);

      expect(publishedTime).toEqual(null);
    });

    it('should return null if timestamp is invalid', () => {
      const publishedTime = getPublishedDatetime('invalidDate', data);

      expect(publishedTime).toEqual(null);
    });
  });

  describe('getAtiUrl', () => {
    it('should return url', () => {
      const data = [
        {
          key: 'a',
          value: 'a1',
          wrap: false,
        },
        {
          key: 'b',
          value: 'b1',
          wrap: true,
        },
        {
          key: 'c',
          value: 'c1',
          wrap: false,
        },
      ];
      expect(getAtiUrl(data)).toEqual('a=a1&b=[b1]&c=c1');
    });

    it('should return empty string', () => {
      const data = [];
      expect(getAtiUrl(data)).toEqual('');
    });
  });

  describe('getEventInfo', () => {
    const params = {
      pageIdentifier: 'page-identifier',
      componentName: 'component-name',
      campaignID: 'campaign-id',
      url: 'url',
      format: 'format',
      detailedPlacement: 'detailed-placement',
      advertiserID: 'mundo',
      experimentVariant: 'a/b-test',
    };

    it('should return url section', () => {
      expect(getEventInfo(params)).toEqual(
        'PUB-[campaign-id]-[component-name]-[a/b-test]-[format]-[page-identifier]-[detailed-placement]-[mundo]-[url]',
      );
    });

    it('should allow empty values', () => {
      expect(getEventInfo()).toContain('PUB-[]-[]-[]-[]-[]-[]-[]-[]');
    });
  });

  describe('getAtUserId', () => {
    let cookieSetterSpy;

    returnsNullWhenOffClient(getAtUserId);
    beforeEach(() => {
      jest.clearAllMocks();
      Cookie.remove('atuserid');
      cookieSetterSpy = jest.spyOn(Cookie, 'set');
    });

    it('should return the AT user id', () => {
      Cookie.set('atuserid', '{ "val": "some-random-uuid" }', { secure: true });
      cookieSetterSpy.mockClear();
      const atUserId = getAtUserId();

      expect(atUserId).toEqual('some-random-uuid');
    });

    it('should store the existing AT user id as a stringified JSON value in cookies again so that we update the cookie expiration date', () => {
      Cookie.set('atuserid', '{ "val": "some-random-uuid" }', { secure: true });
      cookieSetterSpy.mockClear();
      const atUserId = getAtUserId();
      const [[cookieName, cookieValue, cookieOptions]] =
        cookieSetterSpy.mock.calls;

      expect(atUserId).toEqual('some-random-uuid');
      expect(cookieName).toEqual('atuserid');
      expect(JSON.parse(cookieValue)).toEqual({
        val: atUserId,
      });
      expect(cookieOptions).toEqual({ expires: 397, path: '/', secure: true });
      expect(cookieSetterSpy).toHaveBeenCalledTimes(1);
    });

    it('should create a new AT user id if the atuserid cookie does not already exist and then store the id as a stringified JSON value in the cookies', () => {
      const atUserId = getAtUserId();
      const [[cookieName, cookieValue, cookieOptions]] =
        cookieSetterSpy.mock.calls;

      expect(cookieName).toEqual('atuserid');
      expect(JSON.parse(cookieValue)).toEqual({
        val: atUserId,
      });
      expect(cookieOptions).toEqual({ expires: 397, path: '/', secure: true });
      expect(cookieSetterSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getThingAttributes', () => {
    const data = {
      metadata: {
        tags: {
          about: [{ thingId: 'foo bar' }, { thingId: 'baz' }],
        },
      },
    };

    it('should return thing names in good data', () => {
      const thingAttributes = getThingAttributes('thingId', data);

      expect(thingAttributes).toEqual('foo%20bar~baz');
    });

    it('should return null if type not found', () => {
      const thingAttributes = getThingAttributes('fooBar', data);

      expect(thingAttributes).toEqual(null);
    });

    it('should return null if invalid data', () => {
      const thingAttributes = getThingAttributes('fooBar', {});

      expect(thingAttributes).toEqual(null);
    });
  });

  describe('getCampaignType', () => {
    const windowLocation = window.location;

    afterEach(() => {
      resetWindowValue('location', windowLocation);
    });

    test.each`
      qsValue                   | expected
      ${'?at_medium=email'}     | ${'email'}
      ${'?at_medium=affiliate'} | ${'affiliate'}
      ${'?at_medium=custom123'} | ${'custom123'}
      ${'?at_medium=sl'}        | ${'sl'}
      ${'?at_medium=foo'}       | ${null}
      ${'?xtor=123'}            | ${'XTOR'}
      ${'?at_medium=RSS'}       | ${'RSS'}
    `('should return a campaign type of $expected', ({ qsValue, expected }) => {
      setWindowValue('location', {
        href: `https://www.bbc.com/mundo${qsValue}`,
      });

      const campaignType = getCampaignType();

      expect(campaignType).toEqual(expected);
    });

    it('should return campaign type of XTOR', () => {
      setWindowValue('location', {
        href: 'https://www.bbc.com/mundo#xtor',
      });

      const campaignType = getCampaignType();

      expect(campaignType).toEqual('XTOR');
    });
  });

  describe('getRSSMarketingString', () => {
    describe('"RSS" prefix', () => {
      it('returns "src_medium" when marketing string is present in url', () => {
        const href = 'https://www.bbc.com/mundo?at_medium=RSS';
        expect(getRSSMarketingString(href, 'RSS')).toEqual([SRC_RSS_FIXTURE]);
      });
      it('return empty array when campaign is not RSS', () => {
        const href = 'https://www.bbc.com/mundo?at_medium=affiliate';
        expect(getRSSMarketingString(href, 'affiliate')).toEqual([]);
      });

      it('return empty array when campaign is null', () => {
        const href = 'https://www.bbc.com/mundo?at_medium=affiliate';
        expect(getRSSMarketingString(href, null)).toEqual([]);
      });

      it('return empty array when campaign is undefined', () => {
        const href = 'https://www.bbc.com/mundo?at_medium=affiliate';
        expect(getRSSMarketingString(href, undefined)).toEqual([]);
      });

      describe('with optional params', () => {
        it.each`
          expectation                                     | href                                                              | expectedValue
          ${'omits value if prefix "at_" is not present'} | ${'https://www.bbc.com/mundo?at_medium=RSS&someKey=someValue'}    | ${[SRC_RSS_FIXTURE]}
          ${'the value of the "at_someKey" field'}        | ${'https://www.bbc.com/mundo?at_medium=RSS&at_someKey=someValue'} | ${[SRC_RSS_FIXTURE, { key: 'src_someKey', description: 'src_someKey field', value: 'someValue', wrap: false }]}
        `(
          'should return marketing string for $expectation',
          ({ href, expectedValue }) => {
            expect(getRSSMarketingString(href, 'RSS')).toEqual(expectedValue);
          },
        );
      });
    });
  });

  describe('getAffiliateMarketingString', () => {
    describe('should return the "al" prefix', () => {
      describe('with optional params', () => {
        it.each`
          expectation                                                             | href                                                                      | expectedValue
          ${'the value of the "at_campaign" field'}                               | ${'https://www.bbc.com/mundo?at_medium=affiliate&at_campaign=73'}         | ${'al-73-----'}
          ${'the value of the "at_type" field, wrapped in square brackets'}       | ${'https://www.bbc.com/mundo?at_medium=affiliate&at_type=partner'}        | ${'al--[partner]----'}
          ${'the value of the "at_identifier" field, wrapped in square brackets'} | ${'https://www.bbc.com/mundo?at_medium=affiliate&at_identifier=whatsapp'} | ${'al---[whatsapp]---'}
          ${'whe value of the "at_format" field, wrapped in square brackets'}     | ${'https://www.bbc.com/mundo?at_medium=affiliate&at_format=Link'}         | ${'al----[Link]--'}
          ${'the value of the "at_creation" field, wrapped in square brackets'}   | ${'https://www.bbc.com/mundo?at_medium=affiliate&at_creation=wsmundo'}    | ${'al-----[wsmundo]-'}
          ${'the value of the "at_variant" field, wrapped in square brackets'}    | ${'https://www.bbc.com/mundo?at_medium=affiliate&at_variant=Editorial'}   | ${'al------[Editorial]'}
        `(
          'should return marketing string for $expectation',
          ({ href, expectedValue }) => {
            expect(getAffiliateMarketingString(href)).toEqual(expectedValue);
          },
        );
      });
      describe('with all params', () => {
        it('should return all fields', () => {
          const href =
            'https://www.bbc.com/mundo?at_medium=affiliate&at_campaign=73&at_creation=wsmundo&at_format=Link&at_identifier=whatsapp&at_type=partner&at_variant=Editorial';
          const expected =
            'al-73-[partner]-[whatsapp]-[Link]-[wsmundo]-[Editorial]';

          expect(getAffiliateMarketingString(href)).toEqual(expected);
        });
      });
    });
  });

  describe('getSLMarketingString', () => {
    describe('should return the "SEC" prefix', () => {
      describe('with optional params', () => {
        it.each`
          expectation                                                                                       | href                                                               | expectedValue
          ${'the value of the "at_campaign" field'}                                                         | ${'https://www.bbc.com/mundo?at_medium=sl&at_campaign=73'}         | ${'SEC-73-----'}
          ${'with the value of the "at_platform" field, wrapped in square brackets'}                        | ${'https://www.bbc.com/mundo?at_medium=sl&at_platform=google'}     | ${'SEC--[google]----'}
          ${'the value of the "at_creation" field, wrapped in square brackets'}                             | ${'https://www.bbc.com/mundo?at_medium=sl&at_creation=my_adgroup'} | ${'SEC---[my_adgroup]---'}
          ${'the value of the "at_variant" field, wrapped in square brackets'}                              | ${'https://www.bbc.com/mundo?at_medium=sl&at_variant=Editorial'}   | ${'SEC----[Editorial]--'}
          ${'the value of the "at_network" field when "at_network" field is "search"'}                      | ${'https://www.bbc.com/mundo?at_medium=sl&at_network=search'}      | ${'SEC-----F=S-'}
          ${'the value of the "at_network" field when "at_network" field is "content"'}                     | ${'https://www.bbc.com/mundo?at_medium=sl&at_network=content'}     | ${'SEC-----F=C-'}
          ${'the value of the "at_network" field when "at_network" field is neither "content" or "search"'} | ${'https://www.bbc.com/mundo?at_medium=sl&at_network=foobar'}      | ${'SEC------'}
          ${'the value of the at_term field, wrapped in square brackets'}                                   | ${'https://www.bbc.com/mundo?at_medium=sl&at_term=article'}        | ${'SEC------[article]'}
        `(
          'should return marketing string for $expectation',
          ({ href, expectedValue }) => {
            expect(getSLMarketingString(href)).toEqual(expectedValue);
          },
        );
      });
      describe('with all params', () => {
        it('should return all fields', () => {
          const href =
            'https://www.bbc.com/mundo?at_medium=sl&at_term=article&at_network=search&at_creation=my_adgroup&at_variant=Editorial&at_platform=google&at_campaign=73';
          const expected =
            'SEC-73-[google]-[my_adgroup]-[Editorial]-F=S-[article]';

          expect(getSLMarketingString(href)).toEqual(expected);
        });
      });
    });
  });

  describe('getEmailMarketingString', () => {
    describe('should return the "SEC" prefix', () => {
      describe('with optional params', () => {
        it.each`
          expectation                                                                                                                         | href                                                                                                             | expectedValue
          ${'the value of "at_emailtype" field when its value is "acquisition"'}                                                              | ${'https://www.bbc.com/mundo?at_medium=email&at_emailtype=acquisition'}                                          | ${'EREC-----@'}
          ${'the value of "at_emailtype" field when its value is "retention"'}                                                                | ${'https://www.bbc.com/mundo?at_medium=email&at_emailtype=retention'}                                            | ${'EPR-----@'}
          ${'the value of "at_emailtype" field when its value is "promotion"'}                                                                | ${'https://www.bbc.com/mundo?at_medium=email&at_emailtype=promotion'}                                            | ${'ES-----@'}
          ${'the value of "at_emailtype" field when its value is neither "promotion", "acquisition" or "retention"'}                          | ${'https://www.bbc.com/mundo?at_medium=email&at_emailtype=foobar'}                                               | ${'-----@'}
          ${'the value of the "at_campaign" field'}                                                                                           | ${'https://www.bbc.com/mundo?at_medium=email&at_emailtype=promotion&at_campaign=56'}                             | ${'ES-56----@'}
          ${'the value of the "at_creation" field, wrapped in square brackets'}                                                               | ${'https://www.bbc.com/mundo?at_medium=email&at_emailtype=promotion&at_creation=wsmundo'}                        | ${'ES--[wsmundo]---@'}
          ${'the value of the at_send_date field'}                                                                                            | ${'https://www.bbc.com/mundo?at_medium=email&at_emailtype=promotion&at_send_date=20190401'}                      | ${'ES---20190401--@'}
          ${'the value of the at_link field, wrapped in square brackets'}                                                                     | ${'https://www.bbc.com/mundo?at_medium=email&at_emailtype=promotion&at_link=cta_button'}                         | ${'ES----[cta_button]-@'}
          ${'the value of the at_recipient_id field followed by the @ symbol and the value of the at_recipient_list field'}                   | ${'https://www.bbc.com/mundo?at_medium=email&at_emailtype=promotion&at_recipient_id=5633&at_recipient_list=200'} | ${'ES-----5633@200'}
          ${'the value of the at_recipient_id field followed by the @ symbol when the value of the at_recipient_list field is not available'} | ${'https://www.bbc.com/mundo?at_medium=email&at_emailtype=promotion&at_recipient_id=5633'}                       | ${'ES-----5633@'}
          ${'the @ symbol followed by the value of the at_recipient_list field when the value of the at_recipient_id field is not available'} | ${'https://www.bbc.com/mundo?at_medium=email&at_emailtype=promotion&at_recipient_list=200'}                      | ${'ES-----@200'}
        `('should return $expectation', ({ href, expectedValue }) => {
          expect(getEmailMarketingString(href)).toEqual(expectedValue);
        });
      });
      describe('with all params', () => {
        it('should return all fields', () => {
          const href =
            'https://www.bbc.com/mundo?at_medium=email&at_emailtype=promotion&at_campaign=56&at_creation=wsmundo&at_send_date=20190401&at_link=cta_button&at_recipient_id=5633&at_recipient_list=200';
          const expected = 'ES-56-[wsmundo]-20190401-[cta_button]-5633@200';

          expect(getEmailMarketingString(href)).toEqual(expected);
        });
      });
    });
  });

  describe('getDisplayMarketingString', () => {
    describe('should return the "AD" prefix', () => {
      describe('with optional params', () => {
        it.each`
          expectation                                                                    | href                                                                           | expectedValue
          ${'the value of the "at_campaign" field'}                                      | ${'https://www.bbc.com/mundo?at_medium=display&at_campaign=56'}                | ${'AD-56------'}
          ${'the value of the "at_creation" field, wrapped in square brackets'}          | ${'https://www.bbc.com/mundo?at_medium=display&at_creation=wsmundo'}           | ${'AD--[wsmundo]-----'}
          ${'the value of the "at_variant" field, wrapped in square brackets'}           | ${'https://www.bbc.com/mundo?at_medium=custom123&at_variant=Editorial'}        | ${'AD---[Editorial]----'}
          ${'the value of the "at_format" field, wrapped in square brackets'}            | ${'https://www.bbc.com/mundo?at_medium=custom123&at_format=Link'}              | ${'AD----[Link]---'}
          ${'the value of the "at_general_placement" field, wrapped in square brackets'} | ${'https://www.bbc.com/mundo?at_medium=custom123&at_general_placement=home'}   | ${'AD------[home]-'}
          ${'the value of the "at_detail_placement" field, wrapped in square brackets'}  | ${'https://www.bbc.com/mundo?at_medium=custom123&at_detail_placement=sidebar'} | ${'AD-------[sidebar]'}
        `(
          'should return marketing string for $expectation',
          ({ href, expectedValue }) => {
            expect(getDisplayMarketingString(href)).toEqual(expectedValue);
          },
        );
      });
      describe('with all params', () => {
        it('should return all fields', () => {
          const href =
            'https://www.bbc.com/mundo?at_medium=display&at_campaign=56&at_creation=wsmundo&at_variant=Editorial&at_format=Link&at_general_placement=home&at_detail_placement=sidebar';
          const expected =
            'AD-56-[wsmundo]-[Editorial]-[Link]--[home]-[sidebar]';

          expect(getDisplayMarketingString(href)).toEqual(expected);
        });
      });
    });
  });

  describe('getCustomMarketingString', () => {
    describe('should return the "CS" prefix followed by the part of the at_medium field following the word custom', () => {
      describe('with optional params', () => {
        it.each`
          expectation                                                          | href                                                                | expectedValue
          ${'the value of the "at_campaign" field'}                            | ${'https://www.bbc.com/mundo?at_medium=custom123&at_campaign=56'}   | ${'CS123-56----'}
          ${'the value of the "at_custom1" field, wrapped in square brackets'} | ${'https://www.bbc.com/mundo?at_medium=custom123&at_custom1=var_1'} | ${'CS123--[var_1]---'}
          ${'the value of the "at_custom2" field, wrapped in square brackets'} | ${'https://www.bbc.com/mundo?at_medium=custom123&at_custom2=var_2'} | ${'CS123---[var_2]--'}
          ${'the value of the "at_custom3" field, wrapped in square brackets'} | ${'https://www.bbc.com/mundo?at_medium=custom123&at_custom3=var_3'} | ${'CS123----[var_3]-'}
          ${'the value of the "at_custom4" field, wrapped in square brackets'} | ${'https://www.bbc.com/mundo?at_medium=custom123&at_custom4=var_4'} | ${'CS123-----[var_4]'}
        `(
          'should return marketing string for $expectation',
          ({ href, expectedValue }) => {
            expect(getCustomMarketingString(href)).toEqual(expectedValue);
          },
        );
      });
      describe('with all params', () => {
        it('should return all fields', () => {
          const href =
            'https://www.bbc.com/mundo?at_medium=custom123&at_campaign=56&at_custom1=var_1&at_custom2=var_2&at_custom3=var_3&at_custom4=var_4';
          const expected = 'CS123-56-[var_1]-[var_2]-[var_3]-[var_4]';

          expect(getCustomMarketingString(href)).toEqual(expected);
        });
      });
    });
  });

  describe('getXtorMarketingString', () => {
    it.each`
      expectation                                                                           | href                                                          | expectedValue
      ${'the value of the "xtor" field when it is a hash param from an anchor'}             | ${'https://www.bbc.com/mundo/#at_medium=sl&xtor=AD-3030'}     | ${'AD-3030'}
      ${'the value of the xtor field when xtor is a query param and there is a hash param'} | ${'https://www.bbc.com/mundo?xtor=AD-3030#at_medium=AD-3040'} | ${'AD-3030'}
      ${'the value of the xtor field when it is a query param'}                             | ${'https://www.bbc.com/mundo?xtor=AD-3030'}                   | ${'AD-3030'}
      ${'null when xtor param is not available'}                                            | ${'https://www.bbc.com/mundo#at_medium'}                      | ${null}
    `('should return $expectation', ({ href, expectedValue }) => {
      expect(getXtorMarketingString(href)).toEqual(expectedValue);
    });
  });

  describe('getATIMarketingString', () => {
    describe('for query params', () => {
      it.each`
        campaignType          | href                                                                                                                                                                                         | expectedValue
        ${'affiliate'}        | ${'https://www.bbc.com/mundo?at_medium=affiliate&at_campaign=73&at_creation=wsmundo&at_format=Link&at_identifier=whatsapp&at_type=partner&at_variant=Editorial'}                             | ${'al-73-[partner]-[whatsapp]-[Link]-[wsmundo]-[Editorial]'}
        ${'sl'}               | ${'https://www.bbc.com/mundo?at_medium=sl&at_term=article&at_network=search&at_creation=my_adgroup&at_variant=Editorial&at_platform=google&at_campaign=73'}                                  | ${'SEC-73-[google]-[my_adgroup]-[Editorial]-F=S-[article]'}
        ${'email'}            | ${'https://www.bbc.com/mundo?at_medium=email&at_emailtype=promotion&at_campaign=56&at_creation=wsmundo&at_send_date=20190401&at_link=cta_button&at_recipient_id=5633&at_recipient_list=200'} | ${'ES-56-[wsmundo]-20190401-[cta_button]-5633@200'}
        ${'display'}          | ${'https://www.bbc.com/mundo?at_medium=display&at_campaign=56&at_creation=wsmundo&at_variant=Editorial&at_format=Link&at_general_placement=home&at_detail_placement=sidebar'}                | ${'AD-56-[wsmundo]-[Editorial]-[Link]--[home]-[sidebar]'}
        ${'custom'}           | ${'https://www.bbc.com/mundo?at_medium=custom123&at_campaign=56&at_custom1=var_1&at_custom2=var_2&at_custom3=var_3&at_custom4=var_4'}                                                        | ${'CS123-56-[var_1]-[var_2]-[var_3]-[var_4]'}
        ${'XTOR'}             | ${'https://www.bbc.com/mundo?xtor=AD-3030-[ad_version7]-[without_text]-[468]-[www.bbc.com]-[GT]-[top_page]'}                                                                                 | ${'AD-3030-[ad_version7]-[without_text]-[468]-[www.bbc.com]-[GT]-[top_page]'}
        ${'unsupported-type'} | ${'https://www.bbc.com/mundo?at_medium=foo'}                                                                                                                                                 | ${null}
        ${null}               | ${null}                                                                                                                                                                                      | ${null}
        ${'XTOR'}             | ${null}                                                                                                                                                                                      | ${null}
      `(
        'should return $expectedValue for campaign type of $campaignType when href is $href',
        ({ href, expectedValue, campaignType }) => {
          expect(getATIMarketingString(href, campaignType)).toEqual(
            expectedValue,
          );
        },
      );
    });
    describe('for hash params params', () => {
      it.each`
        campaignType          | href                                                                                                                                                                                          | expectedValue
        ${'affiliate'}        | ${'https://www.bbc.com/mundo#at_medium=affiliate&at_campaign=73&at_creation=wsmundo&at_format=Link&at_identifier=whatsapp&at_type=partner&at_variant=Editorial'}                              | ${'al-73-[partner]-[whatsapp]-[Link]-[wsmundo]-[Editorial]'}
        ${'sl'}               | ${'https://www.bbc.com/mundo#at_medium=sl&at_term=article&at_network=search&at_creation=my_adgroup&at_variant=Editorial&at_platform=google&at_campaign=73'}                                   | ${'SEC-73-[google]-[my_adgroup]-[Editorial]-F=S-[article]'}
        ${'email'}            | ${'https://www.bbc.com/mundo/#at_medium=email&at_emailtype=promotion&at_campaign=56&at_creation=wsmundo&at_send_date=20190401&at_link=cta_button&at_recipient_id=5633&at_recipient_list=200'} | ${'ES-56-[wsmundo]-20190401-[cta_button]-5633@200'}
        ${'display'}          | ${'https://www.bbc.com/mundo#at_medium=display&at_campaign=56&at_creation=wsmundo&at_variant=Editorial&at_format=Link&at_general_placement=home&at_detail_placement=sidebar'}                 | ${'AD-56-[wsmundo]-[Editorial]-[Link]--[home]-[sidebar]'}
        ${'custom'}           | ${'https://www.bbc.com/mundo/#at_medium=custom123&at_campaign=56&at_custom1=var_1&at_custom2=var_2&at_custom3=var_3&at_custom4=var_4'}                                                        | ${'CS123-56-[var_1]-[var_2]-[var_3]-[var_4]'}
        ${'XTOR'}             | ${'https://www.bbc.com/mundo#xtor=AD-3030-[ad_version7]-[without_text]-[468]-[www.bbc.com]-[GT]-[top_page]'}                                                                                  | ${'AD-3030-[ad_version7]-[without_text]-[468]-[www.bbc.com]-[GT]-[top_page]'}
        ${'unsupported-type'} | ${'https://www.bbc.com/mundo/#at_medium=foo'}                                                                                                                                                 | ${null}
        ${null}               | ${null}                                                                                                                                                                                       | ${null}
        ${'XTOR'}             | ${null}                                                                                                                                                                                       | ${null}
      `(
        'should return $expectedValue for campaign type of $campaignType when href is $href',
        ({ href, expectedValue, campaignType }) => {
          expect(getATIMarketingString(href, campaignType)).toEqual(
            expectedValue,
          );
        },
      );
    });

    describe('onOnionTld', () => {
      const { location } = window;

      beforeEach(() => {
        delete window.location;
      });
      afterEach(() => {
        window.location = location;
      });

      it.each`
        expectation               | currentUrl                                                                                            | expectedValue
        ${'true for onion TLD'}   | ${'https://www.bbcnewsd73hkzno2ini43t4gblxvycyac5aw4gnv7t2rccijh7745uqd.onion/news'}                  | ${true}
        ${'true for onion TLD'}   | ${'https://www.bbcweb3hytmzhn5d532owbu6oqadra5z3ar726vq5kgwwn6aucdccrad.onion/russian'}               | ${true}
        ${'true for onion TLD'}   | ${'https://www.bbcweb3hytmzhn5d532owbu6oqadra5z3ar726vq5kgwwn6aucdccrad.onion/russian/news-60699063'} | ${true}
        ${'false for .co.uk TLD'} | ${'https://www.bbc.co.uk/news'}                                                                       | ${false}
        ${'false for .com TLD'}   | ${'https://www.bbc.com/news'}                                                                         | ${false}
        ${'false for .com TLD'}   | ${'https://www.bbcrussian.com/russian/live/news-60661774'}                                            | ${false}
      `('should return $expectation', ({ currentUrl, expectedValue }) => {
        window.location = new URL(currentUrl);

        expect(onOnionTld()).toEqual(expectedValue);
      });
    });
  });
});
