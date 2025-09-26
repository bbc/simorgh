import {
  waitFor,
  renderHook,
} from '#app/components/react-testing-library-with-providers';
import { renderHook as renderSSRHook } from '@testing-library/react-hooks/server';
import useHydrationDetection from '.';

describe('useHydrationDetection', () => {
  it('should return false on initial render (server-side)', () => {
    const { result } = renderSSRHook(() => useHydrationDetection());
    expect(result.current).toBe(false);
  });

  it('should return true after hydration (client-side)', async () => {
    const { result } = renderHook(() => useHydrationDetection());

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });
});
