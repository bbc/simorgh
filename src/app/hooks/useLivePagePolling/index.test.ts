import { act, renderHook } from '@testing-library/react';
import { ComponentProps } from '#nextjs/pages/[service]/live/[id]/LivePageLayout';
import useLivePagePolling, { POLLING_INTERVAL } from '.';
import fixtureLivePageData from './fixture/fixtureLivePageData';
import fixtureLivePageDataUpdate from './fixture/fixtureStreamDataUpdate';
import * as fetchPolledData from '#app/lib/utilities/fetchPolledData';

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
      .spyOn(fetchPolledData, 'default')
      .mockResolvedValue({
        data: fixtureLivePageDataUpdate,
        status: 200,
      });

    const { result } = renderHook(() =>
      useLivePagePolling(initialPageData, true),
    );

    const { polledStreamData } = result.current;

    expect(polledStreamData).toStrictEqual(
      initialPageData.liveTextStream.content?.data,
    );
  });

  it('should update polledStreamData when new data is polled', async () => {
    const initialPageData =
      fixtureLivePageData as unknown as ComponentProps['pageData'];

    jest
      .spyOn(fetchPolledData, 'default')
      .mockResolvedValue({
        data: fixtureLivePageDataUpdate,
        status: 200,
      });

    const { result } = renderHook(() =>
      useLivePagePolling(initialPageData, true),
    );

    await act(async () => {
      jest.advanceTimersByTime(POLLING_INTERVAL);
    });

    const { polledStreamData } = result.current;

    expect(polledStreamData).toStrictEqual(fixtureLivePageDataUpdate);
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
      .spyOn(fetchPolledData, 'default')
      .mockResolvedValue({
        data: fixtureLivePageDataUpdate,
        status: 200,
      });

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

  it('should not poll when the feature is disabled', async () => {
    const initialPageData =
      fixtureLivePageData as unknown as ComponentProps['pageData'];

    const requestSpy = jest
      .spyOn(fetchPolledData, 'default')
      .mockResolvedValue({
        data: fixtureLivePageDataUpdate,
        status: 200,
      });

    renderHook(() => useLivePagePolling(initialPageData, false));

    await act(async () => {
      jest.advanceTimersByTime(POLLING_INTERVAL);
    });

    expect(requestSpy).not.toHaveBeenCalled();
  });
});
