import { use } from 'react';
import { render, screen } from '@testing-library/react';
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
});
