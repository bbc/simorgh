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
    const types = [
      {
        type: 'article',
        expectedType: 'New Article',
      },
      {
        type: 'index',
        expectedType: 'Index',
      },
    ];

    types.forEach(({ type: rawType, expectedType }) => {
      it(`Type ${rawType} should return ${expectedType}`, () => {
        expect(type(rawType)).toBe(expectedType);
      });
    });
  });

  describe('Chartbeat Domains', () => {
    const services = [
      {
        service: 'news',
        expectedDomain: 'bbc.co.uk',
      },
      {
        service: 'persian',
        expectedDomain: 'persian.bbc.co.uk',
      },
      {
        service: 'igbo',
        expectedDomain: 'igbo.bbc.co.uk',
      },
      {
        service: 'thai',
        expectedDomain: 'thai.bbc.co.uk',
      },
    ];

    services.forEach(({ service, expectedDomain }) => {
      it(`domain should return "${expectedDomain}" when service is ${service}`, () => {
        expect(domain(service)).toBe(expectedDomain);
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
          pageType: 'article',
          expected:
            'news, news - ART, news - wales, news - wales - ART, news - election 2017, news - election 2017 - ART',
        },
      ],
      [
        {
          service: 'news',
          producer: 'business',
          chapter: 'market data',
          pageType: 'index',
          expected:
            'news, news - IDX, news - business, news - business - IDX, news - market data, news - market data - IDX',
        },
      ],
      [
        {
          service: 'persian',
          producer: null,
          chapter: null,
          pageType: 'article',
          expected: 'persian, persian - ART',
        },
      ],
    ];

    secs.forEach(([{ service, producer, chapter, pageType, expected }]) => {
      it(`sections should return "${expected}"`, () => {
        expect(sections(service, pageType, producer, chapter)).toBe(expected);
      });
    });
  });
});
