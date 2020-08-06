import Cookie from 'js-cookie';
import { setWindowValue, resetWindowValue } from '@bbc/psammead-test-helpers';
import onClient from '../utilities/onClient';

let isOnClient = true;

jest.mock('../utilities/onClient', () => jest.fn());
onClient.mockImplementation(() => isOnClient);

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
  getProducer,
  getAtiUrl,
  getEventInfo,
  getComponentInfo,
  getThingAttributes,
<<<<<<< HEAD
  getXtorMarketingString,
=======
  getCampaignType,
>>>>>>> 5b2c6bf609d59b4480ca8f4b8cf7a918351e825d
} = require('./index');

let locServeCookieValue;

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

describe('getDestination', () => {
  const getDestinationTestScenarios = [
    {
      statsDestination: 'NEWS_PS',
      expected: 598285,
      summary: 'should return for live uk for News',
    },
    {
      statsDestination: 'NEWS_GNL',
      expected: 598287,
      summary: 'should return for live international for News',
    },
    {
      statsDestination: 'NEWS_PS_TEST',
      expected: 598286,
      summary: 'should return for test uk for News',
    },
    {
      statsDestination: 'NEWS_GNL_TEST',
      expected: 598288,
      summary: 'should return for test international for News',
    },
    {
      statsDestination: 'WS_NEWS_LANGUAGES',
      expected: 598342,
      summary: 'should return for live WS',
    },
    {
      statsDestination: 'WS_NEWS_LANGUAGES_TEST',
      expected: 598343,
      summary: 'should return for test WS',
    },
    {
      statsDestination: 'PS_HOMEPAGE',
      expected: 598273,
      summary: 'should return for live Scotland',
    },
    {
      statsDestination: 'PS_HOMEPAGE_TEST',
      expected: 598274,
      summary: 'should return for test Scotland',
    },
    {
      statsDestination: 'BBC_ARCHIVE_PS',
      expected: 605565,
      summary: 'should return for live Scotland',
    },
    {
      statsDestination: 'BBC_ARCHIVE_PS_TEST',
      expected: 605566,
      summary: 'should return for test Scotland',
    },
    {
      statsDestination: undefined,
      expected: 598285,
      summary: 'should return for live uk statsDestination is undefined',
    },
    {
      statsDestination: null,
      expected: 598285,
      summary: 'should return for live uk statsDestination is null',
    },
  ];

  getDestinationTestScenarios.forEach(
    ({ statsDestination, expected, summary }) => {
      it(summary, () => {
        const destination = getDestination(statsDestination);
        expect(destination).toEqual(expected);
      });
    },
  );
});

