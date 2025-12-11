import * as sendBeacon from '../../../lib/analyticsUtils/sendBeacon';
import { sendEventBeacon } from '.';

const sendBeaconSpy = jest.spyOn(sendBeacon, 'default');

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
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('event', () => {
    describe('Reverb', () => {
      describe('Viewability Model', () => {
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
            'viewability',
            '',
            {
              item: {
                attribution: 'advertiserID',
                name: 'component',
                link: 'http://localhost',
              },
              group: {
                name: 'campaign1',
                type: 'component',
              },
              event: {
                category: 'viewability',
                action: 'view',
              },
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
            'viewability',
            '',
            {
              item: {
                attribution: 'advertiserID',
                name: 'component',
                link: 'http://localhost',
              },
              group: {
                name: 'campaign1',
                type: 'component',
              },
              event: {
                category: 'viewability',
                action: 'select',
              },
            },
            undefined,
            undefined,
            true,
          );
        });
      });
    });
  });
});
