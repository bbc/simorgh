import {
  act,
  renderHook,
} from '#app/components/react-testing-library-with-providers';
import * as fetchPolledData from '#app/lib/utilities/fetchPolledData';
import usePolling, { POLLING_INTERVAL, UsePollingProps } from '.';

jest.useFakeTimers();

const advancePolling = async (duration = POLLING_INTERVAL) => {
  await act(async () => {
    jest.advanceTimersByTime(duration);
    await Promise.resolve();
  });
};

type PollResponse = { event?: { value: string } };
type PollData = { value: string } | null;
type FetchResponse = Awaited<
  ReturnType<typeof fetchPolledData.default<PollResponse>>
>;

const initialData: PollData = { value: 'initial' };
const updatedData = { value: 'updated' };

const renderUsePolling = (
  overrides: Partial<UsePollingProps<PollResponse, PollData>> = {},
) =>
  renderHook(
    (props: Partial<UsePollingProps<PollResponse, PollData>>) =>
      usePolling<PollResponse, PollData>({
        initialData,
        enabled: true,
        endpoint: 'stream',
        params: { id: '123' },
        returnedData: response => response.event ?? null,
        ...props,
      }),
    { initialProps: overrides },
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
          endpoint: 'stream',
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

  it('should use committed params and callbacks without restarting the interval', async () => {
    const fetchSpy = jest.spyOn(fetchPolledData, 'default').mockResolvedValue({
      data: { event: updatedData },
      status: 200,
    });
    const previousReturnedData = jest.fn(() => initialData);
    const returnedData = jest.fn(
      (response: PollResponse) => response.event ?? null,
    );
    const { result, rerender } = renderUsePolling({
      returnedData: previousReturnedData,
    });

    await advancePolling(POLLING_INTERVAL / 2);
    rerender({ params: { id: '456' }, returnedData });
    await advancePolling(POLLING_INTERVAL / 2);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith('stream', {
      params: { id: '456' },
    });
    expect(previousReturnedData).not.toHaveBeenCalled();
    expect(returnedData).toHaveBeenCalledWith({ event: updatedData });
    expect(result.current).toStrictEqual(updatedData);
  });

  it('should use the latest committed callback when an in-flight request completes', async () => {
    const { promise, resolve } = Promise.withResolvers<FetchResponse>();
    jest.spyOn(fetchPolledData, 'default').mockReturnValueOnce(promise);
    const previousReturnedData = jest.fn(() => initialData);
    const returnedData = jest.fn(
      (response: PollResponse) => response.event ?? null,
    );
    const { result, rerender } = renderUsePolling({
      returnedData: previousReturnedData,
    });

    await advancePolling();
    rerender({ returnedData });
    await act(async () => {
      resolve({ data: { event: updatedData }, status: 200 });
    });

    expect(previousReturnedData).not.toHaveBeenCalled();
    expect(returnedData).toHaveBeenCalledWith({ event: updatedData });
    expect(result.current).toStrictEqual(updatedData);
  });

  it.each([{ enabled: false }, { endpoint: 'sport' }, { interval: 1000 }])(
    'should ignore in-flight requests when polling is reconfigured with %o',
    async overrides => {
      const { promise, resolve } = Promise.withResolvers<FetchResponse>();
      jest.spyOn(fetchPolledData, 'default').mockReturnValueOnce(promise);
      const returnedData = jest.fn(
        (response: PollResponse) => response.event ?? null,
      );
      const { result, rerender } = renderUsePolling({ returnedData });

      await advancePolling();
      rerender({ ...overrides, returnedData });
      await act(async () => {
        resolve({ data: { event: updatedData }, status: 200 });
      });

      expect(returnedData).not.toHaveBeenCalled();
      expect(result.current).toStrictEqual(initialData);
    },
  );

  it('should ignore in-flight requests after unmounting', async () => {
    const { promise, resolve } = Promise.withResolvers<FetchResponse>();
    jest.spyOn(fetchPolledData, 'default').mockReturnValueOnce(promise);
    const returnedData = jest.fn(
      (response: PollResponse) => response.event ?? null,
    );
    const { unmount } = renderUsePolling({ returnedData });

    await advancePolling();
    unmount();
    await act(async () => {
      resolve({ data: { event: updatedData }, status: 200 });
    });

    expect(returnedData).not.toHaveBeenCalled();
  });

  it('should restart polling after being enabled without accepting a cancelled response', async () => {
    const { promise, resolve } = Promise.withResolvers<FetchResponse>();
    const fetchSpy = jest
      .spyOn(fetchPolledData, 'default')
      .mockResolvedValue({
        data: { event: updatedData },
        status: 200,
      })
      .mockReturnValueOnce(promise);
    const { result, rerender } = renderUsePolling();

    await advancePolling();
    rerender({ enabled: false });
    await advancePolling();
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    rerender({ enabled: true });
    await advancePolling(POLLING_INTERVAL / 2);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    await advancePolling(POLLING_INTERVAL / 2);
    expect(result.current).toStrictEqual(updatedData);

    await act(async () => {
      resolve({ data: { event: { value: 'cancelled' } }, status: 200 });
    });

    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(result.current).toStrictEqual(updatedData);
  });

  it('should preserve polled data when initial data changes on rerender', async () => {
    jest.spyOn(fetchPolledData, 'default').mockResolvedValue({
      data: { event: updatedData },
      status: 200,
    });
    const { result, rerender } = renderUsePolling();

    await advancePolling();
    rerender({ initialData: { value: 'new initial data' } });

    expect(result.current).toStrictEqual(updatedData);
  });
});
