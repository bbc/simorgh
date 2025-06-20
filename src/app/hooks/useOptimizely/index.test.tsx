import {
  act,
  renderHook,
} from '#app/components/react-testing-library-with-providers';
import useOptimizely, { ExperimentState } from '.';
import * as serverSideHook from './useServerSide';
import * as clientSideHook from './useClientSide';

describe('useOptimizely custom hook', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  const renderUseOptimizely = async ({
    experimentName,
    runtimeType,
  }: {
    experimentName?: string;
    runtimeType: ExperimentState;
  }) => {
    const { result } = await act(async () => {
      return renderHook(() => useOptimizely({ experimentName, runtimeType }));
    });

    return result.current;
  };

  it('should return null if flagKey is not defined', async () => {
    const result = await renderUseOptimizely({
      runtimeType: ExperimentState.CLIENT_SIDE,
    });
    expect(result).toEqual(null);
  });

  it('should call serverSide hook if runtimeType is set to SERVER_SIDE and return the correct server side variation', async () => {
    jest.spyOn(clientSideHook, 'default').mockReturnValueOnce(null);
    jest
      .spyOn(serverSideHook, 'default')
      .mockReturnValueOnce('someServerSideVariation');

    const result = await renderUseOptimizely({
      experimentName: 'correct_experiment_id',
      runtimeType: ExperimentState.SERVER_SIDE,
    });

    expect(result).toEqual('someServerSideVariation');
  });

  it('should call serverSide hook if runtimeType is set to SERVER_SIDE and return the correct server side variation', async () => {
    jest
      .spyOn(clientSideHook, 'default')
      .mockReturnValueOnce('someClientSideVariation');
    jest.spyOn(serverSideHook, 'default').mockReturnValueOnce(null);

    const result = await renderUseOptimizely({
      experimentName: 'correct_experiment_id',
      runtimeType: ExperimentState.CLIENT_SIDE,
    });

    expect(result).toEqual('someClientSideVariation');
  });
});
