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
        type: 'type',
        campaignID: 'campaignID',
        format: 'format',
        url: 'url',
      }),
    ).toMatchInlineSnapshot(
      `"http://foobar.com?idclient=getAtUserId&s=getDestination&p=pageIdentifier&r=getScreenInfo&re=getBrowserViewPort&hl=getCurrentTime&lng=getDeviceLanguage&atc=PUB-[campaignID]-[component]-[]-[format]-[pageIdentifier]-[]-[]-[url]&type=AT"`,
    );
  });
});
