import { ReactNode, useEffect, useState } from 'react';
import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import { ExperimentProvider } from '#app/contexts/ExperimentContext';

type DecisionProps = {
  name: string;
  type: ExperimentType;
};

type Props = DecisionProps & {
  /**
   * Defer activation until this becomes true, e.g. on scroll. When passed,
   * the variation is resolved after mount, so children render unbucketed on
   * the server. Omit it to decide immediately, which allows server-side
   * experiments to render their variation in the server response.
   *
   * Pass it from first render (even as `false`) rather than adding it later.
   */
  activate?: boolean;
  children: (variation: string | null) => ReactNode;
};

const ImmediateExperiment = ({
  name,
  type,
  children,
}: DecisionProps & Pick<Props, 'children'>) => {
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

// Rendered only once activated, so the decision (and the impression it
// records) happens no earlier than the caller asks for it.
const Decision = ({
  name,
  type,
  onDecide,
}: DecisionProps & { onDecide: (variation: string | null) => void }) => {
  const variation = useOptimizelyVariation({
    experimentName: name,
    experimentType: type,
  });

  useEffect(() => {
    onDecide(variation);
  }, [variation, onDecide]);

  return null;
};

const DeferredExperiment = ({
  name,
  type,
  activate,
  children,
}: Required<Pick<Props, 'activate'>> &
  DecisionProps &
  Pick<Props, 'children'>) => {
  const [variation, setVariation] = useState<string | null>(null);
  const activeVariation = activate ? variation : null;

  // The Decision sits beside, not around, the children so activating doesn't
  // remount them.
  return (
    <>
      {activate && <Decision name={name} type={type} onDecide={setVariation} />}
      <ExperimentProvider
        experimentName={name}
        experimentVariant={activeVariation}
      >
        {children(activeVariation)}
      </ExperimentProvider>
    </>
  );
};

/**
 * Decides an Optimizely experiment and renders `children` with the variation.
 *
 * This is the only way to attribute tracking to an experiment: every view,
 * click, swipe and custom event tracker rendered inside it is tagged with the
 * experiment in Reverb/Resonance and sends `<componentName>-views` /
 * `<componentName>-clicks` to Optimizely. Trackers outside it never are.
 *
 * Mounting it activates the experiment for the user, so only render it once
 * the user is eligible (or use `activate`).
 *
 * @example
 * <Experiment name="my_flag" type={ExperimentType.SERVER_SIDE}>
 *   {variation => (variation === 'variant' ? <NewThing /> : <OldThing />)}
 * </Experiment>
 */
const Experiment = ({ activate, ...props }: Props) =>
  activate === undefined ? (
    <ImmediateExperiment {...props} />
  ) : (
    <DeferredExperiment activate={activate} {...props} />
  );

export { ExperimentType };
export default Experiment;
