import Cookie from 'js-cookie';
import {
  chartbeatUID,
  useCanonical,
  getSylphidCookie,
  getDomain,
  buildSections,
  getType,
} from '.';
import onClient from '../../utilities/onClient';

let isOnClient = false;

jest.mock('../../utilities/onClient', () => jest.fn());
onClient.mockImplementation(() => isOnClient);

describe('Chartbeat utilities', () => {
  it('should return the correct chartbeat UID', () => {
    expect(chartbeatUID).toBe(50924);
  });

  it('useCanonical should be true', () => {
    expect(useCanonical).toBe(true);
  });

  describe('Chartbeat ID Cookie', () => {
    it('should return null when onClient is false', () => {
      expect(getSylphidCookie()).toBeFalsy();
    });

    it('should return null when ID cookie does not exist', () => {
      isOnClient = true;
      expect(getSylphidCookie()).toBeFalsy();
    });

    it('should return the contents of the ID cookie when a value is present', () => {
      const expectedCookieValue = 'foobar';
      isOnClient = true;
      jest.spyOn(Cookie, 'get').mockImplementation(() => expectedCookieValue);
      expect(getSylphidCookie()).toBe(expectedCookieValue);
    });
  });

  describe('Chartbeat Page Type', () => {
    const types = [
      {
        type: 'article',
        expectedDefaultType: 'New Article',
        expectedShortType: 'ART',
      },
      {
        type: 'index',
        expectedDefaultType: 'Index',
        expectedShortType: 'IDX',
      },
      {
        type: null,
        expectedDefaultType: null,
        expectedShortType: null,
      },
    ];

    types.forEach(
      ({ type: rawType, expectedDefaultType, expectedShortType }) => {
        it(`Type ${rawType} should return ${expectedDefaultType} as default`, () => {
          expect(getType(rawType)).toBe(expectedDefaultType);
        });

        it(`Type ${rawType} should return ${expectedShortType} as shorthand`, () => {
          expect(getType(rawType, true)).toBe(expectedShortType);
        });
      },
    );
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
      it(`getDomain should return "${expectedDomain}" when service is ${service}`, () => {
        expect(getDomain(service)).toBe(expectedDomain);
      });
    });
  });

  describe('Chartbeat Sections', () => {
    const sectionFixtures = [
      {
        service: 'news',
        producer: 'wales',
        chapter: 'election 2017',
        pageType: 'article',
        description: 'should add chapter and producer to article type',
        expected:
          'News, News - ART, News - wales, News - wales - ART, News - election 2017, News - election 2017 - ART',
      },
      {
        service: 'news',
        producer: 'business',
        chapter: 'market data',
        pageType: 'index',
        description: 'should add chapter and producer to index type',
        expected:
          'News, News - IDX, News - business, News - business - IDX, News - market data, News - market data - IDX',
      },
      {
        service: 'persian',
        producer: null,
        chapter: null,
        pageType: 'article',
        description: 'should not add chapter and producer when not present',
        expected: 'Persian, Persian - ART',
      },
      {
        service: 'news',
        producer: 'foo',
        chapter: null,
        pageType: 'article',
        description: 'should not add chapter when not present',
        expected: 'News, News - ART, News - foo, News - foo - ART',
      },
      {
        service: 'news',
        producer: null,
        chapter: 'bar',
        pageType: 'article',
        description: 'should not add producer when not present',
        expected: 'News, News - ART, News - bar, News - bar - ART',
      },
      {
        service: 'news',
        producer: 'news',
        chapter: 'baz',
        pageType: 'article',
        description: 'should not add producer when producer == service',
        expected: 'News, News - ART, News - baz, News - baz - ART',
      },
      {
        service: 'news',
        producer: 'business',
        chapter: 'foo',
        pageType: null,
        description: 'should not append pageType if not present',
        expected: 'News, News - business, News - foo',
      },
    ];

    sectionFixtures.forEach(
      ({ service, producer, chapter, pageType, description, expected }) => {
        it(description, () => {
          expect(buildSections(service, pageType, producer, chapter)).toBe(
            expected,
          );
        });
      },
    );
  });
});
