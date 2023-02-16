import * as optimizelyReactSdk from '@optimizely/react-sdk';
import { renderHook } from '@testing-library/react-hooks';
import useOptimizelyVariation from '.';

describe('useOptimizelyVariation client side', () => {
  const useDecisionSpy = jest.spyOn(optimizelyReactSdk, 'useDecision');
  const isClientSide = true;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a variation string when the client is ready and not timed out', () => {
    useDecisionSpy.mockReturnValue([{ variationKey: 'control' }, true, false]);

    const { result } = renderHook(() =>
      useOptimizelyVariation(isClientSide)('correct_experiment_id'),
    );

    expect(result.current).toEqual('control');
  });

  it('should return a variation of null when the client is not ready and not timed out', () => {
    useDecisionSpy.mockReturnValue([{ variationKey: null }, false, false]);

    const { result } = renderHook(() =>
      useOptimizelyVariation(isClientSide)('correct_experiment_id'),
    );

    expect(result.current).toEqual(null);
  });

  it('should return a variation of null when the client is ready but has timed out', () => {
    useDecisionSpy.mockReturnValue([{ variationKey: null }, true, true]);

    const { result } = renderHook(() =>
      useOptimizelyVariation(isClientSide)('correct_experiment_id'),
    );

    expect(result.current).toEqual(null);
  });

  it('should return a variation of null when a decision is not made', () => {
    useDecisionSpy.mockReturnValue([{ variationKey: null }, true, false]);

    const { result } = renderHook(() =>
      useOptimizelyVariation(isClientSide)('wrong_experiment_id'),
    );

    expect(result.current).toEqual(null);
  });

  it('should return a variation of null when the experiment id is null', () => {
    useDecisionSpy.mockReturnValue([{ variationKey: null }, true, false]);

    const { result } = renderHook(() =>
      useOptimizelyVariation(isClientSide)(null),
    );

    expect(result.current).toEqual(null);
  });
});

describe('useOptimizelyVariation server side', () => {
  const useDecisionSpy = jest.spyOn(optimizelyReactSdk, 'useDecision');
  const isClientSide = false;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not use useDecision hook when client side optimizely is disabled', () => {
    useDecisionSpy.mockReturnValue([{ variationKey: 'control' }, true, false]);

    const { result } = renderHook(() =>
      useOptimizelyVariation(isClientSide)('correct_experiment_id'),
    );

    expect(result.current).toEqual(true);
    expect(useDecisionSpy).toBeCalledTimes(0);
  });
});
