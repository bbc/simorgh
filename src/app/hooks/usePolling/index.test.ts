import { act, renderHook } from '@testing-library/react';
import * as fetchPolledData from '#app/lib/utilities/fetchPolledData';
import usePolling, { POLLING_INTERVAL, UsePollingProps } from '.';

jest.useFakeTimers();

const advancePolling = async () => {
  await act(async () => {
    jest.advanceTimersByTime(POLLING_INTERVAL);
    await Promise.resolve();
  });
};

type PollResponse = { event?: { value: string } };
type PollData = { value: string } | null;

const initialData: PollData = { value: 'initial' };
const updatedData = { value: 'updated' };

const renderUsePolling = (
  overrides: Partial<UsePollingProps<PollResponse, PollData>> = {},
) =>
  renderHook(() =>
    usePolling<PollResponse, PollData>({
      initialData,
      enabled: true,
      endpoint: 'live',
      params: { id: '123' },
      returnedData: response => response.event ?? null,
      ...overrides,
    }),
  );

describe('usePolling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the initial data on initialisation', () => {
    jest.spyOn(fetchPolledData, 'default').mockResolvedValue(null);

    const { result } = renderUsePolling();

    expect(result.current).toStrictEqual(initialData);
  });

  it('should call fetchPolledData with the given endpoint and params when enabled', async () => {
    const fetchSpy = jest
      .spyOn(fetchPolledData, 'default')
      .mockResolvedValue(null);

    renderUsePolling({
      endpoint: 'sport',
      params: { sportDataEventUrn: encodeURIComponent('urn:sport:123') },
    });

    await advancePolling();

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith('sport', {
      params: { sportDataEventUrn: encodeURIComponent('urn:sport:123') },
    });
  });

  it('should not poll when disabled', async () => {
    const fetchSpy = jest
      .spyOn(fetchPolledData, 'default')
      .mockResolvedValue(null);

    renderUsePolling({ enabled: false });

    await advancePolling();

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('should update the data when new data is returned after polling', async () => {
    jest.spyOn(fetchPolledData, 'default').mockResolvedValue({
      data: { event: updatedData },
      status: 200,
    });

    const { result } = renderUsePolling();

    await advancePolling();

    expect(result.current).toStrictEqual(updatedData);
  });

  it('should keep the current data when no response is returned after polling', async () => {
    jest.spyOn(fetchPolledData, 'default').mockResolvedValue(null);

    const { result } = renderUsePolling();

    await advancePolling();

    expect(result.current).toStrictEqual(initialData);
  });

  it('should keep the current data when payload data is empty', async () => {
    jest.spyOn(fetchPolledData, 'default').mockResolvedValue({
      data: { event: undefined },
      status: 200,
    });

    const { result } = renderUsePolling();

    await advancePolling();

    expect(result.current).toStrictEqual(initialData);
  });

  it('should clear the polling interval when unmounted', async () => {
    const fetchSpy = jest
      .spyOn(fetchPolledData, 'default')
      .mockResolvedValue(null);

    const { unmount } = renderUsePolling();

    unmount();

    await advancePolling();

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('should use a custom interval when provided', async () => {
    const customInterval = 5000;
    const fetchSpy = jest
      .spyOn(fetchPolledData, 'default')
      .mockResolvedValue(null);

    renderUsePolling({ interval: customInterval });

    await act(async () => {
      jest.advanceTimersByTime(customInterval);
      await Promise.resolve();
    });

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('should use the default interval when not provided', async () => {
    const fetchSpy = jest
      .spyOn(fetchPolledData, 'default')
      .mockResolvedValue(null);

    renderUsePolling();

    await advancePolling();

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('should restart the interval when the interval prop changes', async () => {
    const fetchSpy = jest
      .spyOn(fetchPolledData, 'default')
      .mockResolvedValue(null);

    const { rerender } = renderHook(
      ({ interval }: Partial<UsePollingProps<PollResponse, PollData>> = {}) =>
        usePolling<PollResponse, PollData>({
          initialData,
          enabled: true,
          endpoint: 'live',
          params: { id: '123' },
          returnedData: response => response.event ?? null,
          interval,
        }),
    );

    // Advance by half the default interval
    await act(async () => {
      jest.advanceTimersByTime(POLLING_INTERVAL / 2);
    });

    expect(fetchSpy).not.toHaveBeenCalled();

    // Rerender with a shorter custom interval
    rerender({ interval: 1000 });

    // Advance by the custom interval
    await act(async () => {
      jest.advanceTimersByTime(1000);
      await Promise.resolve();
    });

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
