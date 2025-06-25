import {
  act,
  renderHook,
} from '#app/components/react-testing-library-with-providers';
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
  }: {
    experimentName: string;
    experimentType: ExperimentType;
  }) => {
    const { result } = await act(async () => {
      return renderHook(() =>
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

  it('should call serverSide hook if experimentType is set to SERVER_SIDE and return the correct server side variation', async () => {
    jest.spyOn(clientSideHook, 'default').mockReturnValueOnce(null);
    jest
      .spyOn(serverSideHook, 'default')
      .mockReturnValueOnce('someServerSideVariation');

    const result = await renderUseOptimizelyVariation({
      experimentName: 'correct_experiment_id',
      experimentType: ExperimentType.SERVER_SIDE,
    });

    expect(result).toEqual('someServerSideVariation');
  });

  it('should call serverSide hook if experimentType is set to SERVER_SIDE and return the correct server side variation', async () => {
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
