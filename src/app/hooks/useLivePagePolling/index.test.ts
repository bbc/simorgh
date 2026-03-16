import { act, renderHook } from '@testing-library/react';
import { ComponentProps } from '#nextjs/pages/[service]/live/[id]/LivePageLayout';
import useLivePagePolling, { POLLING_INTERVAL } from '.';
import fixtureData from './fixtureData';
import fixtureDataUpdate from './fixtureDataUpdate';
import * as fakeRequest from './makeRequest';

jest.useFakeTimers();

describe('useLivePagePolling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the initial stream data on initialisation', () => {
    const initialPageData =
      fixtureData as unknown as ComponentProps['pageData'];

    jest
      .spyOn(fakeRequest, 'default')
      .mockResolvedValue(fixtureDataUpdate.liveTextStream.content.data);

    const { result } = renderHook(() =>
      useLivePagePolling(initialPageData, true),
    );

    const { currentStreamData } = result.current;

    expect(currentStreamData).toStrictEqual(
      initialPageData.liveTextStream.content?.data,
    );
  });

  it('should set pending update to true when a change in stream data is detected', async () => {
    const initialPageData =
      fixtureData as unknown as ComponentProps['pageData'];

    jest
      .spyOn(fakeRequest, 'default')
      .mockResolvedValue(fixtureDataUpdate.liveTextStream.content.data);

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
      fixtureData as unknown as ComponentProps['pageData'];

    const updatedStreamData = fixtureDataUpdate.liveTextStream.content?.data;

    jest
      .spyOn(fakeRequest, 'default')
      .mockResolvedValue(fixtureDataUpdate.liveTextStream.content.data);

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

    expect(currentStreamData).toStrictEqual(updatedStreamData);
  });

  it('should not poll if the user is not on the first page', async () => {
    const initialStreamData = {
      ...fixtureData.liveTextStream.content?.data,
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
      .spyOn(fakeRequest, 'default')
      .mockResolvedValue(fixtureDataUpdate.liveTextStream.content.data);

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
});
