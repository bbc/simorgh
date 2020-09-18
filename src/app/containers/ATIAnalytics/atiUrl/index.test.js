import * as genericLabelHelpers from '#lib/analyticsUtils';

const { buildATIPageTrackPath, buildATIEventTrackUrl } = require('.');

const mockAndSet = ({ name, source }, response) => {
  source[name] = jest.fn(); // eslint-disable-line no-param-reassign
  source[name].mockImplementation(() => response);
};

const splitUrl = url => url.replace(/&/g, ',').replace(/\?/g, ',').split(',');

const analyticsUtilFunctions = [
  { name: 'getDestination', source: genericLabelHelpers },
  { name: 'getAppType', source: genericLabelHelpers },
  { name: 'getScreenInfo', source: genericLabelHelpers },
  { name: 'getBrowserViewPort', source: genericLabelHelpers },
  { name: 'getCurrentTime', source: genericLabelHelpers },
  { name: 'getDeviceLanguage', source: genericLabelHelpers },
  { name: 'getHref', source: genericLabelHelpers },
  { name: 'getReferrer', source: genericLabelHelpers },
  { name: 'getAtUserId', source: genericLabelHelpers },
  { name: 'getATIMarketingString,', source: genericLabelHelpers },
  { name: 'isLocServeCookieSet', source: genericLabelHelpers },
  { name: 'sanitise', source: genericLabelHelpers },
];

const marketingCampaignFunc = {
  name: 'getCampaignType',
  source: genericLabelHelpers,
};

describe('getThingAttributes', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should not add empty or null values', () => {
    analyticsUtilFunctions.push(marketingCampaignFunc);

    analyticsUtilFunctions.forEach(func => {
      mockAndSet(func, null);
    });

    expect(buildATIPageTrackPath({})).toEqual('');
  });

  it('should take in optional props and add them as correct query params', () => {
    analyticsUtilFunctions.forEach(func => {
      mockAndSet(func, null);
    });

    mockAndSet(marketingCampaignFunc, 'sl');

    const queryParams = buildATIPageTrackPath({
      appName: 'appName',
      contentId: 'contentId',
      contentType: 'contentType',
      language: 'language',
      ldpThingIds: 'ldpThingIds',
      ldpThingLabels: 'ldpThingLabels',
      pageIdentifier: 'pageIdentifier',
      pageTitle: 'pageTitle',
      platform: 'platform',
      producerId: 'producerId',
      timePublished: 'timePublished',
      timeUpdated: 'timeUpdated',
    });

    const queryParamsArray = splitUrl(queryParams);
    const expectedValues = [
      's2=producerId',
      'p=pageIdentifier',
      'x1=[contentId]',
      'x3=[appName]',
      'x4=[language]',
      'x7=[contentType]',
      'x11=[timePublished]',
      'x12=[timeUpdated]',
      'x13=[ldpThingLabels]',
      'x14=[ldpThingIds]',
      'xto=SEC------',
    ];

    expect(queryParamsArray).toHaveLength(expectedValues.length);
    expectedValues.forEach(value => expect(queryParamsArray).toContain(value));
  });

  it('should call relevant functions', () => {
    analyticsUtilFunctions.forEach(func => {
      mockAndSet(func, func.name);
    });

    mockAndSet(marketingCampaignFunc, 'email');

    const queryParams = buildATIPageTrackPath({
      pageTitle: 'pageTitle',
      platform: 'platform',
      service: 'service',
      statsDestination: 'statsDestination',
    });

    const queryParamsArray = splitUrl(queryParams);

    expect(queryParamsArray).toMatchInlineSnapshot(`
      Array [
        "s=getDestination",
        "idclient=getAtUserId",
        "r=getScreenInfo",
        "re=getBrowserViewPort",
        "hl=getCurrentTime",
        "lng=getDeviceLanguage",
        "x2=[getAppType]",
        "x5=[getHref]",
        "x6=[getReferrer]",
        "x9=[sanitise]",
        "x18=[isLocServeCookieSet]",
        "xto=-----%40",
        "ref=getReferrer",
      ]
    `);
  });
});

describe('buildATIEventTrackUrl', () => {
  it('should return the right url', () => {
    process.env.SIMORGH_ATI_BASE_URL = 'http://foobar.com?';
    expect(
      buildATIEventTrackUrl({
        pageIdentifier: 'pageIdentifier',
        service: 'service',
        platform: 'platform',
        statsDestination: 'statsDestination',
        componentName: 'component',
        componentInfo: {
          actionLabel: 'creation-label',
          result: 'https://foobar.com',
          positioning: {
            parent: 'container-component',
            child: 'child',
          },
        },
        type: 'type',
      }),
    ).toMatchInlineSnapshot(
      `"http://foobar.com?s=getDestination&p=pageIdentifier&r=getScreenInfo&re=getBrowserViewPort&hl=getCurrentTime&lng=getDeviceLanguage&atc=PUB-%5Bservice-component%5D-%5Bcreation-label~type%5D-%5B%5D-%5BPAR%3Dcontainer-component~CHD%3Dchild%5D-%5BpageIdentifier%5D-%5B%5D-%5Bresponsive_web~news-simorgh%5D-%5Bhttps%3A%2F%2Ffoobar.com%5D&type=AT"`,
    );
  });
});
