import {
  act,
  renderHook,
} from '#app/components/react-testing-library-with-providers';
import { renderHook as renderSSRHook } from '@testing-library/react-hooks/server';
import useOptimizelyVariation, { ExperimentType } from '.';
import * as serverSideHook from './useServerSide';
import * as clientSideHook from './useClientSide';

describe('useOptimizelyVariation custom hook', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  const renderUseOptimizelyVariation = async ({
    experimentName,
    experimentType,
    isServerSide,
  }: {
    experimentName: string;
    experimentType: ExperimentType;
    isServerSide?: boolean;
  }) => {
    const renderFunction = isServerSide ? renderSSRHook : renderHook;
    const { result } = await act(async () => {
      // The renderFunction type changes from its client-side variant its server-side variant when isServerSide is specified.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return renderFunction(() =>
        useOptimizelyVariation({ experimentName, experimentType }),
      );
    });

    return result.current;
  };

  it('should return null if flagKey is not defined', async () => {
    const result = await renderUseOptimizelyVariation({
      experimentName: '',
      experimentType: ExperimentType.CLIENT_SIDE,
    });
    expect(result).toEqual(null);
  });

  it('should call the serverSide hook if experimentType is set to SERVER_SIDE and return the correct server side variation', async () => {
    jest.spyOn(clientSideHook, 'default').mockReturnValueOnce(null);
    jest
      .spyOn(serverSideHook, 'default')
      .mockReturnValueOnce('someServerSideVariation');

    const result = await renderUseOptimizelyVariation({
      experimentName: 'correct_experiment_id',
      experimentType: ExperimentType.SERVER_SIDE,
      isServerSide: true,
    });

    expect(result).toEqual('someServerSideVariation');
  });

  it('should call the clientSide hook if experimentType is set to CLIENT_SIDE and return the correct client side variation', async () => {
    jest
      .spyOn(clientSideHook, 'default')
      .mockReturnValueOnce('someClientSideVariation');
    jest.spyOn(serverSideHook, 'default').mockReturnValueOnce(null);

    const result = await renderUseOptimizelyVariation({
      experimentName: 'correct_experiment_id',
      experimentType: ExperimentType.CLIENT_SIDE,
    });

    expect(result).toEqual('someClientSideVariation');
  });
});
