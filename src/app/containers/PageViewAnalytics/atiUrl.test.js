import * as genericLabelHelpers from '../../lib/analyticsUtils';
import * as articleLabelHelpers from '../../lib/analyticsUtils/article';

const { atiBaseUrl, atiPageViewParams } = require('./atiUrl');

describe('ATI Base Url', () => {
  it('should be defined', () => {
    expect(atiBaseUrl).toBe('https://a1.api.bbc.co.uk/hit.xiti?');
  });
});

describe('ATI PageViewParams', () => {
  it('should add query params for amp article page type', () => {
    expect(
      atiPageViewParams({
        platform: 'amp',
        service: 'news',
        statsDestination: 'NEWS_PS_TEST',
      }),
    ).toBe(
      's=598286&s2=64&r=${screenWidth}x${screenHeight}x${screenColorDepth}&re=${availableScreenWidth}x${availableScreenHeight}&hl=${timestamp}&lng=${browserLanguage}&x2=[amp]&x3=[news]&x5=[${sourceUrl}]&x6=[${documentReferrer}]', // eslint-disable-line no-template-curly-in-string
    );
  });
});

const mockAndSet = ({ name, source }, response) => {
  source[name] = jest.fn(); // eslint-disable-line no-param-reassign
  source[name].mockImplementation(() => response);
};

const splitUrl = url =>
  url
    .split('?')
    .join(',')
    .split('&')
    .join(',')
    .split(',');

const functions = [
  { name: 'getDestinationCode', source: genericLabelHelpers },
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
  { name: 'getPublishedDatetime', source: articleLabelHelpers },
  { name: 'getThingAttributes', source: articleLabelHelpers },
];

xdescribe('getThingAttributes', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should create url with all required information', () => {
    functions.forEach(func => {
      mockAndSet(func, func.name);
    });

    const url = atiPageViewParams({
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
      's=getDestinationCode',
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
      'x11=[getPublishedDatetime]',
      'x12=[getPublishedDatetime]',
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

    const url = atiPageViewParams({});

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
