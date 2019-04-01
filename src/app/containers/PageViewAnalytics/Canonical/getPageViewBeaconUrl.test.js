import * as labelHelpers from './labelHelpers';

const mockAndSet = (func, response) => {
  labelHelpers[func] = jest.fn();
  labelHelpers[func].mockImplementation(() => response);
};

const getAtiUrl = obj => require('./getPageViewBeaconUrl').default(obj); // eslint-disable-line global-require

const splitUrl = url =>
  url
    .split('?')
    .join(',')
    .split('&')
    .join(',')
    .split(',');

const functions = [
  'getDestination',
  'getPageIdentifier',
  'getScreenInfo',
  'getBrowserViewPort',
  'getCurrentTime',
  'getDeviceLanguage',
  'getOptimoUrn',
  'getAppType',
  'getLanguage',
  'getPromoHeadline',
  'getPublishedTime',
  'getThingAttributes',
  'getLocServeCookie',
];

describe('getThingAttributes', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should create url with all required information', () => {
    functions.forEach(func => {
      mockAndSet(func, func);
    });

    const url = getAtiUrl({
      articleData: 'articleData',
      service: 'service',
      platform: 'platform',
      isUK: 'isUk',
      env: 'env',
      href: 'href',
      referrer: 'referer',
    });

    const urlArray = splitUrl(url);

    const expectedValues = [
      'https://a1.api.bbc.co.uk/hit.xiti',
      's=getDestination',
      's2=64',
      'p=getPageIdentifier',
      'r=getScreenInfo',
      're=getBrowserViewPort',
      'hl=getCurrentTime',
      'lng=getDeviceLanguage',
      'x1=[getOptimoUrn]',
      'x7=[article]',
      'x2=[getAppType]',
      'x3=[service]',
      'x4=[getLanguage]',
      'x5=[href]',
      'x6=[referer]',
      'x9=[getPromoHeadline]',
      'x11=[getPublishedTime]',
      'x12=[getPublishedTime]',
      'x13=[getThingAttributes]',
      'x14=[getThingAttributes]',
      'x18=[getLocServeCookie]',
    ];

    expectedValues.forEach(value => expect(urlArray).toContain(value));

    expect(urlArray).toHaveLength(expectedValues.length);
  });

  it('should not add empty or null values', () => {
    functions.forEach(func => {
      mockAndSet(func, null);
    });

    const url = getAtiUrl({});

    const urlArray = splitUrl(url);

    const expectedValues = [
      'https://a1.api.bbc.co.uk/hit.xiti',
      's2=64',
      'x7=[article]',
    ];

    expectedValues.forEach(value => expect(urlArray).toContain(value));

    expect(urlArray).toHaveLength(expectedValues.length);
  });
});
