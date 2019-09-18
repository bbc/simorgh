import { sendEventBeacon, sendViewBeacon } from '.';
import sendBeacon from '../../../lib/analyticsUtils/sendBeacon';

let mockSendBeacon = jest.fn();

jest.mock('../../../lib/analyticsUtils/sendBeacon');
jest.mock('../../../lib/analyticsUtils', () => {
  const analyticsUtils = jest.requireActual('../../../lib/analyticsUtils');

  return {
    ...analyticsUtils,
    getCurrentTime: () => '00x00x00',
  };
});

describe('beacon', () => {
  const atiBaseUrl = 'https://foobar.com?';
  process.env.SIMORGH_ATI_BASE_URL = atiBaseUrl;
  beforeEach(() => {
    mockSendBeacon = jest.fn();
    sendBeacon.mockImplementation(mockSendBeacon);
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
      expect(mockSendBeacon).toHaveBeenCalledTimes(2);
      expect(mockSendBeacon.mock.calls).toEqual([
        [
          'https://foobar.com?s=598285&r=0x0x24x24&re=1024x768&hl=00x00x00&lng=en-US&ati=PUB-[service-component]-[=]-[]-[PAR=container-component::name~CHD=brand-top]-[]-[]-[]-[/]',
        ],
        [
          'https://foobar.com?s=598285&r=0x0x24x24&re=1024x768&hl=00x00x00&lng=en-US&ati=PUB-[service-component]-[=click]-[test]-[PAR=container-component::name~CHD=brand-top]-[]-[]-[]-[/]',
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
      expect(mockSendBeacon).toHaveBeenCalledTimes(1);
      expect(mockSendBeacon.mock.calls).toEqual([
        [
          'https://foobar.com?s=598285&r=0x0x24x24&re=1024x768&hl=00x00x00&lng=en-US&ati=PUB-[service-component]-[=viewed]-[]-[PAR=container-component::name~CHD=brand-top]-[]-[]-[]-[/]',
        ],
      ]);
    });
  });
});
