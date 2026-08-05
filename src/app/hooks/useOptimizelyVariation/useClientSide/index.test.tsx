import { ReactNode } from 'react';
import optimizelyReactSdk, { OptimizelyDecision } from '@optimizely/react-sdk';
import {
  renderHook,
  act,
} from '#app/components/react-testing-library-with-providers';
import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import { Toggles } from '#app/models/types/global';
import sendOptimizelyActivationEvent from '#app/lib/analyticsUtils/sendOptimizelyActivationEvent';
import useClientSide from '.';

jest.mock('#app/lib/analyticsUtils/sendOptimizelyActivationEvent');

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

  it('should send the activation event once when a valid variation is resolved', async () => {
    useDecisionSpy.mockReturnValue([
      { variationKey: 'control' } as unknown as OptimizelyDecision,
      true,
      false,
    ]);

    await act(async () => {
      renderHook(
        () => useClientSide({ experimentName: 'correct_experiment_id' }),
        { wrapper },
      );
    });

    expect(sendOptimizelyActivationEvent).toHaveBeenCalledTimes(1);
    expect(sendOptimizelyActivationEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        experimentName: 'correct_experiment_id',
        experimentVariant: 'control',
      }),
    );
  });

  it('should not send the activation event when the variation is "off"', async () => {
    useDecisionSpy.mockReturnValue([
      { variationKey: 'off' } as unknown as OptimizelyDecision,
      true,
      false,
    ]);

    await act(async () => {
      renderHook(
        () => useClientSide({ experimentName: 'correct_experiment_id' }),
        { wrapper },
      );
    });

    expect(sendOptimizelyActivationEvent).not.toHaveBeenCalled();
  });

  it('should not send the activation event again after a re-render', async () => {
    useDecisionSpy.mockReturnValue([
      { variationKey: 'control' } as unknown as OptimizelyDecision,
      true,
      false,
    ]);

    let rerender: (() => void) | undefined;
    await act(async () => {
      ({ rerender } = renderHook(
        () => useClientSide({ experimentName: 'correct_experiment_id' }),
        { wrapper },
      ));
    });

    await act(async () => {
      rerender?.();
    });

    expect(sendOptimizelyActivationEvent).toHaveBeenCalledTimes(1);
  });
});
