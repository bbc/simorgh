import { act, renderHook } from '@testing-library/react';
import { ComponentProps } from '#nextjs/pages/[service]/live/[id]/LivePageLayout';
import useLivePagePolling, { POLLING_INTERVAL } from '.';
import fixtureLivePageData from './fixture/fixtureLivePageData';
import fixtureLivePageDataUpdate from './fixture/fixtureStreamDataUpdate';
import * as makeRequest from './makeRequest/makeRequest';
import * as useCustomEventTrackerModule from '../useCustomEventTracker';

jest.useFakeTimers();

jest.mock('uuid', () => ({ v4: () => '00000000-0000-0000-0000-000000000000' }));

const mockTrackEvent = jest.fn();
const mockUseCustomEventTracker = jest.spyOn(
  useCustomEventTrackerModule,
  'default',
);
mockUseCustomEventTracker.mockReturnValue(mockTrackEvent);

describe('useLivePagePolling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the initial stream data on initialisation', () => {
    const initialPageData =
      fixtureLivePageData as unknown as ComponentProps['pageData'];

    jest
      .spyOn(makeRequest, 'default')
      .mockResolvedValue({ data: fixtureLivePageDataUpdate, statusCode: 200 });

    const { result } = renderHook(() =>
      useLivePagePolling(initialPageData, true),
    );

    const { currentStreamData } = result.current;

    expect(currentStreamData).toStrictEqual(
      initialPageData.liveTextStream.content?.data,
    );
  });

  it('should set pending update to true when a change in urn for the first post is detected', async () => {
    const initialPageData =
      fixtureLivePageData as unknown as ComponentProps['pageData'];

    jest
      .spyOn(makeRequest, 'default')
      .mockResolvedValue({ data: fixtureLivePageDataUpdate, statusCode: 200 });

    const { result } = renderHook(() =>
      useLivePagePolling(initialPageData, true),
    );

    await act(async () => {
      jest.advanceTimersByTime(POLLING_INTERVAL);
    });

    const { hasPendingUpdate } = result.current;

    expect(hasPendingUpdate).toBe(true);
  });

  it('should update currentStreamData when applyPendingUpdate is called', async () => {
    const initialPageData =
      fixtureLivePageData as unknown as ComponentProps['pageData'];

    jest
      .spyOn(makeRequest, 'default')
      .mockResolvedValue({ data: fixtureLivePageDataUpdate, statusCode: 200 });

    const { result } = renderHook(() =>
      useLivePagePolling(initialPageData, true),
    );

    await act(async () => {
      jest.advanceTimersByTime(POLLING_INTERVAL);
    });
    const { applyPendingUpdate } = result.current;

    act(() => {
      applyPendingUpdate();
    });
    const { currentStreamData } = result.current;

    expect(currentStreamData).toStrictEqual(fixtureLivePageDataUpdate);
  });

  it('should not poll if the user is not on the first page', async () => {
    const initialStreamData = {
      ...fixtureLivePageData.liveTextStream.content?.data,
      page: {
        index: 2,
      },
    };

    const initialPageData = {
      liveTextStream: {
        content: {
          data: initialStreamData,
        },
      },
    };

    const requestSpy = jest
      .spyOn(makeRequest, 'default')
      .mockResolvedValue({ data: fixtureLivePageDataUpdate, statusCode: 200 });

    renderHook(() =>
      useLivePagePolling(
        initialPageData as unknown as ComponentProps['pageData'],
        true,
      ),
    );

    await act(async () => {
      jest.advanceTimersByTime(POLLING_INTERVAL);
    });

    expect(requestSpy).not.toHaveBeenCalled();
  });

  it('should set pending update to false when there is no change in urn for the first post', async () => {
    const initialPageData =
      fixtureLivePageData as unknown as ComponentProps['pageData'];

    jest.spyOn(makeRequest, 'default').mockResolvedValue({
      data: fixtureLivePageData.liveTextStream.content.data,
      statusCode: 200,
    });

    const { result } = renderHook(() =>
      useLivePagePolling(initialPageData, true),
    );

    await act(async () => {
      jest.advanceTimersByTime(POLLING_INTERVAL);
    });

    const { hasPendingUpdate } = result.current;

    expect(hasPendingUpdate).toBe(false);
  });

  it('should initialize useCustomEventTracker with the correct event name', () => {
    const initialPageData =
      fixtureLivePageData as unknown as ComponentProps['pageData'];

    jest
      .spyOn(makeRequest, 'default')
      .mockResolvedValue({ data: fixtureLivePageDataUpdate, statusCode: 200 });

    renderHook(() => useLivePagePolling(initialPageData, true));

    expect(mockUseCustomEventTracker).toHaveBeenCalledWith({
      eventName: 'live_refresh_poll_response',
    });
  });

  it('should send a tracking event with status_code, has_new_content, page_id and time_since_last_poll', async () => {
    const initialPageData =
      fixtureLivePageData as unknown as ComponentProps['pageData'];

    jest
      .spyOn(makeRequest, 'default')
      .mockResolvedValue({ data: fixtureLivePageDataUpdate, statusCode: 200 });

    jest.spyOn(Math, 'random').mockReturnValue(0.1);

    renderHook(() => useLivePagePolling(initialPageData, true));

    await act(async () => {
      jest.advanceTimersByTime(POLLING_INTERVAL);
    });

    expect(mockTrackEvent).toHaveBeenCalledWith(
      expect.stringContaining('"status_code":200'),
    );
    expect(mockTrackEvent).toHaveBeenCalledWith(
      expect.stringContaining('"has_new_content":true'),
    );
    expect(mockTrackEvent).toHaveBeenCalledWith(
      expect.stringContaining('"page_id":"8E1A80B519D1451FBF5DF6AB029B8B1C"'),
    );
    expect(mockTrackEvent).toHaveBeenCalledWith(
      expect.stringContaining('"time_since_last_poll"'),
    );

    jest.spyOn(Math, 'random').mockRestore();
  });

  it('should not send a tracking event when outside the sample rate', async () => {
    const initialPageData =
      fixtureLivePageData as unknown as ComponentProps['pageData'];

    jest
      .spyOn(makeRequest, 'default')
      .mockResolvedValue({ data: fixtureLivePageDataUpdate, statusCode: 200 });

    jest.spyOn(Math, 'random').mockReturnValue(0.9);

    renderHook(() => useLivePagePolling(initialPageData, true));

    await act(async () => {
      jest.advanceTimersByTime(POLLING_INTERVAL);
    });

    expect(mockTrackEvent).not.toHaveBeenCalled();

    jest.spyOn(Math, 'random').mockRestore();
  });

  it('should return newPostCount when new content is detected', async () => {
    const initialPageData =
      fixtureLivePageData as unknown as ComponentProps['pageData'];

    jest
      .spyOn(makeRequest, 'default')
      .mockResolvedValue({ data: fixtureLivePageDataUpdate, statusCode: 200 });

    const { result } = renderHook(() =>
      useLivePagePolling(initialPageData, true),
    );

    await act(async () => {
      jest.advanceTimersByTime(POLLING_INTERVAL);
    });

    expect(result.current.newPostCount).toBeGreaterThanOrEqual(1);
  });

  it('should reset newPostCount to null after applyPendingUpdate is called', async () => {
    const initialPageData =
      fixtureLivePageData as unknown as ComponentProps['pageData'];

    jest
      .spyOn(makeRequest, 'default')
      .mockResolvedValue({ data: fixtureLivePageDataUpdate, statusCode: 200 });

    const { result } = renderHook(() =>
      useLivePagePolling(initialPageData, true),
    );

    await act(async () => {
      jest.advanceTimersByTime(POLLING_INTERVAL);
    });

    act(() => {
      result.current.applyPendingUpdate();
    });

    expect(result.current.newPostCount).toBeNull();
  });
});
