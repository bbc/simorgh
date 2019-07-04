import { chartbeatUID, useCanonical, domain } from './chartbeat';

describe('Chartbeat utilities', () => {
  it('should return the correct chartbeat UID', () => {
    expect(chartbeatUID).toBe(50924);
  });

  it('useCanonical should be true', () => {
    expect(useCanonical).toBe(true);
  });

  describe('Chartbeat Domains', () => {
    const services = [
      ['news', 'bbc.co.uk'],
      ['persian', 'persian.bbc.co.uk'],
      ['igbo', 'igbo.bbc.co.uk'],
      ['thai', 'thai.bbc.co.uk'],
    ];

    services.forEach(([service, expected]) => {
      it(`domain should return "${expected}" when service is ${service}`, () => {
        const res = domain(service);

        expect(res).toBe(expected);
      });
    });
  });
});
