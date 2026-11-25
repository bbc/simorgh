import { createContext, PropsWithChildren, useMemo } from 'react';

export type ExperimentContextProps = {
  experimentName: string;
  experimentVariant: string;
} | null;

/**
 * Holds the Optimizely experiment the surrounding UI is rendered under.
 *
 * Event tracking hooks (`useViewTracker`, `useClickTrackerHandler` etc.) read
 * this via `extractATITrackingProps`, so any tracked component rendered inside
 * an `ExperimentProvider` automatically:
 * - tags its Reverb/Resonance events with `experimentName` / `experimentVariant`
 * - sends `<componentName>-views` / `<componentName>-clicks` to Optimizely
 *
 * without the experiment details being passed down as props.
 */
export const ExperimentContext = createContext<ExperimentContextProps>(null);

type ExperimentProviderProps = {
  experimentName: string;
  experimentVariant?: string | null;
};

const isActiveVariant = (variant?: string | null): variant is string =>
  Boolean(variant) && variant !== 'off';

export const ExperimentProvider = ({
  experimentName,
  experimentVariant,
  children,
}: PropsWithChildren<ExperimentProviderProps>) => {
  // Not bucketed (or 'off') provides null rather than skipping the provider,
  // so an inner experiment never leaks an outer experiment's tracking.
  const value = useMemo(
    () =>
      isActiveVariant(experimentVariant)
        ? { experimentName, experimentVariant }
        : null,
    [experimentName, experimentVariant],
  );

  return <ExperimentContext value={value}>{children}</ExperimentContext>;
};
