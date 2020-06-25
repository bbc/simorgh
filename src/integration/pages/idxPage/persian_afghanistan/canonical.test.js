/**
 * @service persian
 * @pathname /persian/afghanistan
 */

import runCanonicalTests from '../canonicalTests';

describe('Canonical persian/afghanistan IDX page', runCanonicalTests);

describe('Radio Schedule', () => {
  const hasRadioSchedule = service === 'persian';
  const id = document.getElementById('Radio-Schedule');

  if (hasRadioSchedule) {
    it('should be in the document', () => {
      expect(id).toBeInTheDocument();
    });
  } else {
    it('should not be in the document', () => {
      expect(id).not.toBeInTheDocument();
    });
  }
});
