/* eslint-disable no-console */

import React, { ReactNode } from 'react';
import {
  renderHook,
  AllTheProviders,
} from '#app/components/react-testing-library-with-providers';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import { ATIData } from '#app/components/ATIAnalytics/types';
import { Toggles } from '#app/models/types/global';
import useSwipeTracker from '.';
import fixtureData from './fixtureData.json';

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
}: {
  atiData?: ATIData;
  children?: ReactNode | null;
  toggles?: Toggles;
}) => (
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
