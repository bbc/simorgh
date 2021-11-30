import * as optimizelyReactSdk from '@optimizely/react-sdk';
import { renderHook } from '@testing-library/react-hooks';
import useOptimizelyVariation from '.';

describe('useOptimizelyVariation', () => {
  const useDecisionSpy = jest.spyOn(optimizelyReactSdk, 'useDecision');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a variation string when the client is ready and not timed out', () => {
    useDecisionSpy.mockReturnValue([{ variationKey: 'control' }, true, false]);

    const { result } = renderHook(() =>
      useOptimizelyVariation('correct_experiment_id'),
    );

    expect(result.current).toEqual('control');
  });

  it('should return a variation of null when the client is not ready and not timed out', () => {
    useDecisionSpy.mockReturnValue([{ variationKey: 'control' }, false, false]);

    const { result } = renderHook(() =>
      useOptimizelyVariation('correct_experiment_id'),
    );

    expect(result.current).toEqual(null);
  });

  it('should return a variation of null when the client is ready but has timed out', () => {
    useDecisionSpy.mockReturnValue([{ variationKey: 'control' }, true, true]);

    const { result } = renderHook(() =>
      useOptimizelyVariation('correct_experiment_id'),
    );

    expect(result.current).toEqual(null);
  });

  it('should return a variation of null when a decision is not made', () => {
    useDecisionSpy.mockReturnValue([{ variationKey: null }, true, false]);

    const { result } = renderHook(() =>
      useOptimizelyVariation('wrong_experiment_id'),
    );

    expect(result.current).toEqual(null);
  });
});
