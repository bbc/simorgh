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

const reverbMock = {
  isReady: jest.fn(),
  initialise: jest.fn(() => Promise.resolve()),
  viewEvent: jest.fn(),
  userActionEvent: jest.fn(),
};

// eslint-disable-next-line no-underscore-dangle
window.__reverb = {
  __reverbLoadedPromise: Promise.resolve(reverbMock),
};

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

    describe('Reverb', () => {
      it('should call reverb userActionEvent exactly once for a view event', async () => {
        await sendEventBeacon({
          type: 'view',
          service: 'news',
          pageIdentifier: 'pageIdentifier',
          producerName: 'producer',
          statsDestination: 'statsDestination',
          componentName: 'component',
          campaignID: 'campaign1',
          format: 'format',
          advertiserID: 'advertiserID',
          url: 'http://localhost',
          detailedPlacement: 'detailedPlacement',
          useReverb: true,
        });
        expect(sendBeaconSpy).toHaveBeenCalledTimes(1);

        expect(reverbMock.userActionEvent).toHaveBeenCalledTimes(1);

        expect(reverbMock.userActionEvent).toHaveBeenCalledWith(
          'impression',
          'component',
          {
            container: 'campaign1',
            attribute: 'component',
            placement: 'pageIdentifier',
            source: 'advertiserID',
            result: 'http://localhost',
          },
          undefined,
          undefined,
          false,
        );
      });

      it('should call reverb click event exactly once for a click event', async () => {
        await sendEventBeacon({
          type: 'click',
          service: 'news',
          pageIdentifier: 'pageIdentifier',
          producerName: 'producer',
          statsDestination: 'statsDestination',
          componentName: 'component',
          campaignID: 'campaign1',
          format: 'format',
          advertiserID: 'advertiserID',
          url: 'http://localhost',
          detailedPlacement: 'detailedPlacement',
          useReverb: true,
        });
        expect(sendBeaconSpy).toHaveBeenCalledTimes(1);

        expect(reverbMock.userActionEvent).toHaveBeenCalledTimes(1);

        expect(reverbMock.userActionEvent).toHaveBeenCalledWith(
          'click',
          'component',
          {
            container: 'campaign1',
            attribute: 'component',
            placement: 'pageIdentifier',
            source: 'advertiserID',
            result: 'http://localhost',
          },
          undefined,
          undefined,
          true,
        );
      });

      it('should resolve reverbParams to null when Reverb is disabled for a service', () => {
        sendEventBeacon({
          type: 'click',
          service: 'news',
          componentName: 'component',
          pageIdentifier: 'pageIdentifier',
          detailedPlacement: 'detailedPlacement',
          useReverb: false,
        });

        const reverbParams = sendBeaconSpy.mock.calls[0][1];

        expect(sendBeaconSpy).toHaveBeenCalledTimes(1);
        expect(reverbParams).toBeNull();
      });
    });
  });
});
