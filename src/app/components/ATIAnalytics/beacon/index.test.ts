import * as sendBeacon from '../../../lib/analyticsUtils/sendBeacon';
import * as analyticsUtils from '../../../lib/analyticsUtils';
import { sendEventBeacon } from '.';

const sendBeaconSpy = jest.spyOn(sendBeacon, 'default');

(analyticsUtils.getAtUserId as jest.Mock) = jest
  .fn()
  .mockReturnValue('123-456-789');
(analyticsUtils.getCurrentTime as jest.Mock) = jest
  .fn()
  .mockReturnValue('00-00-00');

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
        detailedPlacement: 'detailedPlacement',
      });
      expect(sendBeaconSpy).toHaveBeenCalledTimes(1);

      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(new URL(sendBeaconSpy.mock.calls[0][0]).search),
      );

      expect(parsedATIParams).toEqual({
        idclient: '123-456-789',
        s: '598285',
        p: 'pageIdentifier',
        r: '0x0x24x24',
        re: '1024x768',
        hl: '00-00-00',
        lng: 'en-US',
        atc: 'PUB-[]-[component]-[]-[]-[pageIdentifier]-[detailedPlacement]-[]-[]',
        type: 'AT',
      });
    });
  });
});
