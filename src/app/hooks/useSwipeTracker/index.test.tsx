/* eslint-disable no-console */

import React, { createContext, ReactNode } from 'react';
import { OptimizelyProvider, ReactSDKClient } from '@optimizely/react-sdk';
import {
  renderHook,
  act,
} from '#app/components/react-testing-library-with-providers';
import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import { ATIData } from '#app/components/ATIAnalytics/types';
import { Toggles } from '#app/models/types/global';
import * as serviceContextModule from '../../contexts/ServiceContext';
import useSwipeTracker from '.';
import fixtureData from './fixtureData.json';

process.env.SIMORGH_ATI_BASE_URL = 'https://logws1363.ati-host.net?';

jest.mock('#app/lib/utilities/getUUID', () =>
  jest.fn().mockImplementation(() => '12345678-abcd-1fed-0123-a1b2c3d4e5f6'),
);

const {
  metadata: { atiAnalytics },
} = fixtureData;

const eventTrackingData = {
  componentName: 'portrait-video-modal',
  alwaysInView: true,
};

const defaultToggles = {
  eventTracking: {
    enabled: true,
  },
};

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

beforeEach(() => {
  jest.clearAllMocks();

  jest.replaceProperty(
    serviceContextModule,
    'ServiceContext',
    // @ts-expect-error override service context for tests
    createContext({
      atiAnalyticsProducerId: '52',
      atiAnalyticsProducerName: 'HINDI',
      service: 'hindi',
      useReverb: true,
    }),
  );
});

const wrapper = ({
  atiData,
  children,
  toggles = defaultToggles,
  mockOptimizely = defaultOptimizely,
}: {
  atiData?: ATIData;
  children?: ReactNode | null;
  toggles?: Toggles;
  mockOptimizely?: ReactSDKClient;
}) => (
  <OptimizelyProvider optimizely={mockOptimizely} isServerSide>
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.com"
      pageType={HOME_PAGE}
      isAmp={false}
      service="hindi"
      pathname="/hindi"
    >
      <serviceContextModule.ServiceContextProvider service="hindi">
        <ToggleContextProvider toggles={toggles}>
          <EventTrackingContextProvider atiData={atiData}>
            {children}
          </EventTrackingContextProvider>
        </ToggleContextProvider>
      </serviceContextModule.ServiceContextProvider>
    </RequestContextProvider>
  </OptimizelyProvider>
);

