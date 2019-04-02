import * as genericLabelHelpers from '../labelHelpers';
import * as articleLabelHelpers from '../labelHelpers/article';

const mockAndSet = ({ name, source }, response) => {
  source[name] = jest.fn(); // eslint-disable-line no-param-reassign
  source[name].mockImplementation(() => response);
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
  { name: 'getDestination', source: genericLabelHelpers },
  { name: 'getScreenInfo', source: genericLabelHelpers },
  { name: 'getBrowserViewPort', source: genericLabelHelpers },
  { name: 'getCurrentTime', source: genericLabelHelpers },
  { name: 'getDeviceLanguage', source: genericLabelHelpers },
  { name: 'getAppType', source: genericLabelHelpers },
  { name: 'getLocServeCookie', source: genericLabelHelpers },
  { name: 'getPageIdentifier', source: articleLabelHelpers },
  { name: 'getOptimoUrn', source: articleLabelHelpers },
  { name: 'getLanguage', source: articleLabelHelpers },
  { name: 'getPromoHeadline', source: articleLabelHelpers },
  { name: 'getPublishedTime', source: articleLabelHelpers },
  { name: 'getThingAttributes', source: articleLabelHelpers },
];

describe('getThingAttributes', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should create url with all required information', () => {
    functions.forEach(func => {
      mockAndSet(func, func.name);
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
