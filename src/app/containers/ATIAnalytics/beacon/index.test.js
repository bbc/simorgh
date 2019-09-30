import { sendEventBeacon, sendViewBeacon } from '.';
import * as sendBeacon from '#lib/analyticsUtils/sendBeacon';
import * as analyticsUtils from '#lib/analyticsUtils';

const sendBeaconSpy = jest.spyOn(sendBeacon, 'default');
analyticsUtils.getCurrentTime = jest.fn().mockReturnValue('00-00-00');

describe('beacon', () => {
  const atiBaseUrl = 'https://foobar.com?';
  process.env.SIMORGH_ATI_BASE_URL = atiBaseUrl;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('event', () => {
    it('should call sendBeacon exactly twice', () => {
      sendEventBeacon({
        element: document.createElement('div'),
        type: 'click',
        label: 'test',
        service: 'service',
        component: 'component',
      });
      expect(sendBeaconSpy).toHaveBeenCalledTimes(2);
      expect(sendBeaconSpy.mock.calls).toEqual([
        [
          `https://foobar.com?${[
            's=598285',
            'r=0x0x24x24',
            're=1024x768',
            'hl=00-00-00',
            'lng=en-US',
            'ati=PUB-[service-component]-[=]-[]-[PAR=container-component::name~CHD=brand-top]-[]-[]-[]-[/]',
          ].join('&')}`,
        ],
        [
          `https://foobar.com?${[
            's=598285',
            'r=0x0x24x24',
            're=1024x768',
            'hl=00-00-00',
            'lng=en-US',
            'ati=PUB-[service-component]-[=click]-[test]-[PAR=container-component::name~CHD=brand-top]-[]-[]-[]-[/]',
          ].join('&')}`,
        ],
      ]);
    });
  });

  describe('view', () => {
    it('should called sendBeacon exactly once', () => {
      sendViewBeacon({
        element: document.createElement('div'),
        type: 'click',
        service: 'service',
        component: 'component',
      });
      expect(sendBeaconSpy).toHaveBeenCalledTimes(1);
      expect(sendBeaconSpy.mock.calls).toEqual([
        [
          `https://foobar.com?${[
            's=598285',
            'r=0x0x24x24',
            're=1024x768',
            'hl=00-00-00',
            'lng=en-US',
            'ati=PUB-[service-component]-[=viewed]-[]-[PAR=container-component::name~CHD=brand-top]-[]-[]-[]-[/]',
          ].join('&')}`,
        ],
      ]);
    });
  });
});
