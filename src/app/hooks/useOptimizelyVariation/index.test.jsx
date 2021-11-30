import React from 'react';
import { useDecision } from '@optimizely/react-sdk';
import { renderHook } from '@testing-library/react-hooks';
import withOptimizely from '#app/containers/PageHandlers/withOptimizely';
import useOptimizelyVariation from '.';

describe(useDecision, () => {
  const useDecisionMock = jest.fn('useDecision');

  const wrapper = ({ children }) => withOptimizely(children);

  afterEach(jest.clearAllMocks);

  it('Test 1', () => {
    useDecisionMock.mockReturnValue({
      decision: { variationKey: '' },
      isClientReady: true,
      didTimeout: true,
    });

    const { result } = renderHook(() => useOptimizelyVariation('foo'), {
      wrapper,
    });

    expect(result).toEqual(null);
  });
});
