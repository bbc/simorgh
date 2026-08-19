import { act, renderHook } from '@testing-library/react';
import * as fetchPolledData from '#app/lib/utilities/fetchPolledData';
import usePolling, { POLLING_INTERVAL } from '#app/hooks/usePolling';
import { StreamResponse } from './Post/types';
import livePageData from './fixture/livePageData';
import streamDataUpdate from './fixture/streamDataUpdate';

jest.useFakeTimers();

type StreamData = StreamResponse['data'] | null;

const initialStreamData = livePageData.liveTextStream.content
  ?.data as StreamResponse['data'];

const advancePolling = async () => {
  await act(async () => {
    jest.advanceTimersByTime(POLLING_INTERVAL);
    await Promise.resolve();
  });
};

const renderLivePagePolling = ({
  streamData = initialStreamData,
  enableFeature = true,
  isLive = true,
}: {
  streamData?: StreamResponse['data'];
  enableFeature?: boolean;
  isLive?: boolean;
} = {}) =>
  renderHook(() =>
    usePolling<StreamResponse['data'], StreamData>({
      initialData: streamData,
      enabled: enableFeature && isLive && streamData?.page?.index === 1,
      endpoint: 'live',
      params: { liveTextStreamId: 'stream-id', type: 'curated' },
      returnedData: response =>
        response?.results && response.results.length > 0 ? response : null,
    }),
  );

describe('LivePageLayout live text polling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the initial stream data on initialisation', () => {
    jest.spyOn(fetchPolledData, 'default').mockResolvedValue(null);

    const { result } = renderLivePagePolling();

    expect(result.current).toStrictEqual(initialStreamData);
  });

  it('should poll the live endpoint with the stream params when enabled', async () => {
    const fetchSpy = jest
      .spyOn(fetchPolledData, 'default')
      .mockResolvedValue(null);

    renderLivePagePolling();

    await advancePolling();

    expect(fetchSpy).toHaveBeenCalledWith('live', {
      params: { liveTextStreamId: 'stream-id', type: 'curated' },
    });
  });

  it('should update the stream data when a poll returns new posts', async () => {
    jest.spyOn(fetchPolledData, 'default').mockResolvedValue({
      data: streamDataUpdate,
      status: 200,
    });

    const { result } = renderLivePagePolling();

    await advancePolling();

    expect(result.current).toStrictEqual(streamDataUpdate);
  });

  it('should not poll if the user is not on the first page', async () => {
    const fetchSpy = jest
      .spyOn(fetchPolledData, 'default')
      .mockResolvedValue(null);

    renderLivePagePolling({
      streamData: {
        ...initialStreamData,
        page: { index: 2 },
      } as StreamResponse['data'],
    });

    await advancePolling();

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('should not poll when the live page polling feature is disabled', async () => {
    const fetchSpy = jest
      .spyOn(fetchPolledData, 'default')
      .mockResolvedValue(null);

    renderLivePagePolling({ enableFeature: false });

    await advancePolling();

    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
