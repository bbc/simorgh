import {
  chartbeatUID,
  useCanonical,
  domain,
  sections,
  type,
} from './chartbeat';

describe('Chartbeat utilities', () => {
  it('should return the correct chartbeat UID', () => {
    expect(chartbeatUID).toBe(50924);
  });

  it('useCanonical should be true', () => {
    expect(useCanonical).toBe(true);
  });

  describe('Chartbeat Page Type', () => {
    const types = [['article', 'News Article'], ['index', 'Index']];

    types.forEach(([rawType, expected]) => {
      it(`Type ${rawType} should return ${expected}`, () => {
        expect(type(rawType)).toBe(expected);
      });
    });
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

  describe('Chartbeat Sections', () => {
    const secs = [
      [
        {
          service: 'news',
          producer: 'wales',
          chapter: 'election 2017',
          type: 'article',
        },
        'news, news - ART, news - wales, news - wales - ART, news - election 2017, news - election 2017 - ART',
      ],
      [
        {
          service: 'persian',
          chapter: 'foo',
          type: 'article',
        },
        'persian, persian - ART, persian - foo, persian - foo - ART',
      ],
    ];

    secs.forEach(([service, expected]) => {
      it(`sections should return "${expected}"`, () => {
        const res = sections(service);
        expect(res).toBe(expected);
      });
    });
  });
});
