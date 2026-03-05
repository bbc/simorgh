import { act, renderHook } from '@testing-library/react';
import { ComponentProps } from '#nextjs/pages/[service]/live/[id]/LivePageLayout';
import { StreamResponse } from '#nextjs/pages/[service]/live/[id]/Post/types';
import useLivePagePolling, { POLLING_INTERVAL } from '.';
import fixtureData from './fixtureData';
import fixtureDataUpdate from './fixtureDataUpdate';
import * as fakeRequest from './fakeRequest';

jest.useFakeTimers();

describe('useLivePagePolling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the initial stream data on initialisation', () => {
    const initialStreamData = fixtureData.liveTextStream.content?.data;
    jest
      .spyOn(fakeRequest, 'default')
      .mockReturnValue(
        fixtureDataUpdate as unknown as ComponentProps['pageData'],
      );

    const { result } = renderHook(() =>
      useLivePagePolling(initialStreamData, true),
    );
    const { currentStreamData } = result.current;

    expect(currentStreamData).toStrictEqual(initialStreamData);
  });

  it('should set pending update to true when a change in stream data is detected', () => {
    const initialStreamData = fixtureData.liveTextStream.content?.data;
    jest
      .spyOn(fakeRequest, 'default')
      .mockReturnValue(
        fixtureDataUpdate as unknown as ComponentProps['pageData'],
      );

    const { result } = renderHook(() =>
      useLivePagePolling(initialStreamData, true),
    );
    act(() => {
      jest.advanceTimersByTime(POLLING_INTERVAL);
    });
    const { hasPendingUpdate } = result.current;

    expect(hasPendingUpdate).toBe(true);
  });

  it('should update currentStreamData when applyPendingUpdate is called', () => {
    const initialStreamData = fixtureData.liveTextStream.content?.data;
    const updatedStreamData = fixtureDataUpdate.liveTextStream.content?.data;

    jest
      .spyOn(fakeRequest, 'default')
      .mockReturnValue(
        fixtureDataUpdate as unknown as ComponentProps['pageData'],
      );

    const { result } = renderHook(() =>
      useLivePagePolling(initialStreamData, true),
    );

    act(() => {
      jest.advanceTimersByTime(POLLING_INTERVAL);
    });
    const { applyPendingUpdate } = result.current;

    act(() => {
      applyPendingUpdate();
    });
    const { currentStreamData } = result.current;

    expect(currentStreamData).toStrictEqual(updatedStreamData);
  });

  it('should not poll if the user is not on the first page', () => {
    const initialStreamData = {
      ...fixtureData.liveTextStream.content?.data,
      page: {
        index: 2,
      },
    };

    const requestSpy = jest
      .spyOn(fakeRequest, 'default')
      .mockReturnValue(
        fixtureDataUpdate as unknown as ComponentProps['pageData'],
      );

    renderHook(() =>
      useLivePagePolling(
        initialStreamData as unknown as StreamResponse['data'],
        true,
      ),
    );

    act(() => {
      jest.advanceTimersByTime(POLLING_INTERVAL);
    });

    expect(requestSpy).not.toHaveBeenCalled();
  });
});
