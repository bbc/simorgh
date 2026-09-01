import { PropsWithChildren } from 'react';
import { act } from '@testing-library/react';
import { OptimizelyProvider, ReactSDKClient } from '@optimizely/react-sdk';
import {
  renderHook,
  AllTheProviders,
} from '#app/components/react-testing-library-with-providers';
import { ServerSideExperiment } from '#app/models/types/global';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
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

    const wrapper = ({ children }: PropsWithChildren) => {
      const providers = (
        // HOME_PAGE avoids ReverbParamsContext's article ATI enrichment, which calls client-side Optimizely
        <AllTheProviders
          service="news"
          pageType={HOME_PAGE}
          pathname="bar"
          isAmp={false}
          toggles={{ eventTracking: { enabled: true } }}
          serverSideExperiments={serverSideExperiments}
        >
          {children}
        </AllTheProviders>
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

  it('should not re-activate the experiment on rerender', async () => {
    let rerender: (() => void) | undefined;

    await act(async () => {
      ({ rerender } = renderUseServerSide({
        serverSideExperiments: [
          { experimentName: 'foo', variation: 'control', enabled: true },
        ] as ServerSideExperiment[],
        experimentName: 'foo',
      }));
    });

    expect(spyActivateExperiment).toHaveBeenCalledTimes(1);

    await act(async () => {
      rerender?.();
    });
    await act(async () => {
      rerender?.();
    });

    expect(spyActivateExperiment).toHaveBeenCalledTimes(1);
  });
});
