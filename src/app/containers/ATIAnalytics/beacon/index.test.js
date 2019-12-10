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
      expect(sendBeaconSpy.mock.calls).toEqual([
        [
          `https://foobar.com?${[
            's=598285',
            'p=pageIdentifier',
            'r=0x0x24x24',
            're=1024x768',
            'hl=00-00-00',
            'lng=en-US',
            'atc=PUB-[service-component]-[creation-label~click]-[]-[PAR=container-component~CHD=child]-[pageIdentifier]-[]-[responsive_web~news-simorgh]-[https://bbc.com]',
            'type=AT',
          ].join('&')}`,
        ],
        [
          `https://foobar.com?${[
            's=598285',
            'p=pageIdentifier',
            'r=0x0x24x24',
            're=1024x768',
            'hl=00-00-00',
            'lng=en-US',
            'ati=PUB-[service-component]-[creation-label~view]-[]-[PAR=container-component~CHD=child]-[pageIdentifier]-[]-[responsive_web~news-simorgh]-[https://bbc.com]',
            'type=AT',
          ].join('&')}`,
        ],
      ]);
    });
  });
});
