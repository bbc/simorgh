import React, { createContext, ReactNode } from 'react';
import {
  renderHook,
  act,
} from '#app/components/react-testing-library-with-providers';
import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import { ATIData } from '#app/components/ATIAnalytics/types';
import { Toggles } from '#app/models/types/global';
import { VIEW_EVENT } from '#app/lib/analyticsUtils/analytics.const';
import * as serviceContextModule from '../../contexts/ServiceContext';
import * as beaconModule from '../../components/ATIAnalytics/beacon';
import useCustomEventTracker from '.';

const atiAnalyticsFixture = {
  campaigns: [
    {
      campaignId: '5a988e3e39461b000e9dabfb',
      campaignName: 'WS - Keep me on trend',
    },
    {
      campaignId: '5a988e4739461b000e9dabfc',
      campaignName: 'WS - Update me',
    },
  ],
  categoryName: 'News',
  contentId: 'urn:bbc:cps:curie:asset:53870d86-88c5-6f4d-a260-f97c68606458',
  contentType: 'article',
  language: 'pcm',
  ldpThingIds: null,
  ldpThingLabels: null,
  pageIdentifier: 'news::pidgin.news.story.51745682.page',
  pageTitle: "Adams Oshiomhole say 'I still be APC National Chairman'",
  producerId: null,
  timePublished: '2020-03-04T18:58:43.000Z',
  timeUpdated: '2020-03-04T19:26:11.000Z',
  producerName: 'PIDGIN',
};

const mockSendEventBeacon = jest
  .spyOn(beaconModule, 'sendEventBeacon')
  .mockImplementation(jest.fn());

const defaultToggles = {
  eventTracking: {
    enabled: true,
  },
};

beforeEach(() => {
  jest.clearAllMocks();

  jest.replaceProperty(
    serviceContextModule,
    'ServiceContext',
    // @ts-expect-error override service context for tests
    createContext({
      atiAnalyticsProducerId: '70',
      atiAnalyticsProducerName: 'PIDGIN',
      service: 'pidgin',
      useReverb: true,
    }),
  );
});

const wrapper = ({
  atiData,
  children,
  toggles = defaultToggles,
}: {
  atiData?: ATIData;
  children?: ReactNode | null;
  toggles?: Toggles;
}) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.com"
    pageType={STORY_PAGE}
    isAmp={false}
    service="pidgin"
    pathname="/pidgin/tori-51745682"
  >
    <serviceContextModule.ServiceContextProvider service="pidgin">
      <ToggleContextProvider toggles={toggles}>
        <EventTrackingContextProvider atiData={atiData}>
          {children}
        </EventTrackingContextProvider>
      </ToggleContextProvider>
    </serviceContextModule.ServiceContextProvider>
  </RequestContextProvider>
);

describe('useCustomEventTracker', () => {
  it('should call sendEventBeacon with correct parameters when all required props are present', async () => {
    const eventName = 'test-custom-event';
    const { result } = renderHook(() => useCustomEventTracker({ eventName }), {
      wrapper: props => wrapper({ ...props, atiData: atiAnalyticsFixture }),
    });

    await act(async () => {
      await result.current();
    });

    expect(mockSendEventBeacon).toHaveBeenCalledTimes(1);
    expect(mockSendEventBeacon).toHaveBeenCalledWith({
      type: VIEW_EVENT,
      eventGroupingName: eventName,
      componentName: '',
      campaignID: 'article-sty',
      pageIdentifier: 'news::pidgin.news.story.51745682.page',
      platform: 'canonical',
      producerId: '70',
      producerName: 'PIDGIN',
      service: 'pidgin',
      statsDestination: 'WS_NEWS_LANGUAGES_TEST',
      useReverb: true,
    });
  });

  it('should use stringifiedData as componentName when provided', async () => {
    const eventName = 'test-custom-event';
    const stringifiedData = 'custom-component-data';

    const { result } = renderHook(() => useCustomEventTracker({ eventName }), {
      wrapper: props => wrapper({ ...props, atiData: atiAnalyticsFixture }),
    });

    await act(async () => {
      await result.current(stringifiedData);
    });

    expect(mockSendEventBeacon).toHaveBeenCalledWith(
      expect.objectContaining({
        componentName: stringifiedData,
      }),
    );
  });

  it('should not call sendEventBeacon when tracking is disabled', async () => {
    const eventName = 'test-custom-event';

    const { result } = renderHook(() => useCustomEventTracker({ eventName }), {
      wrapper: props =>
        wrapper({
          ...props,
          atiData: atiAnalyticsFixture,
          toggles: { eventTracking: { enabled: false } },
        }),
    });

    await act(async () => {
      await result.current();
    });

    expect(mockSendEventBeacon).not.toHaveBeenCalled();
  });

  it('should not call sendEventBeacon when eventName is missing', async () => {
    const { result } = renderHook(
      () => useCustomEventTracker({ eventName: '' }),
      {
        wrapper: props => wrapper({ ...props, atiData: atiAnalyticsFixture }),
      },
    );

    await act(async () => {
      await result.current();
    });

    expect(mockSendEventBeacon).not.toHaveBeenCalled();
  });

  it('should not call sendEventBeacon when required ATI tracking props are missing', async () => {
    const eventName = 'test-custom-event';

    const { result } = renderHook(() => useCustomEventTracker({ eventName }), {
      wrapper,
    });

    await act(async () => {
      await result.current();
    });

    expect(mockSendEventBeacon).not.toHaveBeenCalled();
  });
});
