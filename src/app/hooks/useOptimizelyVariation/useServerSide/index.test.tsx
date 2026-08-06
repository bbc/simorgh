import { PropsWithChildren } from 'react';
import { renderHook } from '@testing-library/react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import { OptimizelyProvider, ReactSDKClient } from '@optimizely/react-sdk';
import {
  PageTypes,
  ServerSideExperiment,
  Services,
} from '#app/models/types/global';
import useServerSide from '.';
import * as activateExperiment from '../activateExperiment';

const spyActivateExperiment = jest
  .spyOn(activateExperiment, 'default')
  .mockImplementation(jest.fn());

const optimizely = {
  setUser: jest.fn(() => Promise.resolve()),
};

describe('useOptimizelyVariation - useServerSide', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderUseServerSide = (params: {
    experimentName: string;
    serverSideExperiments?: ServerSideExperiment[];
    withOptimizely?: boolean;
  }) => {
    const {
      experimentName,
      serverSideExperiments,
      withOptimizely = true,
    } = params;

    const props = {
      serverSideExperiments,
      isAmp: false,
      pageType: 'STY' as PageTypes,
      service: 'news' as Services,
      pathname: 'bar',
    };
    const wrapper = ({ children }: PropsWithChildren) => {
      const providers = (
        <ToggleContextProvider toggles={{ eventTracking: { enabled: true } }}>
          <ServiceContextProvider service="news">
            <RequestContextProvider {...props}>
              <EventTrackingContextProvider>
                {children}
              </EventTrackingContextProvider>
            </RequestContextProvider>
          </ServiceContextProvider>
        </ToggleContextProvider>
      );

      return withOptimizely ? (
        <OptimizelyProvider
          optimizely={optimizely as unknown as ReactSDKClient}
          isServerSide
        >
          {providers}
        </OptimizelyProvider>
      ) : (
        providers
      );
    };
    return renderHook(() => useServerSide(experimentName), {
      wrapper,
    });
  };

  it('should return null if optimizely is not defined', () => {
    const { result } = renderUseServerSide({
      experimentName: 'foo',
      withOptimizely: false,
    });
    expect(result.current).toEqual(null);
  });

  it('should return null if mvtExperiments is falsy', () => {
    const { result } = renderUseServerSide({
      serverSideExperiments: undefined,
      experimentName: 'foo',
    });
    expect(result.current).toEqual(null);
  });

  it('should return null if mvtExperiments is an empty array', () => {
    const { result } = renderUseServerSide({
      serverSideExperiments: [],
      experimentName: 'foo',
    });
    expect(result.current).toEqual(null);
  });

  it('should return null if given experiment is not in array', () => {
    const mockServerSideExperiments = [
      {
        experimentName: 'foo',
        variation: 'control',
        enabled: true,
      },
    ];
    const { result } = renderUseServerSide({
      serverSideExperiments:
        mockServerSideExperiments as ServerSideExperiment[],
      experimentName: 'bar',
    });
    expect(result.current).toEqual(null);
  });

  it('should return a variation when the experiment is enabled', () => {
    const mockServerSideExperiments = [
      {
        experimentName: 'foo',
        variation: 'control',
        enabled: true,
      },
    ];

    const { result } = renderUseServerSide({
      serverSideExperiments:
        mockServerSideExperiments as ServerSideExperiment[],
      experimentName: 'foo',
    });
    expect(result.current).toEqual('control');
  });

  it('should return null when the experiment is not enabled', () => {
    const mockServerSideExperiments = [
      {
        experimentName: 'foo',
        variation: 'control',
        enabled: false,
      },
    ];

    const { result } = renderUseServerSide({
      serverSideExperiments:
        mockServerSideExperiments as ServerSideExperiment[],
      experimentName: 'foo',
    });
    expect(result.current).toBeFalsy();
  });

  it('should return null when the experiment variation is string "false"', () => {
    const mockServerSideExperiments = [
      {
        experimentName: 'foo',
        variation: 'false',
        enabled: true,
      },
    ];

    const { result } = renderUseServerSide({
      serverSideExperiments:
        mockServerSideExperiments as ServerSideExperiment[],
      experimentName: 'foo',
    });
    expect(result.current).toBeNull();
  });

  it('should return null when the experiment variation is boolean "false"', () => {
    const mockServerSideExperiments = [
      {
        experimentName: 'foo',
        variation: false,
        enabled: true,
      },
    ];

    const { result } = renderUseServerSide({
      serverSideExperiments:
        mockServerSideExperiments as unknown as ServerSideExperiment[],
      experimentName: 'foo',
    });
    expect(result.current).toBeNull();
  });

  it('should call activate experiment (via useEffect) if experiment is enabled', async () => {
    const mockServerSideExperiments = [
      {
        experimentName: 'foo',
        variation: 'control',
        enabled: true,
      },
    ];

    await act(async () => {
      renderUseServerSide({
        serverSideExperiments:
          mockServerSideExperiments as ServerSideExperiment[],
        experimentName: 'foo',
      });
    });

    expect(spyActivateExperiment).toHaveBeenCalledTimes(1);
  });

  it('should not call activate experiment if experiment is disabled', async () => {
    const mockServerSideExperiments = [
      {
        experimentName: 'foo',
        variation: 'control',
        enabled: false,
      },
    ];

    await act(async () => {
      renderUseServerSide({
        serverSideExperiments:
          mockServerSideExperiments as ServerSideExperiment[],
        experimentName: 'foo',
      });
    });

    expect(spyActivateExperiment).not.toHaveBeenCalled();
  });

  it('should not re-activate the experiment on rerender', () => {
    const { rerender } = renderUseServerSide({
      serverSideExperiments: [
        { experimentName: 'foo', variation: 'control', enabled: true },
      ] as ServerSideExperiment[],
      experimentName: 'foo',
    });

    expect(spyActivateExperiment).toHaveBeenCalledTimes(1);

    rerender();
    rerender();

    expect(spyActivateExperiment).toHaveBeenCalledTimes(1);
  });
});
