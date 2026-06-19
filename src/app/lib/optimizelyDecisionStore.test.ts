import {
  subscribe,
  getSnapshot,
  notifyDecision,
  resetDecisionStore,
} from './optimizelyDecisionStore';

describe('optimizelyDecisionStore', () => {
  beforeEach(() => {
    resetDecisionStore();
  });

  it('should start with an empty snapshot', () => {
    expect(getSnapshot().size).toBe(0);
  });

  it('should add a flag key to the snapshot on notifyDecision', () => {
    notifyDecision('experiment_1');
    expect(getSnapshot().has('experiment_1')).toBe(true);
  });

  it('should accumulate multiple flag keys', () => {
    notifyDecision('experiment_1');
    notifyDecision('experiment_2');
    const snap = getSnapshot();
    expect(snap.has('experiment_1')).toBe(true);
    expect(snap.has('experiment_2')).toBe(true);
    expect(snap.size).toBe(2);
  });

  it('should notify subscribers when a new decision is added', () => {
    const callback = jest.fn();
    subscribe(callback);
    notifyDecision('experiment_1');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not notify subscribers for duplicate decisions', () => {
    const callback = jest.fn();
    subscribe(callback);
    notifyDecision('experiment_1');
    notifyDecision('experiment_1');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should unsubscribe when the returned function is called', () => {
    const callback = jest.fn();
    const unsubscribe = subscribe(callback);
    unsubscribe();
    notifyDecision('experiment_1');
    expect(callback).not.toHaveBeenCalled();
  });

  it('should return a new snapshot reference after each decision', () => {
    const first = getSnapshot();
    notifyDecision('experiment_1');
    const second = getSnapshot();
    expect(first).not.toBe(second);
  });

  it('should reset the store state', () => {
    notifyDecision('experiment_1');
    resetDecisionStore();
    expect(getSnapshot().size).toBe(0);
  });
});
