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

  it('should update the data when a poll returns new data', async () => {
    jest.spyOn(fetchPolledData, 'default').mockResolvedValue({
      data: { event: updatedData },
      status: 200,
    });

    const { result } = renderUsePolling();

    await advancePolling();

    expect(result.current).toStrictEqual(updatedData);
  });

  it('should keep the current data when a poll returns null', async () => {
    jest.spyOn(fetchPolledData, 'default').mockResolvedValue(null);

    const { result } = renderUsePolling();

    await advancePolling();

    expect(result.current).toStrictEqual(initialData);
  });

  it('should keep the current data when returnedData returns nothing', async () => {
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
});
