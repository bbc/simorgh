import { act, renderHook } from '@testing-library/react';
import * as fetchPolledData from '#app/lib/utilities/fetchPolledData';
import usePolling, { POLLING_INTERVAL } from '#app/hooks/usePolling';
import { HeadToHeadV2Data } from '../types';
import sportData from '../fixture/sportData';
import sportDataUpdate from '../fixture/sportDataUpdate';

jest.useFakeTimers();

const initialSportData = sportData.data
  .sportDataEvent as unknown as HeadToHeadV2Data;
const updatedSportData = sportDataUpdate.data
  .sportDataEvent as unknown as HeadToHeadV2Data;

const advancePolling = async () => {
  await act(async () => {
    jest.advanceTimersByTime(POLLING_INTERVAL);
    await Promise.resolve();
  });
};

const renderSportDataPolling = (enabled = true) =>
  renderHook(() =>
    usePolling<{ sportDataEvent: HeadToHeadV2Data }, HeadToHeadV2Data>({
      initialData: initialSportData,
      enabled,
      endpoint: 'sport',
      params: { sportDataEventUrn: initialSportData.urn },
      returnedData: response => response.sportDataEvent,
    }),
  );

describe('head-to-head-v2 sport data polling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the initial sport data on initialisation', () => {
    jest.spyOn(fetchPolledData, 'default').mockResolvedValue(null);

    const { result } = renderSportDataPolling();

    expect(result.current).toStrictEqual(initialSportData);
  });

  it('should poll the sport endpoint with the encoded event urn when enabled', async () => {
    const fetchSpy = jest
      .spyOn(fetchPolledData, 'default')
      .mockResolvedValue(null);

    renderSportDataPolling(true);

    await advancePolling();

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith('sport', {
      params: { sportDataEventUrn: initialSportData.urn },
    });
  });

  it('should not fetch data when polling is disabled', async () => {
    const fetchSpy = jest
      .spyOn(fetchPolledData, 'default')
      .mockResolvedValue(null);

    renderSportDataPolling(false);

    await advancePolling();

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('should update sport data when new data is returned after polling', async () => {
    jest.spyOn(fetchPolledData, 'default').mockResolvedValue({
      data: { sportDataEvent: updatedSportData },
      status: 200,
    });

    const { result } = renderSportDataPolling();

    await advancePolling();

    expect(result.current).toStrictEqual(updatedSportData);
  });

  it('should keep the current sport data when no data is returned after polling', async () => {
    jest.spyOn(fetchPolledData, 'default').mockResolvedValue(null);

    const { result } = renderSportDataPolling();

    await advancePolling();

    expect(result.current).toStrictEqual(initialSportData);
  });

  it('should clear the polling interval when unmounted', async () => {
    const fetchSpy = jest
      .spyOn(fetchPolledData, 'default')
      .mockResolvedValue(null);

    const { unmount } = renderSportDataPolling();

    unmount();

    await advancePolling();

    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
