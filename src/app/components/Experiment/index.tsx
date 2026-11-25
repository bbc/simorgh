import { ReactNode, use, useEffect, useState } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import { ExperimentProvider } from '#app/contexts/ExperimentContext';

type Children = (variation: string | null) => ReactNode;

type Props = {
  name: string;
  children: Children;
} & (
  | {
      type: ExperimentType.SERVER_SIDE;
      activate?: never;
    }
  | {
      type: ExperimentType.CLIENT_SIDE;
      /**
       * Defer the decision until this becomes true, e.g. on scroll. Children
       * render unbucketed until then. Omit it to decide immediately.
       *
       * Client-side experiments only: server-side variations are chosen at
       * the edge before the page is rendered.
       */
      activate?: boolean;
    }
);

const ImmediateExperiment = ({
  name,
  type,
  children,
}: {
  name: string;
  type: ExperimentType;
  children: Children;
}) => {
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

const DeferredExperiment = ({
  name,
  activate,
  children,
}: {
  name: string;
  activate: boolean;
  children: Children;
}) => {
  const { optimizely } = use(OptimizelyContext);
  const [variation, setVariation] = useState<string | null>(null);

  // Decided with the SDK client directly, so the decision (and the
  // impression Optimizely records for it) happens only once activated.
  useEffect(() => {
    if (!activate || !optimizely) return undefined;

    let cancelled = false;

    optimizely.onReady().then(({ success }) => {
      if (success && !cancelled) {
        setVariation(optimizely.decide(name).variationKey);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [activate, optimizely, name]);

  const activeVariation = activate ? variation : null;

  return (
    <ExperimentProvider
      experimentName={name}
      experimentVariant={activeVariation}
    >
      {children(activeVariation)}
    </ExperimentProvider>
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
 * the user is eligible (or, for client-side experiments, use `activate`).
 *
 * @example
 * <Experiment name="my_flag" type={ExperimentType.SERVER_SIDE}>
 *   {variation => (variation === 'variant' ? <NewThing /> : <OldThing />)}
 * </Experiment>
 */
const Experiment = ({ name, type, activate, children }: Props) =>
  activate === undefined ? (
    <ImmediateExperiment name={name} type={type}>
      {children}
    </ImmediateExperiment>
  ) : (
    <DeferredExperiment name={name} activate={activate}>
      {children}
    </DeferredExperiment>
  );

export { ExperimentType };
export default Experiment;
