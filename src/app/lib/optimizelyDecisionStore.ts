import { useSyncExternalStore } from 'react';

const activatedExperiments = new Set<string>();
let snapshot: ReadonlySet<string> = new Set<string>();
const subscribers = new Set<() => void>();

const subscribe = (callback: () => void) => {
  subscribers.add(callback);
  return () => {
    subscribers.delete(callback);
  };
};

const getSnapshot = (): ReadonlySet<string> => snapshot;

const notifyDecision = (flagKey: string) => {
  if (activatedExperiments.has(flagKey)) return;
  activatedExperiments.add(flagKey);
  snapshot = new Set(activatedExperiments);
  subscribers.forEach(cb => cb());
};

const resetDecisionStore = () => {
  activatedExperiments.clear();
  snapshot = new Set<string>();
};

const useActivatedExperiments = () =>
  useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

export {
  subscribe,
  getSnapshot,
  notifyDecision,
  resetDecisionStore,
  useActivatedExperiments,
};
