/* eslint-disable no-console */

import React, { ReactNode } from 'react';
import { OptimizelyProvider, ReactSDKClient } from '@optimizely/react-sdk';
import {
  renderHook,
  AllTheProviders,
} from '#app/components/react-testing-library-with-providers';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import { ATIData } from '#app/components/ATIAnalytics/types';
import { Toggles } from '#app/models/types/global';
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
    <AllTheProviders
      atiData={atiData}
      bbcOrigin="https://www.test.bbc.com"
      pageData={fixtureData}
      pageType={HOME_PAGE}
      isAmp={false}
      service="hindi"
      pathname="/hindi"
      toggles={toggles}
    >
      {children}
    </AllTheProviders>
  </OptimizelyProvider>
);

describe('useSwipeTracker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Expected use', () => {
    it('should return a function', () => {
      const { result } = renderHook(() => useSwipeTracker(eventTrackingData), {
        wrapper,
      });

      const swipeTracker = result.current;

      expect(swipeTracker).toBeInstanceOf(Function);
    });

    describe('Optimizely', () => {
      it('should send event to Optimizely when element the element is in view and optimizely object exists', async () => {
        const {
          result: { current: swipeTracker },
        } = renderHook(() => useSwipeTracker(eventTrackingData), {
          wrapper: props => wrapper({ ...props, atiData: atiAnalytics }),
        });

        await swipeTracker({
          ...eventTrackingData,
          sendOptimizelyEvents: true,
          experimentName: 'dummy_experiment',
          experimentVariant: 'variation_a',
          groupTracker: {
            name: 'group name',
            itemCount: 20,
            resourceId:
              'urn:bbc:tipo:list:fe4a1c8c-9a7c-4a50-845d-7da91aa65204',
            position: 4,
            type: 'portrait-video-modal',
          },
          itemTracker: {
            type: 'portrait-video',
            text: 'टेलर स्विफ़्ट ने अपने इस डर का किया ज़िक्र',
            mediaType: 'video',
            position: 2,
            duration: 22000,
            resourceId: 'urn:bbc:pips:pid:p0m6zysd',
          },
        });

        expect(defaultOptimizely.track).toHaveBeenCalledTimes(1);
        expect(defaultOptimizely.track).toHaveBeenCalledWith(
          'portrait-video-modal-views',
          defaultOptimizely.user.id,
          defaultOptimizely.user.attributes,
        );
      });

      it('should not send event to Optimizely when element is in view and optimizely object is undefined', async () => {
        const mockOptimizelyTrack = jest.fn();
        const mockOptimizely = undefined;

        const {
          result: { current: swipeTracker },
        } = renderHook(() => useSwipeTracker(eventTrackingData), {
          wrapper: props =>
            wrapper({ ...props, atiData: atiAnalytics, mockOptimizely }),
        });

        await swipeTracker({
          ...eventTrackingData,
          sendOptimizelyEvents: true,
          experimentName: 'dummy_experiment',
          experimentVariant: 'variation_a',
          groupTracker: {
            name: 'group name',
            itemCount: 20,
            resourceId:
              'urn:bbc:tipo:list:fe4a1c8c-9a7c-4a50-845d-7da91aa65204',
            position: 4,
            type: 'portrait-video-modal',
          },
          itemTracker: {
            type: 'portrait-video',
            text: 'टेलर स्विफ़्ट ने अपने इस डर का किया ज़िक्र',
            mediaType: 'video',
            position: 2,
            duration: 22000,
            resourceId: 'urn:bbc:pips:pid:p0m6zysd',
          },
        });

        expect(mockOptimizelyTrack).toHaveBeenCalledTimes(0);
      });

      it('should not send event to Optimizely when element is in view and optimizely experiment variant is set to "off"', async () => {
        const {
          result: { current: swipeTracker },
        } = renderHook(() => useSwipeTracker(eventTrackingData), {
          wrapper: props => wrapper({ ...props, atiData: atiAnalytics }),
        });

        await swipeTracker({
          ...eventTrackingData,
          sendOptimizelyEvents: true,
          experimentName: 'dummy_experiment',
          experimentVariant: 'off',
          groupTracker: {
            name: 'group name',
            itemCount: 20,
            resourceId:
              'urn:bbc:tipo:list:fe4a1c8c-9a7c-4a50-845d-7da91aa65204',
            position: 4,
            type: 'portrait-video-modal',
          },
          itemTracker: {
            type: 'portrait-video',
            text: 'टेलर स्विफ़्ट ने अपने इस डर का किया ज़िक्र',
            mediaType: 'video',
            position: 2,
            duration: 22000,
            resourceId: 'urn:bbc:pips:pid:p0m6zysd',
          },
        });

        expect(defaultOptimizely.track).toHaveBeenCalledTimes(0);
      });

      it('should not send event to Optimizely when element is in view and optimizely experiment variant is set to "off"', async () => {
        const {
          result: { current: swipeTracker },
        } = renderHook(() => useSwipeTracker(eventTrackingData), {
          wrapper: props => wrapper({ ...props, atiData: atiAnalytics }),
        });

        await swipeTracker({
          ...eventTrackingData,
          sendOptimizelyEvents: true,
          experimentName: 'dummy_experiment',
          experimentVariant: 'off',
          groupTracker: {
            name: 'group name',
            itemCount: 20,
            resourceId:
              'urn:bbc:tipo:list:fe4a1c8c-9a7c-4a50-845d-7da91aa65204',
            position: 4,
            type: 'portrait-video-modal',
          },
          itemTracker: {
            type: 'portrait-video',
            text: 'टेलर स्विफ़्ट ने अपने इस डर का किया ज़िक्र',
            mediaType: 'video',
            position: 2,
            duration: 22000,
            resourceId: 'urn:bbc:pips:pid:p0m6zysd',
          },
        });

        expect(defaultOptimizely.track).toHaveBeenCalledTimes(0);
      });
    });

    describe('View tracking - Reverb', () => {
      describe('Viewability Model', () => {
        it('should trigger a beacon for a view event', async () => {
          const {
            result: { current: swipeTracker },
          } = renderHook(() => useSwipeTracker(eventTrackingData), {
            wrapper: props => wrapper({ ...props, atiData: atiAnalytics }),
          });

          await swipeTracker({
            ...eventTrackingData,
            groupTracker: {
              name: 'group name',
              itemCount: 20,
              resourceId:
                'urn:bbc:tipo:list:fe4a1c8c-9a7c-4a50-845d-7da91aa65204',
              position: 4,
              type: 'portrait-video-modal',
            },
            itemTracker: {
              type: 'portrait-video',
              text: 'टेलर स्विफ़्ट ने अपने इस डर का किया ज़िक्र',
              mediaType: 'video',
              position: 2,
              duration: 22000,
              resourceId: 'urn:bbc:pips:pid:p0m6zysd',
            },
          });

          expect(reverbMock.userActionEvent).toHaveBeenCalledTimes(1);
          expect(reverbMock.userActionEvent).toHaveBeenCalledWith(
            'viewability',
            '',
            {
              event: { action: 'view', category: 'viewability' },
              group: {
                name: 'group name',
                item_count: 20,
                resource_id:
                  'urn:bbc:tipo:list:fe4a1c8c-9a7c-4a50-845d-7da91aa65204',
                position: 4,
                type: 'portrait-video-modal',
              },
              item: {
                name: 'portrait-video-modal',
                type: 'portrait-video',
                text: 'टेलर स्विफ़्ट ने अपने इस डर का किया ज़िक्र',
                media_type: 'video',
                position: 2,
                duration: 22000,
                resource_id: 'urn:bbc:pips:pid:p0m6zysd',
              },
            },
            undefined,
            undefined,
            false,
          );
        });
      });
    });
  });
});
