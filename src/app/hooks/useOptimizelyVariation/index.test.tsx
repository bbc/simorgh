import {
  act,
  renderHook,
} from '#app/components/react-testing-library-with-providers';
import { renderHook as renderSSRHook } from '@testing-library/react-hooks/server';
import useOptimizelyVariation, { ExperimentType } from '.';
import useServerSide from './useServerSide';
import useClientSide from './useClientSide';

jest.mock('./useServerSide', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('./useClientSide', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockServerSideHook = jest.mocked(useServerSide);
const mockClientSideHook = jest.mocked(useClientSide);

describe('useOptimizelyVariation custom hook', () => {
  beforeEach(() => {
    mockClientSideHook.mockReset();
    mockServerSideHook.mockReset();
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
    mockClientSideHook.mockReturnValueOnce(null);
    mockServerSideHook.mockReturnValueOnce('someServerSideVariation');

    const result = await renderUseOptimizelyVariation({
      experimentName: 'correct_experiment_id',
      experimentType: ExperimentType.SERVER_SIDE,
      isServerSide: true,
    });

    expect(result).toEqual('someServerSideVariation');
  });

  it('should call the clientSide hook if experimentType is set to CLIENT_SIDE and return the correct client side variation', async () => {
    mockClientSideHook.mockReturnValueOnce('someClientSideVariation');
    mockServerSideHook.mockReturnValueOnce(null);

    const result = await renderUseOptimizelyVariation({
      experimentName: 'correct_experiment_id',
      experimentType: ExperimentType.CLIENT_SIDE,
    });

    expect(result).toEqual('someClientSideVariation');
  });
});
