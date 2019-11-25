import { sendEventBeacon } from '.';
import * as sendBeacon from '#lib/analyticsUtils/sendBeacon';
import * as analyticsUtils from '#lib/analyticsUtils';

const sendBeaconSpy = jest.spyOn(sendBeacon, 'default');
analyticsUtils.getCurrentTime = jest.fn().mockReturnValue('00-00-00');

describe('beacon', () => {
  const atiBaseUrl = 'https://foobar.com?';
  process.env.SIMORGH_ATI_BASE_URL = atiBaseUrl;

  const componentInfo = {
    creationLabel: 'creation-label',
    url: 'https://bbc.com',
    format: {
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
            'ati=PUB-[service-component]-[=click]-[creation-label]-[PAR=container-component::name~CHD=child]-[]-[]-[]-[https://bbc.com]',
            'type=AT',
          ].join('&')}`,
        ],
        [
          `https://foobar.com?${[
            's=598285',
            'r=0x0x24x24',
            're=1024x768',
            'hl=00-00-00',
            'lng=en-US',
            'ati=PUB-[service-component]-[=view]-[creation-label]-[PAR=container-component::name~CHD=child]-[]-[]-[]-[https://bbc.com]',
            'type=AT',
          ].join('&')}`,
        ],
      ]);
    });
  });
});
