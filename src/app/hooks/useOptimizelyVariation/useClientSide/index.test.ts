import optimizelyReactSdk, { OptimizelyDecision } from '@optimizely/react-sdk';
import { renderHook } from '#app/components/react-testing-library-with-providers';
import useClientSide from '.';

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

    const { result } = renderHook(() =>
      useClientSide({ experimentName: 'correct_experiment_id' }),
    );

    expect(result.current).toEqual('control');
  });

  it('should return a variation of null when the client is not ready and not timed out', () => {
    useDecisionSpy.mockReturnValue([
      { variationKey: null } as unknown as OptimizelyDecision,
      false,
      false,
    ]);

    const { result } = renderHook(() =>
      useClientSide({ experimentName: 'correct_experiment_id' }),
    );

    expect(result.current).toEqual(null);
  });

  it('should return a variation of null when the client is ready but has timed out', () => {
    useDecisionSpy.mockReturnValue([
      { variationKey: null } as unknown as OptimizelyDecision,
      true,
      true,
    ]);

    const { result } = renderHook(() =>
      useClientSide({ experimentName: 'correct_experiment_id' }),
    );

    expect(result.current).toEqual(null);
  });

  it('should return a variation of null when a decision is not made', () => {
    useDecisionSpy.mockReturnValue([
      { variationKey: null } as unknown as OptimizelyDecision,
      true,
      false,
    ]);
    const { result } = renderHook(() =>
      useClientSide({ experimentName: 'wrong_experiment_id' }),
    );

    expect(result.current).toEqual(null);
  });
});
