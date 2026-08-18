import { ReactNode } from 'react';
import optimizelyReactSdk, { OptimizelyDecision } from '@optimizely/react-sdk';
import { renderHook } from '#app/components/react-testing-library-with-providers';
import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import { Toggles } from '#app/models/types/global';
import useClientSide from '.';

const defaultToggles = { eventTracking: { enabled: true } } as Toggles;

const wrapper = ({
  children,
  toggles = defaultToggles,
}: {
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
        <EventTrackingContextProvider>{children}</EventTrackingContextProvider>
      </ToggleContextProvider>
    </ServiceContextProvider>
  </RequestContextProvider>
);

describe('useOptimizelyVariation - useClientSide', () => {
  const useDecisionSpy = jest.spyOn(optimizelyReactSdk, 'useDecision');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a variation string when the client is ready and not timed out', () => {
    useDecisionSpy.mockReturnValue([
      { variationKey: 'control' } as unknown as OptimizelyDecision,
      true,
      false,
    ]);

    const { result } = renderHook(
      () => useClientSide({ experimentName: 'correct_experiment_id' }),
      { wrapper },
    );

    expect(result.current).toEqual('control');
  });

  it('should return a variation of null when the client is not ready and not timed out', () => {
    useDecisionSpy.mockReturnValue([
      { variationKey: null } as unknown as OptimizelyDecision,
      false,
      false,
    ]);

    const { result } = renderHook(
      () => useClientSide({ experimentName: 'correct_experiment_id' }),
      { wrapper },
    );

    expect(result.current).toEqual(null);
  });

  it('should return a variation of null when the client is ready but has timed out', () => {
    useDecisionSpy.mockReturnValue([
      { variationKey: null } as unknown as OptimizelyDecision,
      true,
      true,
    ]);

    const { result } = renderHook(
      () => useClientSide({ experimentName: 'correct_experiment_id' }),
      { wrapper },
    );

    expect(result.current).toEqual(null);
  });

  it('should return a variation of null when a decision is not made', () => {
    useDecisionSpy.mockReturnValue([
      { variationKey: null } as unknown as OptimizelyDecision,
      true,
      false,
    ]);
    const { result } = renderHook(
      () => useClientSide({ experimentName: 'wrong_experiment_id' }),
      { wrapper },
    );

    expect(result.current).toEqual(null);
  });
});
