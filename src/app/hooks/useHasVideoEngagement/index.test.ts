import {
  renderHook,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import { VIDEO_ENGAGEMENT_KEY } from '#app/lib/utilities/videoEngagement';
import useHasVideoEngagement from '.';

describe('useHasVideoEngagement', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('returns false on first render when flag is unset', () => {
    const { result } = renderHook(() => useHasVideoEngagement());
    expect(result.current).toBe(false);
  });

  it('reads from localStorage and returns true when flag is set', async () => {
    // Set flag before rendering hook to simulate flag already in storage
    localStorage.setItem(VIDEO_ENGAGEMENT_KEY, 'true');

    const { result } = renderHook(() => useHasVideoEngagement());

    // After rendering (effects are flushed), should read from localStorage
    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it('returns false when flag is not set in localStorage', async () => {
    const { result } = renderHook(() => useHasVideoEngagement());

    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });

  it('only reads from localStorage once on mount', async () => {
    const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');

    renderHook(() => useHasVideoEngagement());

    await waitFor(() => {
      expect(getItemSpy).toHaveBeenCalledWith(VIDEO_ENGAGEMENT_KEY);
      expect(getItemSpy).toHaveBeenCalledTimes(1);
    });

    getItemSpy.mockRestore();
  });
});
