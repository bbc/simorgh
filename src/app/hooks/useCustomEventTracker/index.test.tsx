import { createContext, PropsWithChildren, ReactNode } from 'react';
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
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { sendEventBeacon } from '../../components/ATIAnalytics/beacon';
import dispatchViewabilityEvent from '../../components/ATIAnalytics/resonance/dispatchResonanceEvent';
import useCustomEventTracker from '.';

let mockServiceContextValue: {
  atiAnalyticsProducerId: string;
  atiAnalyticsProducerName: string;
  service: string;
  resonanceEnabled?: boolean;
} = {
  atiAnalyticsProducerId: '70',
  atiAnalyticsProducerName: 'PIDGIN',
  service: 'pidgin',
};

jest.mock(
  '../../components/ATIAnalytics/resonance/dispatchResonanceEvent',
  () => jest.fn(),
);

jest.mock('../../contexts/ServiceContext', () => {
  const serviceContext = createContext({
    atiAnalyticsProducerId: '70',
    atiAnalyticsProducerName: 'PIDGIN',
    service: 'pidgin',
  });

  return {
    __esModule: true,
    ServiceContext: serviceContext,
    ServiceContextProvider: ({ children }: PropsWithChildren) => (
      <serviceContext.Provider value={mockServiceContextValue}>
        {children}
      </serviceContext.Provider>
    ),
  };
});

jest.mock('../../components/ATIAnalytics/beacon', () => {
  const actual = jest.requireActual('../../components/ATIAnalytics/beacon');

  return {
    __esModule: true,
    ...actual,
    sendEventBeacon: jest.fn(),
  };
});

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

const mockSendEventBeacon = jest.mocked(sendEventBeacon);

const defaultToggles = {
  eventTracking: {
    enabled: true,
  },
};

beforeEach(() => {
  jest.clearAllMocks();

  mockServiceContextValue = {
    atiAnalyticsProducerId: '70',
    atiAnalyticsProducerName: 'PIDGIN',
    service: 'pidgin',
  };
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
    <ServiceContextProvider service="pidgin">
      <ToggleContextProvider toggles={toggles}>
        <EventTrackingContextProvider atiData={atiData}>
          {children}
        </EventTrackingContextProvider>
      </ToggleContextProvider>
    </ServiceContextProvider>
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
    expect(mockSendEventBeacon).toHaveBeenCalledWith(
      expect.objectContaining({
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
        hashedId: null,
      }),
    );
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

  describe('Resonance dual-run', () => {
    const eventName = 'test-custom-event';

    it('should dispatch a resonance event when resonanceEnabled is true', async () => {
      mockServiceContextValue = {
        ...mockServiceContextValue,
        resonanceEnabled: true,
      };

      const { result } = renderHook(
        () => useCustomEventTracker({ eventName }),
        {
          wrapper: props => wrapper({ ...props, atiData: atiAnalyticsFixture }),
        },
      );

      await act(async () => {
        await result.current('custom-component-data');
      });

      expect(mockSendEventBeacon).toHaveBeenCalledTimes(1);
      expect(dispatchViewabilityEvent).toHaveBeenCalledTimes(1);
      expect(dispatchViewabilityEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          event: expect.objectContaining({
            action: 'view',
            grouping: 'news::pidgin.news.story.51745682.page',
            subcategory: eventName,
          }),
          item: expect.objectContaining({
            label: 'custom-component-data',
            name: 'custom-component-data',
          }),
        }),
      );
    });

    it('should use the event name as the subcategory and leave the item name unset when there is no payload', async () => {
      mockServiceContextValue = {
        ...mockServiceContextValue,
        resonanceEnabled: true,
      };

      const { result } = renderHook(
        () => useCustomEventTracker({ eventName }),
        {
          wrapper: props => wrapper({ ...props, atiData: atiAnalyticsFixture }),
        },
      );

      await act(async () => {
        await result.current();
      });

      expect(dispatchViewabilityEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          event: expect.objectContaining({ subcategory: eventName }),
          item: expect.objectContaining({ name: undefined }),
        }),
      );
    });

    it('should still dispatch a resonance event when the Reverb beacon fails', async () => {
      mockServiceContextValue = {
        ...mockServiceContextValue,
        resonanceEnabled: true,
      };
      mockSendEventBeacon.mockRejectedValueOnce(new Error('beacon failed'));
      const consoleWarn = jest.spyOn(console, 'warn').mockImplementation();

      const { result } = renderHook(
        () => useCustomEventTracker({ eventName }),
        {
          wrapper: props => wrapper({ ...props, atiData: atiAnalyticsFixture }),
        },
      );

      await act(async () => {
        await result.current();
      });

      expect(dispatchViewabilityEvent).toHaveBeenCalledTimes(1);

      consoleWarn.mockRestore();
    });

    it('should not dispatch a resonance event when resonanceEnabled is false', async () => {
      const { result } = renderHook(
        () => useCustomEventTracker({ eventName }),
        {
          wrapper: props => wrapper({ ...props, atiData: atiAnalyticsFixture }),
        },
      );

      await act(async () => {
        await result.current();
      });

      expect(mockSendEventBeacon).toHaveBeenCalledTimes(1);
      expect(dispatchViewabilityEvent).not.toHaveBeenCalled();
    });

    it('should not dispatch a resonance event when tracking is disabled', async () => {
      mockServiceContextValue = {
        ...mockServiceContextValue,
        resonanceEnabled: true,
      };

      const { result } = renderHook(
        () => useCustomEventTracker({ eventName }),
        {
          wrapper: props =>
            wrapper({
              ...props,
              atiData: atiAnalyticsFixture,
              toggles: { eventTracking: { enabled: false } },
            }),
        },
      );

      await act(async () => {
        await result.current();
      });

      expect(dispatchViewabilityEvent).not.toHaveBeenCalled();
    });

    it('should not dispatch a resonance event when required ATI tracking props are missing', async () => {
      mockServiceContextValue = {
        ...mockServiceContextValue,
        resonanceEnabled: true,
      };

      const { result } = renderHook(
        () => useCustomEventTracker({ eventName }),
        { wrapper },
      );

      await act(async () => {
        await result.current();
      });

      expect(dispatchViewabilityEvent).not.toHaveBeenCalled();
    });
  });
});
