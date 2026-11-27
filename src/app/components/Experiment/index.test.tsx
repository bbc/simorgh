import { ReactNode, use, useEffect } from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import {
  OptimizelyContextProvider,
  ReactSDKClient,
} from '@optimizely/react-sdk';
import useOptimizelyVariation from '#app/hooks/useOptimizelyVariation';
import { ExperimentContext } from '#app/contexts/ExperimentContext';
import Experiment, { ExperimentType } from '.';

jest.mock('#app/hooks/useOptimizelyVariation', () => ({
  __esModule: true,
  ...jest.requireActual('#app/hooks/useOptimizelyVariation'),
  default: jest.fn(),
}));

const ContextReader = () => {
  const experiment = use(ExperimentContext);
  return <p data-testid="context">{JSON.stringify(experiment)}</p>;
};

const renderExperiment = () =>
  render(
    <Experiment name="my_experiment" type={ExperimentType.SERVER_SIDE}>
      {variation => (
        <>
          <p data-testid="variation">{String(variation)}</p>
          <ContextReader />
        </>
      )}
    </Experiment>,
  );

describe('Experiment', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('decides the experiment with the given name and type', () => {
    (useOptimizelyVariation as jest.Mock).mockReturnValue('variant_1');
    renderExperiment();

    expect(useOptimizelyVariation).toHaveBeenCalledWith({
      experimentName: 'my_experiment',
      experimentType: ExperimentType.SERVER_SIDE,
    });
  });

  it('renders children with the variation and provides it to descendants', () => {
    (useOptimizelyVariation as jest.Mock).mockReturnValue('variant_1');
    renderExperiment();

    expect(screen.getByTestId('variation')).toHaveTextContent('variant_1');
    expect(
      JSON.parse(screen.getByTestId('context').textContent as string),
    ).toEqual({
      experimentName: 'my_experiment',
      experimentVariant: 'variant_1',
    });
  });

  it('provides no experiment to descendants when the user is not bucketed', () => {
    (useOptimizelyVariation as jest.Mock).mockReturnValue(null);
    renderExperiment();

    expect(screen.getByTestId('variation')).toHaveTextContent('null');
    expect(screen.getByTestId('context')).toHaveTextContent('null');
  });

  it('only allows activate on client-side experiments', () => {
    (useOptimizelyVariation as jest.Mock).mockReturnValue(null);

    render(
      // @ts-expect-error server-side variations are chosen at the edge
      <Experiment
        name="my_experiment"
        type={ExperimentType.SERVER_SIDE}
        activate
      >
        {() => null}
      </Experiment>,
    );
  });

  describe('with activate', () => {
    const mountSpy = jest.fn();
    let decide: jest.Mock;
    let optimizely: ReactSDKClient;

    const Child = ({ variation }: { variation: string | null }) => {
      useEffect(() => {
        mountSpy();
      }, []);
      return (
        <>
          <p data-testid="variation">{String(variation)}</p>
          <ContextReader />
        </>
      );
    };

    const DeferredExperiment = ({ activate }: { activate: boolean }) => (
      <Experiment
        name="my_experiment"
        type={ExperimentType.CLIENT_SIDE}
        activate={activate}
      >
        {variation => <Child variation={variation} />}
      </Experiment>
    );

    const withClient = (children: ReactNode) => (
      <OptimizelyContextProvider
        value={{ optimizely, isServerSide: false, timeout: undefined }}
      >
        {children}
      </OptimizelyContextProvider>
    );

    const renderDeferred = (activate: boolean) =>
      withClient(<DeferredExperiment activate={activate} />);

    beforeEach(() => {
      mountSpy.mockClear();
      // A fresh client per test, so decisions aren't shared between tests.
      decide = jest.fn(() => ({ variationKey: 'variant_1' }));
      optimizely = {
        onReady: jest.fn(() => Promise.resolve({ success: true })),
        decide,
      } as unknown as ReactSDKClient;
    });

    it('does not decide the experiment until activated', async () => {
      render(renderDeferred(false));

      await act(() => Promise.resolve());

      expect(decide).not.toHaveBeenCalled();
      expect(useOptimizelyVariation).not.toHaveBeenCalled();
      expect(screen.getByTestId('variation')).toHaveTextContent('null');
      expect(screen.getByTestId('context')).toHaveTextContent('null');
    });

    it('decides and provides the experiment once activated, without remounting children', async () => {
      const { rerender } = render(renderDeferred(false));

      rerender(renderDeferred(true));

      await waitFor(() =>
        expect(screen.getByTestId('variation')).toHaveTextContent('variant_1'),
      );
      expect(decide).toHaveBeenCalledTimes(1);
      expect(decide).toHaveBeenCalledWith('my_experiment');
      expect(
        JSON.parse(screen.getByTestId('context').textContent as string),
      ).toEqual({
        experimentName: 'my_experiment',
        experimentVariant: 'variant_1',
      });
      expect(mountSpy).toHaveBeenCalledTimes(1);
    });

    it('decides once for several deferred experiments with the same name', async () => {
      render(
        withClient(
          <>
            <DeferredExperiment activate />
            <DeferredExperiment activate />
          </>,
        ),
      );

      await waitFor(() =>
        expect(screen.getAllByTestId('variation')).toHaveLength(2),
      );
      await waitFor(() =>
        screen
          .getAllByTestId('variation')
          .forEach(element => expect(element).toHaveTextContent('variant_1')),
      );
      expect(decide).toHaveBeenCalledTimes(1);
    });

    it('does not decide again when activate is toggled off and on', async () => {
      const { rerender } = render(renderDeferred(true));
      await waitFor(() =>
        expect(screen.getByTestId('variation')).toHaveTextContent('variant_1'),
      );

      rerender(renderDeferred(false));
      expect(screen.getByTestId('variation')).toHaveTextContent('null');

      rerender(renderDeferred(true));
      await waitFor(() =>
        expect(screen.getByTestId('variation')).toHaveTextContent('variant_1'),
      );

      expect(decide).toHaveBeenCalledTimes(1);
    });

    it('tries again on a later activation if the client was not ready', async () => {
      (optimizely.onReady as jest.Mock).mockResolvedValueOnce({
        success: false,
      });

      const { rerender } = render(renderDeferred(true));
      await act(() => Promise.resolve());
      expect(decide).not.toHaveBeenCalled();

      rerender(renderDeferred(false));
      rerender(renderDeferred(true));

      await waitFor(() =>
        expect(screen.getByTestId('variation')).toHaveTextContent('variant_1'),
      );
      expect(decide).toHaveBeenCalledTimes(1);
    });

    it('does not decide when the Optimizely client fails to become ready', async () => {
      (optimizely.onReady as jest.Mock).mockResolvedValueOnce({
        success: false,
      });

      render(renderDeferred(true));

      await act(() => Promise.resolve());

      expect(decide).not.toHaveBeenCalled();
      expect(screen.getByTestId('variation')).toHaveTextContent('null');
    });
  });
});
