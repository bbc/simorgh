import { ReactSDKClient } from '@optimizely/react-sdk';
import { Platforms, Services } from '#app/models/types/global';
import dispatchTrackingRequests from '.';

const sendEventBeaconSpy = jest.spyOn(
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('../../../components/ATIAnalytics/beacon'),
  'sendEventBeacon',
);

const defaultOptimizely = {
  track: jest.fn(),
  user: { attributes: { foo: 'bar' }, id: 'test' },
} as unknown as ReactSDKClient;

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

describe('dispatchTrackingRequests', () => {
  // describe('Optimizely tracking', () => {});
  describe('Reverb tracking', () => {
    // Define tracker parameters
    // Test that reverb is called when all reverb parameters are provided
    // Test that reverb is not called when required reverb parameters are missing

    it('should trigger a beacon for a view event when the required reverbParameters and trackingFlags are provided', async () => {
      const viewTrackerRequestsParameters = {
        optimizelyParameters: {
          optimizely: defaultOptimizely,
          componentName: 'testComponent',
        },
        reverbParameters: {
          campaignID: 'campaign123',
          componentName: 'testComponent',
          format: 'testFormat',
          pageIdentifier: 'page123',
          platform: 'canonical' as Platforms,
          producerId: 'producer id',
          producerName: 'producer name',
          service: 'pidgin' as Services,
          statsDestination: 'stats destination',
          type: 'view',
          advertiserID: 'advertiser id',
          url: 'http://example.com',
          detailedPlacement: 'detailed placement',
          useReverb: true,
          groupTracker: {
            name: 'test group',
            type: 'portrait-video-modal',
            itemCount: 18,
            resourceId: 'test-group-id',
            position: 4,
          },
          itemTracker: {
            name: 'portrait-video-modal',
            type: 'portrait-video',
            text: 'Rollercoaster facts... while riding a rollercoaster',
            position: 1,
            duration: 73000,
            mediaType: 'video',
            resourceId: 'test-item-id',
          },
        },
        trackingFlags: {
          trackingIsEnabled: true,
          eventSent: false,
          alwaysInView: true,
        },
      };

      await dispatchTrackingRequests(viewTrackerRequestsParameters);

      expect(sendEventBeaconSpy).toHaveBeenCalled();
      expect(sendEventBeaconSpy).toHaveBeenCalledTimes(1);

      expect(reverbMock.userActionEvent).toHaveBeenCalledTimes(1);
      // expect(reverbMock.userActionEvent).toHaveBeenCalledWith(
      //   'viewability',
      //   '',
      //   {
      //     event: { action: 'view', category: 'viewability' },
      //     group: {
      //       name: 'test group',
      //       type: 'portrait-video-modal',
      //       item_count: 18,
      //       resource_id: 'test-group-id',
      //       position: 4,
      //     },
      //     item: {
      //       name: 'portrait-video-modal',
      //       type: 'portrait-video',
      //       text: 'Rollercoaster facts... while riding a rollercoaster',
      //       media_type: 'video',
      //       position: 1,
      //       duration: 73000,
      //       resource_id: 'test-item-id',
      //     },
      //   },
      //   undefined,
      //   undefined,
      //   false,
      // );
    });
  });
});
