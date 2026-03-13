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

const viewTrackerRequestsParameters = {
  optimizelyParameters: {
    optimizely: defaultOptimizely,
    componentName: 'portrait-video-modal',
  },
  reverbParameters: {
    campaignID: 'campaign123',
    componentName: 'portrait-video-modal',
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
    groupTracker: {
      name: 'test group',
      type: 'portrait-video-modal',
      itemCount: 18,
      resourceId: 'test-group-id',
      position: 4,
    },
    itemTracker: {
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
    alwaysInView: false,
  },
};

describe('dispatchTrackingRequests', () => {
  describe('Optimizely tracking', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should send event to Optimizely when optimizely object exists and required parameters are set to true', async () => {
      await dispatchTrackingRequests({
        ...viewTrackerRequestsParameters,
        optimizelyParameters: {
          ...viewTrackerRequestsParameters.optimizelyParameters,
          sendOptimizelyEvents: true,
          experimentVariant: 'variantA',
        },
      });

      expect(sendEventBeaconSpy).toHaveBeenCalled();

      expect(defaultOptimizely.track).toHaveBeenCalledTimes(1);
      expect(defaultOptimizely.track).toHaveBeenCalledWith(
        'portrait-video-modal-views',
        defaultOptimizely.user.id,
        defaultOptimizely.user.attributes,
      );
    });

    it.each([
      {
        title: 'sendOptimizelyEvents is set to false in optimizelyParameters',
        eventTrackingData: {
          ...viewTrackerRequestsParameters,
          optimizelyParameters: {
            ...viewTrackerRequestsParameters.optimizelyParameters,
            sendOptimizelyEvents: false,
            experimentVariant: 'variantA',
          },
        },
      },
      {
        title: 'experimentVariant is set to off in optimizelyParameters',
        eventTrackingData: {
          ...viewTrackerRequestsParameters,
          optimizelyParameters: {
            ...viewTrackerRequestsParameters.optimizelyParameters,
            sendOptimizelyEvents: true,
            experimentVariant: 'off',
          },
        },
      },
    ])(
      'should not send event to Optimizely when optimizely object exists and $title',
      async ({ eventTrackingData }) => {
        await dispatchTrackingRequests(eventTrackingData);

        expect(sendEventBeaconSpy).toHaveBeenCalled();

        expect(defaultOptimizely.track).not.toHaveBeenCalled();
      },
    );
  });

  describe('Reverb tracking', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it.each([
      {
        title:
          'the required reverbParameters are provided and trackingIsEnabled is set to true in trackingFlags',
        eventTrackingData: {
          ...viewTrackerRequestsParameters,
        },
      },
      {
        title:
          'the required reverbParameters are provided and eventSent is set to false in trackingFlags',
        eventTrackingData: {
          ...viewTrackerRequestsParameters,
          trackingFlags: {
            trackingIsEnabled: true,
            eventSent: false,
            alwaysInView: false,
          },
        },
      },
      {
        title:
          'the required reverbParameters are provided and alwaysInView is set to true in trackingFlags',
        eventTrackingData: {
          ...viewTrackerRequestsParameters,
          trackingFlags: {
            trackingIsEnabled: true,
            eventSent: false,
            alwaysInView: true,
          },
        },
      },
    ])(
      'should trigger a beacon for a view event when $title',
      async ({ eventTrackingData }) => {
        await dispatchTrackingRequests(eventTrackingData);

        expect(sendEventBeaconSpy).toHaveBeenCalled();

        expect(reverbMock.userActionEvent).toHaveBeenCalledTimes(1);
        expect(reverbMock.userActionEvent).toHaveBeenCalledWith(
          'viewability',
          '',
          {
            event: { action: 'view', category: 'viewability' },
            group: {
              name: 'test group',
              type: 'portrait-video-modal',
              item_count: 18,
              resource_id: 'test-group-id',
              position: 4,
            },
            item: {
              name: 'portrait-video-modal',
              attribution: 'advertiser id',
              link: 'http://example.com',
              type: 'portrait-video',
              text: 'Rollercoaster facts... while riding a rollercoaster',
              media_type: 'video',
              position: 1,
              duration: 73000,
              resource_id: 'test-item-id',
            },
          },
          undefined,
          undefined,
          false,
        );
      },
    );

    it.each([
      {
        title: 'componentName is missing in reverbParameters',
        eventTrackingData: {
          ...viewTrackerRequestsParameters,
          reverbParameters: {
            campaignID: 'campaign123',
            format: 'testFormat',
            pageIdentifier: 'page123',
            platform: 'canonical' as Platforms,
            producerId: 'producer id',
            producerName: 'producer name',
            service: 'pidgin' as Services,
            statsDestination: 'stats destination',
          },
        },
      },
      {
        title: 'service is missing in reverbParameters',
        eventTrackingData: {
          ...viewTrackerRequestsParameters,
          reverbParameters: {
            campaignID: 'campaign123',
            componentName: 'portrait-video-modal',
            format: 'testFormat',
            pageIdentifier: 'page123',
            platform: 'canonical' as Platforms,
            producerId: 'producer id',
            producerName: 'producer name',
            statsDestination: 'stats destination',
          },
        },
      },
      {
        title: 'trackingIsEnabled is set to false in trackingFlags',
        eventTrackingData: {
          ...viewTrackerRequestsParameters,
          reverbParameters: {
            campaignID: 'campaign123',
            componentName: 'portrait-video-modal',
            format: 'testFormat',
            pageIdentifier: 'page123',
            platform: 'canonical' as Platforms,
            producerId: 'producer id',
            producerName: 'producer name',
            statsDestination: 'stats destination',
          },
        },
        trackingFlags: {
          trackingIsEnabled: false,
          eventSent: false,
          alwaysInView: true,
        },
      },
      {
        title: 'eventSent is set to true in trackingFlags',
        eventTrackingData: {
          ...viewTrackerRequestsParameters,
          reverbParameters: {
            campaignID: 'campaign123',
            componentName: 'portrait-video-modal',
            format: 'testFormat',
            pageIdentifier: 'page123',
            platform: 'canonical' as Platforms,
            producerId: 'producer id',
            producerName: 'producer name',
            statsDestination: 'stats destination',
          },
        },
        trackingFlags: {
          trackingIsEnabled: true,
          eventSent: true,
          alwaysInView: false,
        },
      },
    ])(
      'should not trigger a beacon for a view event when $title',
      async ({ eventTrackingData }) => {
        // @ts-expect-error required to test shouldDispatchEventBeacon false condition
        await dispatchTrackingRequests(eventTrackingData);

        expect(sendEventBeaconSpy).not.toHaveBeenCalled();

        expect(reverbMock.userActionEvent).not.toHaveBeenCalled();
      },
    );
  });
});