describe('useSwipeTracker', () => {
  describe('Expected use', () => {
    it('should return a function', () => {
      const { result } = renderHook(() => useSwipeTracker(eventTrackingData), {
        wrapper,
      });

      const swipeTracker = result.current;

      expect(swipeTracker).toBeInstanceOf(Function);
    });

    // describe('Optimizely', () => {
    //   it('should send event to Optimizely when element is 50% or more in view for more than 1 second and optimizely object exists', async () => {
    //     const { result } = renderHook(
    //       () =>
    //         useViewTracker({
    //           ...trackingData,
    //           sendOptimizelyEvents: true,
    //           experimentName: 'dummy_experiment',
    //           experimentVariant: 'variation_a',
    //         }),
    //       {
    //         wrapper: props => wrapper({ ...props, atiData: atiAnalytics }),
    //       },
    //     );
    //     const element = document.createElement('div');

    //     await result.current.ref(element);

    //     const observerInstance = getObserverInstance(element);

    //     act(() => {
    //       triggerIntersection({
    //         changes: [{ isIntersecting: true }],
    //         observer: observerInstance,
    //       });
    //     });

    //     act(() => {
    //       jest.advanceTimersByTime(1100);
    //     });

    //     const [[, options]] = (global.IntersectionObserver as jest.Mock).mock
    //       .calls;

    //     expect(global.IntersectionObserver).toHaveBeenCalledTimes(1);
    //     expect(options).toEqual({ threshold: [0.5] });
    //     expect(defaultOptimizely.track).toHaveBeenCalledTimes(1);
    //     expect(defaultOptimizely.track).toHaveBeenCalledWith(
    //       'most-read-views',
    //       defaultOptimizely.user.id,
    //       defaultOptimizely.user.attributes,
    //     );
    //   });

    //   it('should not send event to Optimizely when element is 50% or more in view for more than 1 second and optimizely object is undefined', async () => {
    //     const mockOptimizelyTrack = jest.fn();
    //     const mockOptimizely = undefined;

    //     const { result } = renderHook(
    //       () =>
    //         useViewTracker({
    //           ...trackingData,
    //           // @ts-expect-error partial data for tests
    //           ...mockOptimizely,
    //         }),
    //       {
    //         wrapper,
    //         initialProps: {},
    //       },
    //     );
    //     const element = document.createElement('div');

    //     await result.current.ref(element);

    //     const observerInstance = getObserverInstance(element);

    //     act(() => {
    //       triggerIntersection({
    //         changes: [{ isIntersecting: true }],
    //         observer: observerInstance,
    //       });
    //     });

    //     act(() => {
    //       jest.advanceTimersByTime(1100);
    //     });

    //     const [[, options]] = (global.IntersectionObserver as jest.Mock).mock
    //       .calls;

    //     expect(global.IntersectionObserver).toHaveBeenCalledTimes(1);
    //     expect(options).toEqual({ threshold: [0.5] });
    //     expect(mockOptimizelyTrack).toHaveBeenCalledTimes(0);
    //   });
    // });

    // describe('View tracking - Reverb', () => {
    //   beforeEach(() => {
    //     jest.replaceProperty(
    //       serviceContextModule,
    //       'ServiceContext',
    //       // @ts-expect-error override service context for tests
    //       createContext({
    //         atiAnalyticsProducerId: '70',
    //         atiAnalyticsProducerName: 'PIDGIN',
    //         service: 'pidgin',
    //         useReverb: true,
    //       }),
    //     );
    //   });

    //   describe('Viewability Model', () => {
    //     it.each([
    //       {
    //         title: 'should trigger a beacon for a view event',
    //         eventTrackingData: { ...trackingData },
    //         expectedItemEvent: {
    //           link: 'http://www.bbc.com/pidgin/tori-51745682',
    //           name: 'most-read',
    //         },
    //         expectedGroupEvent: {
    //           name: 'article-sty',
    //           type: 'most-read',
    //         },
    //       },
    //       {
    //         title: 'should trigger a beacon for an item level click event',
    //         eventTrackingData: {
    //           ...trackingData,
    //           componentName: 'portrait-video',
    //           itemTracker: {
    //             type: 'portrait-video-promo',
    //             text: 'Rollercoaster facts... while riding a rollercoaster',
    //             position: 1,
    //             duration: 73000,
    //             resourceId: 'test-item-id',
    //             label: 'test-item-label',
    //           },
    //           groupTracker: {
    //             itemCount: 15,
    //             resourceId: 'test-group-id',
    //           },
    //         },
    //         expectedItemEvent: {
    //           duration: 73000,
    //           link: 'http://www.bbc.com/pidgin/tori-51745682',
    //           name: 'portrait-video',
    //           position: 1,
    //           resource_id: 'test-item-id',
    //           text: 'Rollercoaster facts... while riding a rollercoaster',
    //           type: 'portrait-video-promo',
    //           label: 'test-item-label',
    //         },
    //         expectedGroupEvent: {
    //           item_count: 15,
    //           name: 'article-sty',
    //           resource_id: 'test-group-id',
    //           type: 'portrait-video',
    //         },
    //       },
    //     ])(
    //       '$title',
    //       async ({
    //         eventTrackingData,
    //         expectedItemEvent,
    //         expectedGroupEvent,
    //       }) => {
    //         const { result } = renderHook(
    //           () => useViewTracker(eventTrackingData),
    //           {
    //             wrapper: props => wrapper({ ...props, atiData: atiAnalytics }),
    //           },
    //         );
    //         const element = document.createElement('div');

    //         await result.current.ref(element);

    //         const observerInstance = getObserverInstance(element);

    //         act(() => {
    //           triggerIntersection({
    //             changes: [{ isIntersecting: true }],
    //             observer: observerInstance,
    //           });
    //         });

    //         await act(() => {
    //           jest.advanceTimersByTime(1100);
    //         });

    //         const [[, options]] = (global.IntersectionObserver as jest.Mock)
    //           .mock.calls;

    //         expect(global.IntersectionObserver).toHaveBeenCalledTimes(1);
    //         expect(options).toEqual({ threshold: [0.5] });
    //         expect(reverbMock.userActionEvent).toHaveBeenCalledTimes(1);
    //         expect(reverbMock.userActionEvent).toHaveBeenCalledWith(
    //           'viewability',
    //           '',
    //           {
    //             event: { action: 'view', category: 'viewability' },
    //             group: expectedGroupEvent,
    //             item: expectedItemEvent,
    //           },
    //           undefined,
    //           undefined,
    //           false,
    //         );
    //       },
    //     );
    //   });
    // });
  });
});
