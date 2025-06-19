import { OptimizelyProvider, ReactSDKClient } from '@optimizely/react-sdk';
import { MvtExperiment, PageTypes, Services } from '#app/models/types/global';
import { renderHook } from '@testing-library/react';
import * as React from 'react';
import { act, PropsWithChildren } from 'react';
import useServerSide from '.';
import * as activateExperiment from '../activateExperiment';

const spyActivateExperiment = jest
  .spyOn(activateExperiment, 'default')
  .mockImplementation(jest.fn());

const optimizely = {
  setUser: jest.fn(() => Promise.resolve()),
} as unknown as ReactSDKClient;

const renderUseServerSide = async ({
  flagKey,
  serverSideExperiments,
}: {
  flagKey: string;
  serverSideExperiments: MvtExperiment[];
}) => {
  const wrapper = ({ children }: PropsWithChildren) => (
    <OptimizelyProvider
      optimizely={optimizely as unknown as ReactSDKClient}
      isServerSide
    >
      {children}
    </OptimizelyProvider>
  );

  const { result } = await act(async () => {
    return renderHook(() => useServerSide({ flagKey, serverSideExperiments }), {
      wrapper,
    });
  });

  return result.current;
};

describe('useOptimizelyVariation - useServerSide', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(React, 'useContext').mockReturnValue({ optimizely });
  });

  it('should return null if given experiment is not in array', async () => {
    const mockMvtExperiments = [
      {
        experimentName: 'foo',
        variation: 'control',
        enabled: true,
      },
    ];

    const result = await renderUseServerSide({
      serverSideExperiments: mockMvtExperiments as MvtExperiment[],
      flagKey: 'bar',
    });

    expect(result).toEqual(null);
  });

  it('should return a variation when the experiment is enabled', async () => {
    const mockMvtExperiments = [
      {
        experimentName: 'foo',
        variation: 'control',
        enabled: true,
      },
    ];
    const result = await renderUseServerSide({
      serverSideExperiments: mockMvtExperiments as MvtExperiment[],
      flagKey: 'foo',
    });

    expect(result).toEqual('control');
  });

  it('should return null when the experiment is not enabled', async () => {
    const mockMvtExperiments = [
      {
        experimentName: 'foo',
        variation: 'control',
        enabled: false,
      },
    ];
    const result = await renderUseServerSide({
      serverSideExperiments: mockMvtExperiments as MvtExperiment[],
      flagKey: 'foo',
    });

    expect(result).toBeFalsy();
  });

  it('should return null when the experiment variation is string "false"', async () => {
    const mockMvtExperiments = [
      {
        experimentName: 'foo',
        variation: 'false',
        enabled: true,
      },
    ];
    const result = await renderUseServerSide({
      serverSideExperiments: mockMvtExperiments as MvtExperiment[],
      flagKey: 'foo',
    });
    expect(result).toBeNull();
  });

  it('should return null when the experiment variation is boolean "false"', async () => {
    const mockMvtExperiments = [
      {
        experimentName: 'foo',
        variation: false,
        enabled: true,
      },
    ];
    const result = await renderUseServerSide({
      serverSideExperiments: mockMvtExperiments as unknown as MvtExperiment[],
      flagKey: 'foo',
    });

    expect(result).toBeNull();
  });

  it('should call activate experiment if experiment is enabled', async () => {
    const mockMvtExperiments = [
      {
        experimentName: 'foo',
        variation: 'control',
        enabled: true,
      },
    ];
    await renderUseServerSide({
      serverSideExperiments: mockMvtExperiments as MvtExperiment[],
      flagKey: 'foo',
    });

    expect(spyActivateExperiment).toHaveBeenCalled();
  });

  it('should not call activate experiment if experiment is disabled', async () => {
    const mockMvtExperiments = [
      {
        experimentName: 'foo',
        variation: 'control',
        enabled: false,
      },
    ];
    await renderUseServerSide({
      serverSideExperiments: mockMvtExperiments as MvtExperiment[],
      flagKey: 'foo',
    });

    expect(spyActivateExperiment).not.toHaveBeenCalled();
  });
});
