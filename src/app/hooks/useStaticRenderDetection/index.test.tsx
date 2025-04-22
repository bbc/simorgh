import {
  waitFor,
  renderHook,
} from '#app/components/react-testing-library-with-providers';
import { renderHook as renderSSRHook } from '@testing-library/react-hooks/server';
import useStaticRenderDetection from '.';

describe('useStaticRenderDetection', () => {
  it('should return true on initial render', () => {
    const { result } = renderSSRHook(() => useStaticRenderDetection());
    expect(result.current).toBe(true);
  });

  it('should return false after hydration', async () => {
    const { result } = renderHook(() => useStaticRenderDetection());

    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });
});
