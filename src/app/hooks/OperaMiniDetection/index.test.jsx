import { renderHook } from '@testing-library/react-hooks';
import OperaMiniDetection from '.';

describe('OperaMiniDetection', () => {
  beforeEach(() => {
    delete window.operamini;
  });

  it('should return true when on Opera Mini', () => {
    window.operamini = true;
    const { result } = renderHook(() => OperaMiniDetection());
    expect(result.current).toBe(true);
  });

  it('should return false when not on Opera Mini', () => {
    window.operamini = false;
    const { result } = renderHook(() => OperaMiniDetection());
    expect(result.current).toBe(false);
  });
});