describe('getAppType', () => {
  const getAppTypeScenarios = [
    {
      platform: 'amp',
      expected: 'amp',
      summary: 'should return amp for amp',
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
    jest.mock('js-cookie', () => jest.fn());
    Cookie.get = jest.fn();
    Cookie.get.mockImplementation(() => locServeCookieValue);
  });

  // eslint-disable-next-line global-require
  returnsNullWhenOffClient(require('./index').isLocServeCookieSet);

  it('should return true if cookie is set', () => {
    const { isLocServeCookieSet } = require('./index'); // eslint-disable-line global-require

    locServeCookieValue = 'value';

    const locServeCookie = isLocServeCookieSet();

    expect(locServeCookie).toEqual(true);
  });

  it('should return false if cookie is not set', () => {
    const { isLocServeCookieSet } = require('./index'); // eslint-disable-line global-require

    locServeCookieValue = null;

    const locServeCookie = isLocServeCookieSet();

    expect(locServeCookie).toEqual(false);
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

    expect(href).toEqual('https%3A%2F%2Fhref.com');
  });

  it('should return null if href isnt set', () => {
    setWindowValue('location', {
      href: null,
    });

    const href = getHref();

    expect(href).toEqual(null);
  });

  it('should return href with anchor text - encoding the hash', () => {
    setWindowValue('location', {
      href: 'https://www.example.com/#anchortext',
    });
    const href = getHref();
    expect(href).toEqual('https%3A%2F%2Fwww.example.com%2F%23anchortext');
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

    expect(referrer).toEqual('https%3A%2F%2Freferrer.com');
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
    expect(sanitise('hi hello there')).toEqual('hi+hello+there');
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

describe('getProducer', () => {
  it('should return a number', () => {
    expect(typeof Number(getProducer('news'))).toEqual('number');
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
    service: 'service',
    componentName: 'component',
    componentInfo: {
      actionLabel: 'actionLabel',
      result: 'url.com',
      positioning: {
        parent: 'container-component',
        child: 'child',
      },
    },
    type: 'type',
  };
  const pageIdentifier = 'page';

  it('should return url section', () => {
    expect(getEventInfo(pageIdentifier, params)).toEqual(
      'PUB-[service-component]-[actionLabel~type]-[]-[PAR=container-component~CHD=child]-[page]-[]-[responsive_web~news-simorgh]-[url.com]',
    );
  });

  it('should include elem.href in output', () => {
    expect(getEventInfo(pageIdentifier, params)).toContain('[url.com]');
  });
});

describe('getComponentInfo', () => {
  const event = { target: { href: 'url.com' } };
  const props = { actionLabel: 'prop1', child: 'prop2' };

  it('should return a componentInfo object', () => {
    const result = {
      actionLabel: 'component-prop1',
      source: '',
      result: 'url.com',
      positioning: {
        parent: 'container-component',
        child: 'prop2',
      },
    };

    expect(
      getComponentInfo({
        result: event.target.href,
        componentName: 'component',
        componentData: props,
      }),
    ).toEqual(result);
  });

  it('should return an object with adId if value included in props', () => {
    props.source = 'source';

    const result = {
      actionLabel: 'component-prop1',
      source: 'source',
      result: 'url.com',
      positioning: {
        parent: 'container-component',
        child: 'prop2',
      },
    };

    expect(
      getComponentInfo({
        result: event.target.href,
        componentName: 'component',
        componentData: props,
      }),
    ).toEqual(result);
  });
});

describe('getAtUserId', () => {
  returnsNullWhenOffClient(getAtUserId);

  it('should return AT user id when found', () => {
    Cookie.getJSON = jest.fn().mockReturnValue({ val: 'uuid' });

    const id = getAtUserId();
    expect(id).toEqual('uuid');
  });

  it('should create new user id if cookie does not exist', () => {
    Cookie.set = jest.fn();
    Cookie.getJSON = jest.fn().mockReturnValue(null);
    const val = '00000000-1111-aaaa-bbbb-1234567890ab';

    let id = getAtUserId();
    expect(id).not.toBeNull();
    expect(id).not.toBe(val);
    expect(id).toHaveLength(val.length);
    expect(Cookie.set).toHaveBeenCalledWith(
      'atuserid',
      { val: id },
      { expires: 397, path: '/' },
    );

    Cookie.getJSON = jest.fn().mockReturnValue({ val });
    id = getAtUserId();
    expect(id).toBe(val);
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

    expect(thingAttributes).toEqual('foo+bar~baz');
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
    ${'?at_medium=foo'}       | ${null}
    ${'?xtor=123'}            | ${'XTOR'}
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

describe('getAffiliateMarketingString', () => {
  describe('should return the "al" prefix', () => {
    it('with the value of the at_campaign field', () => {});
    it('with the value of the at_type field, wrapped in square brackets', () => {});
    it('with the value of the at_identifier field, wrapped in square brackets', () => {});
    it('with the value of the at_format field, wrapped in square brackets', () => {});
    it('with the value of the at_creation field, wrapped in square brackets', () => {});
    it('with the value of the at_creation field, wrapped in square brackets', () => {});
  });
});

describe('getSLMarketingString', () => {
  describe('should return the "SEC" prefix', () => {
    it('with the value of the at_campaign field', () => {});
    it('with the value of the at_platform field, wrapped in square brackets', () => {});
    it('with the value of the at_creation field, wrapped in square brackets', () => {});
    it('with the value of the at_variant field, wrapped in square brackets', () => {});
    describe('with the value of the at_network field', () => {
      it('when at_network field is "search"', () => {});
      it('when at_network field is "content"', () => {});
    });
    it('the value of the at_term field, wrapped in square brackets', () => {});
  });
});

describe('getEmailMarketingString', () => {
  describe('should return the at_emailtype field', () => {
    it('when the value is "acquisition"', () => {});
    it('when the value is "retention"', () => {});
    it('when the value is "promotion"', () => {});
    it('with the value of the at_campaign field', () => {});
    it('with the value of the at_creation field, wrapped in square brackets', () => {});
    it('with the value of the at_send_date field', () => {});
    it('with the value of the at_link field, wrapped in square brackets', () => {});
    it('with the value of the at_recipient_id field followed by the @ symbol and the value of the at_recipient_list field', () => {});
  });
});

describe('getDisplayMarketingString', () => {
  describe('should return the "AD" prefix', () => {
    it('with the value of the at_campaign field', () => {});
    it('with the value of the at_creation field, wrapped in square brackets', () => {});
    it('with the value of the at_variant field, wrapped in square brackets', () => {});
    it('with the value of the at_format field, wrapped in square brackets', () => {});
    it('with the value of the at_general_placement field, wrapped in square brackets', () => {});
    it('with the value of the at_detail_placement field, wrapped in square brackets', () => {});
  });
});

describe('getCustomMarketingString', () => {
  describe('should return the "CS" prefix followed by the part of the at_medium field following the word custom', () => {
    it('with the value of the at_campaign field', () => {});
    it('with the value of the at_custom_1 field, wrapped in square brackets', () => {});
    it('with the value of the at_custom_2 field, wrapped in square brackets', () => {});
    it('with the value of the at_custom_3 field, wrapped in square brackets', () => {});
    it('with the value of the at_custom_4 field, wrapped in square brackets', () => {});
  });
});

describe('getXtorMarketingString', () => {
  it.only('should return the value of the xtor field when it is a hash param', () => {
    expect(
      getXtorMarketingString(
        'https://www.bbc.com/mundo/#at_medium=sl&xtor=AD-3030',
      ),
    ).toEqual('AD-3030');

    expect(
      getXtorMarketingString('https://www.bbc.com/mundo/#xtor=AD-3030'),
    ).toEqual('AD-3030');
  });
  it.only('should return the value of the xtor field when it is a query param', () => {
    expect(
      getXtorMarketingString('https://www.bbc.com/mundo?xtor=AD-3030'),
    ).toEqual('AD-3030');
  });

  it.only('should return null when xtor query is not available', () => {
    expect(getXtorMarketingString('https://www.bbc.com/mundo#')).toEqual(null);
    expect(
      getXtorMarketingString('https://www.bbc.com/mundo#at_medium'),
    ).toEqual(null);
  });
});

describe('getATIMarketingString', () => {
  describe('should construct ATI marketing string', () => {
    it('for campaign type of "affiliate"', () => {});
    it('for campaign type of "sl"', () => {});
    it('for campaign type of "email"', () => {});
    it('for campaign type of "display"', () => {});
    it('for campaign type of "custom"', () => {});
    it('for campaign type of "xtor"', () => {});
  });
  describe('should return null', () => {
    it('for an unsupported campaign type', () => {});
  });
});
