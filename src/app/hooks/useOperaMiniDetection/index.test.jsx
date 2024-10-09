import { renderHook } from '#app/components/react-testing-library-with-providers';
import useOperaMiniDetection from '.';

describe('useOperaMiniDetection', () => {
  beforeEach(() => {
    delete window.operamini;
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
