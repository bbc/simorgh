/* eslint-disable no-console */

import { ReactNode } from 'react';
import {
  renderHook,
  AllTheProviders,
} from '#app/components/react-testing-library-with-providers';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import { ATIData } from '#app/components/ATIAnalytics/types';
import { PageTypes, Services, Toggles } from '#app/models/types/global';
import useSwipeTracker from '.';
import fixtureData from './fixtureData.json';
import dispatchViewabilityEvent from '../../components/ATIAnalytics/resonance/dispatchResonanceEvent';

jest.mock(
  '../../components/ATIAnalytics/resonance/dispatchResonanceEvent',
  () => jest.fn(),
);

const {
  metadata: { atiAnalytics, type },
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
  pageMetadata,
  children,
  toggles = defaultToggles,
  service = 'hindi',
}: {
  pageMetadata?: { atiAnalytics: ATIData; type: PageTypes };
  children?: ReactNode | null;
  toggles?: Toggles;
  service?: Services;
}) => (
  <AllTheProviders
    pageMetadata={pageMetadata}
    bbcOrigin="https://www.test.bbc.com"
    pageData={fixtureData}
    pageType={HOME_PAGE}
    isAmp={false}
    service={service}
    pathname={`/${service}`}
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
            wrapper: props =>
              wrapper({ ...props, pageMetadata: { atiAnalytics, type } }),
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

    describe('Resonance dual-run', () => {
      const pageMetadata = { atiAnalytics, type: type as PageTypes };

      const swipeData = {
        ...eventTrackingData,
        groupTracker: {
          name: 'group name',
          itemCount: 20,
        },
        itemTracker: {
          type: 'portrait-video',
          position: 2,
        },
      };

      it('should dispatch a resonance event when resonanceEnabled is true', async () => {
        const {
          result: { current: swipeTracker },
        } = renderHook(() => useSwipeTracker(eventTrackingData), {
          wrapper: props =>
            wrapper({
              ...props,
              service: 'arabic',
              pageMetadata,
            }),
        });

        await swipeTracker(swipeData);

        expect(reverbMock.userActionEvent).toHaveBeenCalledTimes(1);
        expect(dispatchViewabilityEvent).toHaveBeenCalledTimes(1);
        expect(dispatchViewabilityEvent).toHaveBeenCalledWith(
          expect.objectContaining({
            event: expect.objectContaining({
              action: 'view',
              subcategory: 'portrait-video-modal',
            }),
            group: expect.objectContaining({
              name: 'group name',
              itemCount: 20,
            }),
            item: expect.objectContaining({
              type: 'portrait-video',
              position: 2,
            }),
          }),
        );
      });

      it('should not dispatch a resonance event when resonanceEnabled is false', async () => {
        const {
          result: { current: swipeTracker },
        } = renderHook(() => useSwipeTracker(eventTrackingData), {
          wrapper: props => wrapper({ ...props, pageMetadata }),
        });

        await swipeTracker(swipeData);

        expect(reverbMock.userActionEvent).toHaveBeenCalledTimes(1);
        expect(dispatchViewabilityEvent).not.toHaveBeenCalled();
      });

      it('should not dispatch a resonance event when tracking is disabled', async () => {
        const {
          result: { current: swipeTracker },
        } = renderHook(() => useSwipeTracker(eventTrackingData), {
          wrapper: props =>
            wrapper({
              ...props,
              service: 'arabic',
              pageMetadata,
              toggles: { eventTracking: { enabled: false } },
            }),
        });

        await swipeTracker(swipeData);

        expect(dispatchViewabilityEvent).not.toHaveBeenCalled();
      });
    });
  });
});
