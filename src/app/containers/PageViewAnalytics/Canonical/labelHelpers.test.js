import Cookie from 'js-cookie';
import onClient from '../../../helpers/onClient';
import {
  setWindowValue,
  resetWindowValue,
} from '../../../helpers/tests/setWindowValue';

let isOnClient = true;

jest.mock('../../../helpers/onClient', () => jest.fn());
onClient.mockImplementation(() => isOnClient);

const {
  getDestination,
  getPageIdentifier,
  getScreenInfo,
  getBrowserViewPort,
  getCurrentTime,
  getDeviceLanguage,
  getOptimoUrn,
  getAppType,
  getLanguage,
  getPromoHeadline,
  getPublishedTime,
  getThingAttributes,
} = require('./labelHelpers');

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
  const stuff = [
    {
      isUK: true,
      env: 'live',
      expected: 598285,
      summary: 'should return for live uk',
    },
    {
      isUK: false,
      env: 'live',
      expected: 598287,
      summary: 'should return for live international',
    },
    {
      isUK: true,
      env: 'test',
      expected: 598286,
      summary: 'should return for test uk',
    },
    {
      isUK: false,
      env: 'test',
      expected: 598288,
      summary: 'should return for test international',
    },
    {
      isUK: true,
      env: 'foobar',
      expected: 598286,
      summary: 'should return for test uk when env unknown',
    },
    {
      isUK: true,
      env: null,
      expected: 598285,
      summary: 'should return for test uk when env null',
    },
    {
      isUK: true,
      env: undefined,
      expected: 598285,
      summary: 'should return for test uk when env undefined',
    },
    {
      isUK: null,
      env: 'live',
      expected: 598285,
      summary: 'should return for live uk when isUK is null',
    },
    {
      isUK: undefined,
      env: 'live',
      expected: 598285,
      summary: 'should return for live uk when isUK is undefined',
    },
  ];

  stuff.forEach(({ isUK, env, expected, summary }) => {
    it(summary, () => {
      const destination = getDestination(isUK, env);
      expect(destination).toEqual(expected);
    });
  });
});

describe('getOptimoUrn', () => {
  it('should find value in good data', () => {
    const goodData = {
      metadata: {
        locators: {
          optimoUrn: 'desired value',
        },
      },
    };

    const optimoUrn = getOptimoUrn(goodData);

    expect(optimoUrn).toEqual('desired value');
  });

  it('should return null in bad data', () => {
    const badData = {
      metadata: {
        locators: {
          unknownUrn: 'missed value',
        },
      },
    };

    const optimoUrn = getOptimoUrn(badData);

    expect(optimoUrn).toEqual(null);
  });
});

describe('getPageIdentifier', () => {
  const goodData = {
    metadata: {
      locators: {
        optimoUrn: 'prefix:desiredValue',
      },
    },
  };

  const badData = {
    metadata: {
      locators: {
        unknownUrn: 'prefix:missedValue',
      },
    },
  };

  it('should construct page identifier', () => {
    const optimoUrn = getPageIdentifier('service', goodData);

    expect(optimoUrn).toEqual('health::service.articles.desiredValue.page');
  });

  it('should use "unknown" if optimo id is unknown', () => {
    const optimoUrn = getPageIdentifier('service', badData);

    expect(optimoUrn).toEqual('health::service.articles.unknown.page');
  });

  it('should use null if service is null', () => {
    const optimoUrn = getPageIdentifier(null, goodData);

    expect(optimoUrn).toEqual('health::news.articles.desiredValue.page');
  });
});

describe('getAppType', () => {
  const stuff = [
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

  stuff.forEach(({ platform, expected, summary }) => {
    it(summary, () => {
      const appType = getAppType(platform);
      expect(appType).toEqual(expected);
    });
  });
});

describe('getLanguage', () => {
  it('should find value in good data', () => {
    const goodData = {
      metadata: {
        passport: {
          language: 'desired value',
        },
      },
    };

    const language = getLanguage(goodData);

    expect(language).toEqual('desired value');
  });

  it('should return null in bad data', () => {
    const badData = {
      metadata: {
        passport: {
          unknown: 'missed value',
        },
      },
    };

    const language = getLanguage(badData);

    expect(language).toEqual(null);
  });
});

describe('getPromoHeadline', () => {
  it('should find value in good data', () => {
    const goodData = {
      promo: {
        headlines: {
          seoHeadline: 'desired value',
        },
      },
    };

    const promoHeadline = getPromoHeadline(goodData);

    expect(promoHeadline).toEqual('desired value');
  });

  it('should return null in bad data', () => {
    const badData = {
      promo: {
        headlines: {
          unknown: 'missed value',
        },
      },
    };

    const promoHeadline = getPromoHeadline(badData);

    expect(promoHeadline).toEqual(null);
  });
});

describe('getPublishedTime', () => {
  const data = {
    metadata: {
      firstPublished: 946688461000,
      invalidDate: 'foobar',
    },
  };

  it('should find value in good data', () => {
    const publishedTime = getPublishedTime('firstPublished', data);

    expect(publishedTime).toEqual('2000-01-01T01:01:01.000Z');
  });

  it('should return null if type not found', () => {
    const publishedTime = getPublishedTime('foobar', data);

    expect(publishedTime).toEqual(null);
  });

  it('should return null if timestamp is invalid', () => {
    const publishedTime = getPublishedTime('invalidDate', data);

    expect(publishedTime).toEqual(null);
  });
});

describe('getThingAttributes', () => {
  const data = {
    metadata: {
      tags: {
        about: [{ thingId: 'foo' }, { thingId: 'bar' }],
      },
    },
  };

  it('should find value in good data', () => {
    const thingAttributes = getThingAttributes('thingId', data);

    expect(thingAttributes).toEqual('foo~bar');
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
  const windowDate = window.Date;

  afterEach(() => {
    resetWindowValue('Date', windowDate);
  });

  returnsNullWhenOffClient(getCurrentTime);

  it('should return hours, mins and seconds joined by "x"', () => {
    const date = new Date(946729425000); // 12:23:45
    setWindowValue('Date', () => date);

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

describe('getLocServeCookie', () => {
  beforeEach(() => {
    jest.mock('js-cookie', () => jest.fn());
    Cookie.get = jest.fn();
    Cookie.get.mockImplementation(() => locServeCookieValue);
  });

  // eslint-disable-next-line global-require
  returnsNullWhenOffClient(require('./labelHelpers').getLocServeCookie);

  it('should return the cookie value', () => {
    const { getLocServeCookie } = require('./labelHelpers'); // eslint-disable-line global-require

    locServeCookieValue = 'value';

    const locServeCookie = getLocServeCookie();

    expect(locServeCookie).toEqual('value');
  });
});
