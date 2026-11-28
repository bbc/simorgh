import { renderHook } from '#app/components/react-testing-library-with-providers';
import { renderHook as renderSSRHook } from '@testing-library/react-hooks/server';
import useOperaMiniDetection from '.';

describe('useOperaMiniDetection', () => {
  beforeEach(() => {
    delete window.operamini;
  });

  afterEach(() => {
    delete window.operamini;
  });

  it('returns false during server rendering even on Opera Mini', () => {
    window.operamini = true;
    const { result } = renderSSRHook(() => useOperaMiniDetection());
    expect(result.current).toBe(false);
  });

  it('should return true when on Opera Mini', () => {
    window.operamini = true;
    const { result } = renderHook(() => useOperaMiniDetection());
    expect(result.current).toBe(true);
  });

  it('should return false when not on Opera Mini', () => {
    window.operamini = false;
    const { result } = renderHook(() => useOperaMiniDetection());
    expect(result.current).toBe(false);
  });
});
