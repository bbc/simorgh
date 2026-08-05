import { ReactNode } from 'react';
import {
  renderHook,
  act,
} from '#app/components/react-testing-library-with-providers';
import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import { ATIData } from '#app/components/ATIAnalytics/types';
import { Toggles } from '#app/models/types/global';
import sendOptimizelyActivationEvent from '#app/lib/analyticsUtils/sendOptimizelyActivationEvent';
import useOptimizelyActivationEvent from '.';

jest.mock('#app/lib/analyticsUtils/sendOptimizelyActivationEvent');

const defaultToggles = { eventTracking: { enabled: true } } as Toggles;

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
    service="news"
    pathname="/news/articles/c0000000000o"
  >
    <ServiceContextProvider service="news">
      <ToggleContextProvider toggles={toggles}>
        <EventTrackingContextProvider atiData={atiData}>
          {children}
        </EventTrackingContextProvider>
      </ToggleContextProvider>
    </ServiceContextProvider>
  </RequestContextProvider>
);

describe('useOptimizelyActivationEvent', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('sends the activation event with the resolved ATI context when tracking is enabled', async () => {
    const { result } = renderHook(() => useOptimizelyActivationEvent(), {
      wrapper,
    });

    await act(async () => {
      await result.current('foo', 'control');
    });

    expect(sendOptimizelyActivationEvent).toHaveBeenCalledTimes(1);
    expect(sendOptimizelyActivationEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        experimentName: 'foo',
        experimentVariant: 'control',
        trackingIsEnabled: true,
        service: 'news',
      }),
    );
  });

  it('reports tracking as disabled when the eventTracking toggle is off', async () => {
    const { result } = renderHook(() => useOptimizelyActivationEvent(), {
      wrapper: props =>
        wrapper({
          ...props,
          toggles: { eventTracking: { enabled: false } } as Toggles,
        }),
    });

    await act(async () => {
      await result.current('foo', 'control');
    });

    expect(sendOptimizelyActivationEvent).toHaveBeenCalledWith(
      expect.objectContaining({ trackingIsEnabled: false }),
    );
  });
});
