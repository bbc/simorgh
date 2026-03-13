import { PropsWithChildren } from 'react';
import { renderHook } from '@testing-library/react-hooks/server';
import { RequestContextProvider } from '#contexts/RequestContext';
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
  }) => {
    const { experimentName, serverSideExperiments } = params;

    const props = {
      serverSideExperiments,
      isAmp: false,
      pageType: 'STY' as PageTypes,
      service: 'news' as Services,
      pathname: 'bar',
    };
    const wrapper = ({ children }: PropsWithChildren) => (
      <OptimizelyProvider
        optimizely={optimizely as unknown as ReactSDKClient}
        isServerSide
      >
        <RequestContextProvider {...props}>{children}</RequestContextProvider>
      </OptimizelyProvider>
    );
    return renderHook(() => useServerSide(experimentName), {
      wrapper,
    }).result.current;
  };

  it('should return null if optimizely is not defined', () => {
    const { result } = renderHook(() => useServerSide('foo'));
    expect(result.current).toEqual(null);
  });

  it('should return null if mvtExperiments is falsy', () => {
    const result = renderUseServerSide({
      serverSideExperiments: undefined,
      experimentName: 'foo',
    });
    expect(result).toEqual(null);
  });

  it('should return null if mvtExperiments is an empty array', () => {
    const result = renderUseServerSide({
      serverSideExperiments: [],
      experimentName: 'foo',
    });
    expect(result).toEqual(null);
  });

  it('should return null if given experiment is not in array', () => {
    const mockServerSideExperiments = [
      {
        experimentName: 'foo',
        variation: 'control',
        enabled: true,
      },
    ];
    const result = renderUseServerSide({
      serverSideExperiments:
        mockServerSideExperiments as ServerSideExperiment[],
      experimentName: 'bar',
    });
    expect(result).toEqual(null);
  });

  it('should return a variation when the experiment is enabled', () => {
    const mockServerSideExperiments = [
      {
        experimentName: 'foo',
        variation: 'control',
        enabled: true,
      },
    ];

    const result = renderUseServerSide({
      serverSideExperiments:
        mockServerSideExperiments as ServerSideExperiment[],
      experimentName: 'foo',
    });
    expect(result).toEqual('control');
  });

  it('should return null when the experiment is not enabled', () => {
    const mockServerSideExperiments = [
      {
        experimentName: 'foo',
        variation: 'control',
        enabled: false,
      },
    ];

    const result = renderUseServerSide({
      serverSideExperiments:
        mockServerSideExperiments as ServerSideExperiment[],
      experimentName: 'foo',
    });
    expect(result).toBeFalsy();
  });

  it('should return null when the experiment variation is string "false"', () => {
    const mockServerSideExperiments = [
      {
        experimentName: 'foo',
        variation: 'false',
        enabled: true,
      },
    ];

    const result = renderUseServerSide({
      serverSideExperiments:
        mockServerSideExperiments as ServerSideExperiment[],
      experimentName: 'foo',
    });
    expect(result).toBeNull();
  });

  it('should return null when the experiment variation is boolean "false"', () => {
    const mockServerSideExperiments = [
      {
        experimentName: 'foo',
        variation: false,
        enabled: true,
      },
    ];

    const result = renderUseServerSide({
      serverSideExperiments:
        mockServerSideExperiments as unknown as ServerSideExperiment[],
      experimentName: 'foo',
    });
    expect(result).toBeNull();
  });

  it('should call activate experiment if experiment is enabled', () => {
    const mockServerSideExperiments = [
      {
        experimentName: 'foo',
        variation: 'control',
        enabled: true,
      },
    ];

    renderUseServerSide({
      serverSideExperiments:
        mockServerSideExperiments as ServerSideExperiment[],
      experimentName: 'foo',
    });
    expect(spyActivateExperiment).toHaveBeenCalled();
  });

  it('should not call activate experiment if experiment is disabled', () => {
    const mockServerSideExperiments = [
      {
        experimentName: 'foo',
        variation: 'control',
        enabled: false,
      },
    ];

    renderUseServerSide({
      serverSideExperiments:
        mockServerSideExperiments as ServerSideExperiment[],
      experimentName: 'foo',
    });
    expect(spyActivateExperiment).not.toHaveBeenCalled();
  });
});
