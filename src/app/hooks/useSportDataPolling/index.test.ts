import { act, renderHook } from '@testing-library/react';
import { HeadToHeadV2Data } from '#app/components-webcore/SportDataHeader/head-to-head-v2/types';
import useSportDataPolling, { POLLING_INTERVAL } from '.';
import fixtureSportData from './fixture/fixtureSportData';
import fixtureSportDataUpdate from './fixture/fixtureSportDataUpdate';
import * as makeRequest from './makeRequest/makeRequest';

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

  it('should return the initial sports data on initialisation', () => {
    const initialSportsData = fixtureSportData as unknown as HeadToHeadV2Data;
    const updatedSportsData =
      fixtureSportDataUpdate as unknown as HeadToHeadV2Data;

    jest.spyOn(makeRequest, 'default').mockResolvedValue(updatedSportsData);

    const { result } = renderHook(() =>
      useSportDataPolling(initialSportsData, true),
    );

    const { currentSportData } = result.current;

    expect(currentSportData).toStrictEqual(initialSportsData);
  });

  it('should call makeRequest with the sport data urn when polling is enabled', async () => {
    const initialSportsData = fixtureSportData as unknown as HeadToHeadV2Data;
    const makeRequestSpy = jest
      .spyOn(makeRequest, 'default')
      .mockResolvedValue(null);

    renderHook(() => useSportDataPolling(initialSportsData, true));

    await runPollingInterval();

    expect(makeRequestSpy).toHaveBeenCalledTimes(1);
    expect(makeRequestSpy).toHaveBeenCalledWith(initialSportsData.urn);
  });

  it('should not call makeRequest when polling is disabled', async () => {
    const initialSportsData = fixtureSportData as unknown as HeadToHeadV2Data;
    const makeRequestSpy = jest
      .spyOn(makeRequest, 'default')
      .mockResolvedValue(null);

    renderHook(() => useSportDataPolling(initialSportsData, false));

    await runPollingInterval();

    expect(makeRequestSpy).not.toHaveBeenCalled();
  });

  it('should update current sport data when a poll returns new data', async () => {
    const initialSportsData = fixtureSportData as unknown as HeadToHeadV2Data;
    const updatedSportsData =
      fixtureSportDataUpdate as unknown as HeadToHeadV2Data;

    jest.spyOn(makeRequest, 'default').mockResolvedValue(updatedSportsData);

    const { result } = renderHook(() =>
      useSportDataPolling(initialSportsData, true),
    );

    await runPollingInterval();

    expect(result.current.currentSportData).toStrictEqual(updatedSportsData);
  });

  it('should keep current sport data when poll returns null', async () => {
    const initialSportsData = fixtureSportData as unknown as HeadToHeadV2Data;

    jest.spyOn(makeRequest, 'default').mockResolvedValue(null);

    const { result } = renderHook(() =>
      useSportDataPolling(initialSportsData, true),
    );

    await runPollingInterval();

    expect(result.current.currentSportData).toStrictEqual(initialSportsData);
  });

  it('should clear the polling interval when unmounted', async () => {
    const initialSportsData = fixtureSportData as unknown as HeadToHeadV2Data;
    const makeRequestSpy = jest
      .spyOn(makeRequest, 'default')
      .mockResolvedValue(null);

    const { unmount } = renderHook(() =>
      useSportDataPolling(initialSportsData, true),
    );

    unmount();

    await runPollingInterval();

    expect(makeRequestSpy).not.toHaveBeenCalled();
  });
});
