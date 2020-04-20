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
  { name: 'isLocServeCookieSet', source: genericLabelHelpers },
  { name: 'sanitise', source: genericLabelHelpers },
];

describe('getThingAttributes', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should not add empty or null values', () => {
    analyticsUtilFunctions.forEach(func => {
      mockAndSet(func, null);
    });

    const atiPath = buildATIPageTrackPath({});
    const atiPathArray = splitUrl(atiPath);
    const expectedValues = [];

    expectedValues.forEach(value => expect(atiPathArray).toContain(value));
  });

  it('should take in optional props and add them as correct query params', () => {
    analyticsUtilFunctions.forEach(func => {
      mockAndSet(func, null);
    });

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
    ];

    expect(queryParamsArray).toHaveLength(expectedValues.length);
    expectedValues.forEach(value => expect(queryParamsArray).toContain(value));
  });

  it('should call relevant functions when', () => {
    analyticsUtilFunctions.forEach(func => {
      mockAndSet(func, func.name);
    });

    const queryParams = buildATIPageTrackPath({
      pageTitle: 'pageTitle',
      platform: 'platform',
      service: 'service',
      statsDestination: 'statsDestination',
    });

    const queryParamsArray = splitUrl(queryParams);
    const expectedValues = [
      's=getDestination',
      'idclient=getAtUserId',
      'r=getScreenInfo',
      're=getBrowserViewPort',
      'hl=getCurrentTime',
      'lng=getDeviceLanguage',
      'x2=[getAppType]',
      'x5=[getHref]',
      'x6=[getReferrer]',
      'x9=[sanitise]',
      'x18=[isLocServeCookieSet]',
    ];

    expect(queryParamsArray).toHaveLength(expectedValues.length);
    expectedValues.forEach(value => expect(queryParamsArray).toContain(value));
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
    ).toEqual(
      `http://foobar.com?${[
        's=getDestination',
        'p=pageIdentifier',
        'r=getScreenInfo',
        're=getBrowserViewPort',
        'hl=getCurrentTime',
        'lng=getDeviceLanguage',
        'atc=PUB-[service-component]-[creation-label~type]-[]-[PAR=container-component~CHD=child]-[pageIdentifier]-[]-[responsive_web~news-simorgh]-[https://foobar.com]',
        'type=AT',
      ].join('&')}`,
    );
  });
});
