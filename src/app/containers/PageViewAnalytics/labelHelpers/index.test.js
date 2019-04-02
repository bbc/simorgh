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
  getScreenInfo,
  getBrowserViewPort,
  getCurrentTime,
  getDeviceLanguage,
  getAppType,
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
  returnsNullWhenOffClient(require('./index').getLocServeCookie);

  it('should return the cookie value', () => {
    const { getLocServeCookie } = require('./index'); // eslint-disable-line global-require

    locServeCookieValue = 'value';

    const locServeCookie = getLocServeCookie();

    expect(locServeCookie).toEqual('value');
  });
});
