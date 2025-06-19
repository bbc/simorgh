import React, { PropsWithChildren } from 'react';
import {
  act,
  renderHook,
} from '#app/components/react-testing-library-with-providers';
import { RequestContextProvider } from '#contexts/RequestContext';
import { MvtExperiment, PageTypes, Services } from '#app/models/types/global';
import useOptimizelyVariation from '.';
import * as serverSideHook from './useServerSide';
import * as clientSideHook from './useClientSide';

describe('useOptimizelyVariation custom hook', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  const renderUseOptimizelyVariation = async (params?: {
    serverSideExperiments?: MvtExperiment[];
    flagKey?: string;
  }) => {
    const flagKey = params?.flagKey;
    const serverSideExperiments = params?.serverSideExperiments;

    const props = {
      serverSideExperiments,
      isAmp: false,
      pageType: 'STY' as PageTypes,
      service: 'news' as Services,
      pathname: 'bar',
    };

    const wrapper = ({ children }: PropsWithChildren) => (
      <RequestContextProvider {...props}>{children}</RequestContextProvider>
    );

    const { result } = await act(async () => {
      return renderHook(() => useOptimizelyVariation({ flagKey }), {
        wrapper,
      });
    });

    return result.current;
  };

  it('should return null if flagKey is not defined', async () => {
    const result = await renderUseOptimizelyVariation();
    expect(result).toEqual(null);
  });

  it('should return null if optimizely is not defined', async () => {
    jest.spyOn(serverSideHook, 'default').mockReturnValueOnce(null);
    jest.spyOn(clientSideHook, 'default').mockReturnValueOnce(null);

    const result = await renderUseOptimizelyVariation({
      flagKey: 'correct_experiment_id',
    });

    expect(result).toEqual(null);
  });

  it('should return null if the serverSideExperiments array is empty and if clientSideHook returns null', async () => {
    jest.spyOn(clientSideHook, 'default').mockReturnValueOnce(null);

    const result = await renderUseOptimizelyVariation({
      flagKey: 'correct_experiment_id',
      serverSideExperiments: [],
    });

    expect(result).toEqual(null);
  });

  it('should call useServerSideClient if a serverSideExperiments array is provided and should return the correct server side Variation', async () => {
    jest
      .spyOn(serverSideHook, 'default')
      .mockReturnValueOnce('someServerSideVariation');
    jest.spyOn(clientSideHook, 'default').mockReturnValueOnce(null);

    const result = await renderUseOptimizelyVariation({
      flagKey: 'correct_experiment_id',
      serverSideExperiments: [
        {
          experimentName: 'foo',
          variation: 'false',
          enabled: true,
        } as MvtExperiment,
      ],
    });

    expect(result).toEqual('someServerSideVariation');
  });

  it('should call client side hook if serverSideExperiments is flasy and should return the correct client side Variation', async () => {
    jest
      .spyOn(clientSideHook, 'default')
      .mockReturnValueOnce('someClientSideVariation');

    const result = await renderUseOptimizelyVariation({
      flagKey: 'correct_experiment_id',
    });

    expect(result).toEqual('someClientSideVariation');
  });
});
