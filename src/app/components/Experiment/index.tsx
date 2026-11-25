import { ReactNode } from 'react';
import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import { ExperimentProvider } from '#app/contexts/ExperimentContext';

type Props = {
  name: string;
  type: ExperimentType;
  children: (variation: string | null) => ReactNode;
};

/**
 * Decides an Optimizely experiment and renders `children` with the variation.
 *
 * Everything rendered inside is wrapped in an `ExperimentProvider`, so view and
 * click trackers within it are attributed to the experiment automatically.
 *
 * Only render this once the user is eligible: mounting it activates the
 * experiment for the user.
 *
 * @example
 * <Experiment name="my_flag" type={ExperimentType.SERVER_SIDE}>
 *   {variation => (variation === 'variant' ? <NewThing /> : <OldThing />)}
 * </Experiment>
 */
const Experiment = ({ name, type, children }: Props) => {
  const variation = useOptimizelyVariation({
    experimentName: name,
    experimentType: type,
  });

  return (
    <ExperimentProvider experimentName={name} experimentVariant={variation}>
      {children(variation)}
    </ExperimentProvider>
  );
};

export { ExperimentType };
export default Experiment;
