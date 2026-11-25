import { ReactNode, use, useEffect, useState } from 'react';
import { OptimizelyContext, ReactSDKClient } from '@optimizely/react-sdk';
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

// One decision per experiment name for each Optimizely client, shared by
// every deferred <Experiment> on the page. decide() records an impression
// each time it's called, so re-deciding (a second wrapper with the same name,
// or activate toggling off and on) would record duplicates.
const deferredDecisions = new WeakMap<
  ReactSDKClient,
  Map<string, Promise<string | null>>
>();

const decideOnce = (optimizely: ReactSDKClient, name: string) => {
  let decisions = deferredDecisions.get(optimizely);
  if (!decisions) {
    decisions = new Map();
    deferredDecisions.set(optimizely, decisions);
  }

  let decision = decisions.get(name);
  if (!decision) {
    const clientDecisions = decisions;
    decision = optimizely.onReady().then(({ success }) => {
      if (!success) {
        // Not cached, so a later activation can try again.
        clientDecisions.delete(name);
        return null;
      }
      return optimizely.decide(name).variationKey;
    });
    decisions.set(name, decision);
  }

  return decision;
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

    decideOnce(optimizely, name).then(decidedVariation => {
      if (!cancelled) setVariation(decidedVariation);
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
 * This is the only way to attribute tracking to an experiment. Trackers
 * rendered inside it are attributed automatically:
 * - view, click, swipe and custom event trackers are tagged with the
 *   experiment in Reverb/Resonance
 * - view, click and swipe trackers also send `<componentName>-views` /
 *   `<componentName>-clicks` to Optimizely. Custom event trackers don't, so
 *   they can't be used as Optimizely metrics.
 *
 * Trackers outside it are never attributed.
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
