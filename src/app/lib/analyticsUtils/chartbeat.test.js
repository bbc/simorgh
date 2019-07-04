import { chartbeatUID, useCanonical } from './chartbeat';

describe('Chartbeat metrics', () => {
  it('should return the correct chartbeat UID', () => {
    expect(chartbeatUID).toBe(50924);
  });

  it('useCanonical should be true', () => {
    expect(useCanonical).toBe(true);
  });
});
