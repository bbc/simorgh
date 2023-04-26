import * as sendBeacon from '../../../lib/analyticsUtils/sendBeacon';
import * as analyticsUtils from '../../../lib/analyticsUtils';
import { sendEventBeacon } from '.';

const sendBeaconSpy = jest.spyOn(sendBeacon, 'default');

// @ts-expect-error - we need to mock these functions to ensure tests are deterministic
analyticsUtils.getAtUserId = jest.fn().mockReturnValue('123-456-789');
// @ts-expect-error - we need to mock these functions to ensure tests are deterministic
analyticsUtils.getCurrentTime = jest.fn().mockReturnValue('00-00-00');

describe('beacon', () => {
  const originalATIBaseUrl = process.env.SIMORGH_ATI_BASE_URL;
  const atiBaseUrl = 'https://foobar.com?';
  process.env.SIMORGH_ATI_BASE_URL = atiBaseUrl;

  afterEach(() => {
    jest.clearAllMocks();
    process.env.SIMORGH_ATI_BASE_URL = originalATIBaseUrl;
  });

  describe('event', () => {
    it('should call sendBeacon exactly once', () => {
      sendEventBeacon({
        type: 'click',
        service: 'news',
        componentName: 'component',
        pageIdentifier: 'pageIdentifier',
      });
      expect(sendBeaconSpy).toHaveBeenCalledTimes(1);
      expect(sendBeaconSpy.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "https://foobar.com?idclient=123-456-789&s=598285&p=pageIdentifier&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&atc=PUB-[]-[component]-[]-[]-[pageIdentifier]-[]-[]-[]&type=AT",
        ]
      `);
    });
  });
});
