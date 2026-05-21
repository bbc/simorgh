import { act, renderHook } from '@testing-library/react';

import { HeadToHeadV2Data } from '#app/components-webcore/SportDataHeader/head-to-head-v2/types';
import useSportDataPolling, { POLLING_INTERVAL } from '.';
import fixtureSportData from './fixture/fixtureSportData';
import fixtureSportDataUpdate from './fixture/fixtureSportDataUpdate';
import * as makeRequest from './makeRequest';

jest.useFakeTimers();

const runPollingInterval = async () => {
  await act(async () => {
    jest.advanceTimersByTime(POLLING_INTERVAL);
    await Promise.resolve();
  });
};

describe('useSportDataPolling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the initial sport data on initialisation', () => {
    const initialSportData = fixtureSportData as unknown as HeadToHeadV2Data;
    const updatedSportData =
      fixtureSportDataUpdate as unknown as HeadToHeadV2Data;

    jest.spyOn(makeRequest, 'default').mockResolvedValue(updatedSportData);

    const { result } = renderHook(() =>
      useSportDataPolling(initialSportData, true),
    );

    const { currentSportData } = result.current;

    expect(currentSportData).toStrictEqual(initialSportData);
  });

  it('should call makeRequest with the sport data urn when polling is enabled', async () => {
    const initialSportData = fixtureSportData as unknown as HeadToHeadV2Data;
    const makeRequestSpy = jest
      .spyOn(makeRequest, 'default')
      .mockResolvedValue(null);

    renderHook(() => useSportDataPolling(initialSportData, true));

    await runPollingInterval();

    expect(makeRequestSpy).toHaveBeenCalledTimes(1);
    expect(makeRequestSpy).toHaveBeenCalledWith(initialSportData.urn);
  });

  it('should not call makeRequest when polling is disabled', async () => {
    const initialSportData = fixtureSportData as unknown as HeadToHeadV2Data;
    const makeRequestSpy = jest
      .spyOn(makeRequest, 'default')
      .mockResolvedValue(null);

    renderHook(() => useSportDataPolling(initialSportData, false));

    await runPollingInterval();

    expect(makeRequestSpy).not.toHaveBeenCalled();
  });

  it('should update current sport data when a poll returns new data', async () => {
    const initialSportData = fixtureSportData as unknown as HeadToHeadV2Data;
    const updatedSportData =
      fixtureSportDataUpdate as unknown as HeadToHeadV2Data;

    jest.spyOn(makeRequest, 'default').mockResolvedValue(updatedSportData);

    const { result } = renderHook(() =>
      useSportDataPolling(initialSportData, true),
    );

    await runPollingInterval();

    expect(result.current.currentSportData).toStrictEqual(updatedSportData);
  });

  it('should keep current sport data when poll returns null', async () => {
    const initialSportData = fixtureSportData as unknown as HeadToHeadV2Data;

    jest.spyOn(makeRequest, 'default').mockResolvedValue(null);

    const { result } = renderHook(() =>
      useSportDataPolling(initialSportData, true),
    );

    await runPollingInterval();

    expect(result.current.currentSportData).toStrictEqual(initialSportData);
  });

  it('should clear the polling interval when unmounted', async () => {
    const initialSportData = fixtureSportData as unknown as HeadToHeadV2Data;
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
