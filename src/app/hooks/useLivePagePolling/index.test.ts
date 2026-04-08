import { act, renderHook } from '@testing-library/react';
import { ComponentProps } from '#nextjs/pages/[service]/live/[id]/LivePageLayout';
import useLivePagePolling, { POLLING_INTERVAL } from '.';
import fixtureLivePageData from './fixture/fixtureLivePageData';
import fixtureLivePageDataUpdate from './fixture/fixtureStreamDataUpdate';
import * as makeRequest from './makeRequest/makeRequest';

jest.useFakeTimers();

jest.mock('uuid', () => ({ v4: () => '00000000-0000-0000-0000-000000000000' }));

describe('useLivePagePolling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the initial stream data on initialisation', () => {
    const initialPageData =
      fixtureLivePageData as unknown as ComponentProps['pageData'];

    jest
      .spyOn(makeRequest, 'default')
      .mockResolvedValue(fixtureLivePageDataUpdate);

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
      .mockResolvedValue(fixtureLivePageDataUpdate);

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
      .mockResolvedValue(fixtureLivePageDataUpdate);

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
      .mockResolvedValue(fixtureLivePageDataUpdate);

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

    jest
      .spyOn(makeRequest, 'default')
      .mockResolvedValue(fixtureLivePageData.liveTextStream.content.data);

    const { result } = renderHook(() =>
      useLivePagePolling(initialPageData, true),
    );

    await act(async () => {
      jest.advanceTimersByTime(POLLING_INTERVAL);
    });

    const { hasPendingUpdate } = result.current;

    expect(hasPendingUpdate).toBe(false);
  });
});
