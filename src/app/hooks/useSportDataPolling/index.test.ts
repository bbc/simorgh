import { act, renderHook } from '@testing-library/react';
import { HeadToHeadV2Data } from '#app/components-webcore/SportDataHeader/head-to-head-v2/types';
import useSportDataPolling, { POLLING_INTERVAL } from '.';
import fixtureSportData from './fixture/fixtureSportData';
import fixtureSportDataUpdate from './fixture/fixtureSportDataUpdate';
import * as makeRequest from './makeRequest';
import { SportDataPollingResponse } from './types';

jest.useFakeTimers();

const runPollingInterval = async () => {
  await act(async () => {
    jest.advanceTimersByTime(POLLING_INTERVAL);
    await Promise.resolve();
  });
};

describe('useSportDataPolling', () => {
  const initialSportData =
    fixtureSportData.data.sportDataEvent as unknown as HeadToHeadV2Data;
  const updatedSportData =
    fixtureSportDataUpdate.data.sportDataEvent as unknown as HeadToHeadV2Data;
  const updatedSportPollingResponse =
    fixtureSportDataUpdate as unknown as SportDataPollingResponse;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the initial sport data on initialisation', () => {
    jest
      .spyOn(makeRequest, 'default')
      .mockResolvedValue(updatedSportPollingResponse);

    const { result } = renderHook(() =>
      useSportDataPolling(initialSportData, true),
    );

    const { currentSportData } = result.current;

    expect(currentSportData).toStrictEqual(initialSportData);
  });

  it('should call makeRequest with the sport data urn when polling is enabled', async () => {
    const makeRequestSpy = jest
      .spyOn(makeRequest, 'default')
      .mockResolvedValue(null);

    renderHook(() => useSportDataPolling(initialSportData, true));

    await runPollingInterval();

    expect(makeRequestSpy).toHaveBeenCalledTimes(1);
    expect(makeRequestSpy).toHaveBeenCalledWith(initialSportData.urn);
  });

  it('should not call makeRequest when polling is disabled', async () => {
    const makeRequestSpy = jest
      .spyOn(makeRequest, 'default')
      .mockResolvedValue(null);

    renderHook(() => useSportDataPolling(initialSportData, false));

    await runPollingInterval();

    expect(makeRequestSpy).not.toHaveBeenCalled();
  });

  it('should update current sport data when a poll returns new data', async () => {
    jest
      .spyOn(makeRequest, 'default')
      .mockResolvedValue(updatedSportPollingResponse);

    const { result } = renderHook(() =>
      useSportDataPolling(initialSportData, true),
    );

    await runPollingInterval();

    expect(result.current.currentSportData).toStrictEqual(updatedSportData);
  });

  it('should keep current sport data when poll returns null', async () => {
    jest.spyOn(makeRequest, 'default').mockResolvedValue(null);

    const { result } = renderHook(() =>
      useSportDataPolling(initialSportData, true),
    );

    await runPollingInterval();

    expect(result.current.currentSportData).toStrictEqual(initialSportData);
  });

  it('should clear the polling interval when unmounted', async () => {
    const makeRequestSpy = jest
      .spyOn(makeRequest, 'default')
      .mockResolvedValue(null);

    const { unmount } = renderHook(() =>
      useSportDataPolling(initialSportData, true),
    );

    unmount();

    await runPollingInterval();

    expect(makeRequestSpy).not.toHaveBeenCalled();
  });
});
