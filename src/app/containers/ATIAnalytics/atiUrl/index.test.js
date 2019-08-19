import * as genericLabelHelpers from '../../../lib/analyticsUtils';

const atiPageViewParams = require('.').default;

const mockAndSet = ({ name, source }, response) => {
  source[name] = jest.fn(); // eslint-disable-line no-param-reassign
  source[name].mockImplementation(() => response);
};

const splitUrl = url =>
  url
    .replace(/&/g, ',')
    .replace(/\?/g, ',')
    .split(',');

const analyticsUtilFunctions = [
  { name: 'getDestination', source: genericLabelHelpers },
  { name: 'getAppType', source: genericLabelHelpers },
  { name: 'getScreenInfo', source: genericLabelHelpers },
  { name: 'getBrowserViewPort', source: genericLabelHelpers },
  { name: 'getCurrentTime', source: genericLabelHelpers },
  { name: 'getDeviceLanguage', source: genericLabelHelpers },
  { name: 'getHref', source: genericLabelHelpers },
  { name: 'getProducer', source: genericLabelHelpers },
  { name: 'getReferrer', source: genericLabelHelpers },
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

    const queryParams = atiPageViewParams({});
    const queryParamsArray = splitUrl(queryParams);
    const expectedValues = [];

    expectedValues.forEach(value => expect(queryParamsArray).toContain(value));
  });

  it('should take in optional props and add them as correct query params', () => {
    analyticsUtilFunctions.forEach(func => {
      mockAndSet(func, null);
    });

    const queryParams = atiPageViewParams({
      appName: 'appName',
      contentId: 'contentId',
      contentType: 'contentType',
      language: 'language',
      ldpThingIds: 'ldpThingIds',
      ldpThingLabels: 'ldpThingLabels',
      pageIdentifier: 'pageIdentifier',
      pageTitle: 'pageTitle',
      platform: 'platform',
      timePublished: 'timePublished',
      timeUpdated: 'timeUpdated',
    });

    const queryParamsArray = splitUrl(queryParams);
    const expectedValues = [
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

    const queryParams = atiPageViewParams({
      pageTitle: 'pageTitle',
      platform: 'platform',
      service: 'service',
      statsDestination: 'statsDestination',
    });

    const queryParamsArray = splitUrl(queryParams);
    const expectedValues = [
      's=getDestination',
      's2=getProducer',
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
