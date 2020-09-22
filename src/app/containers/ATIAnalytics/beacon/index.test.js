import { sendEventBeacon } from '.';
import * as sendBeacon from '#lib/analyticsUtils/sendBeacon';
import * as analyticsUtils from '#lib/analyticsUtils';

const sendBeaconSpy = jest.spyOn(sendBeacon, 'default');
analyticsUtils.getCurrentTime = jest.fn().mockReturnValue('00-00-00');

describe('beacon', () => {
  const atiBaseUrl = 'https://foobar.com?';
  process.env.SIMORGH_ATI_BASE_URL = atiBaseUrl;

  const componentInfo = {
    actionLabel: 'creation-label',
    result: 'https://bbc.com',
    positioning: {
      parent: 'container-component',
      child: 'child',
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('event', () => {
    it('should call sendBeacon exactly twice', () => {
      sendEventBeacon({
        type: 'click',
        service: 'service',
        componentName: 'component',
        componentInfo,
        pageIdentifier: 'pageIdentifier',
      });
      expect(sendBeaconSpy).toHaveBeenCalledTimes(2);
      expect(sendBeaconSpy.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "https://foobar.com?s=598285&p=pageIdentifier&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&atc=PUB-%5Bservice-component%5D-%5Bcreation-label~click%5D-%5B%5D-%5BPAR%3Dcontainer-component~CHD%3Dchild%5D-%5BpageIdentifier%5D-%5B%5D-%5Bresponsive_web~news-simorgh%5D-%5Bhttps%3A%2F%2Fbbc.com%5D&type=AT",
          ],
          Array [
            "https://foobar.com?s=598285&p=pageIdentifier&r=0x0x24x24&re=1024x768&hl=00-00-00&lng=en-US&ati=PUB-%5Bservice-component%5D-%5Bcreation-label~view%5D-%5B%5D-%5BPAR%3Dcontainer-component~CHD%3Dchild%5D-%5BpageIdentifier%5D-%5B%5D-%5Bresponsive_web~news-simorgh%5D-%5Bhttps%3A%2F%2Fbbc.com%5D&type=AT",
          ],
        ]
      `);
    });
  });
});
