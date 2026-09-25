import setPageWrapperInlineJs from '.';
import { FontInfo } from '../../ThemeProvider/fontFaces';

class MockFileReader {
  result: string | null = null;

  private loadListeners: Array<() => void> = [];

  addEventListener(event: string, callback: () => void) {
    if (event === 'load') {
      this.loadListeners.push(callback);
    }
  }

  readAsDataURL() {
    this.result = 'data:font/woff2;base64,MOCKDATA';
    this.loadListeners.forEach(callback => callback());
  }
}

const flushPromises = () =>
  new Promise(resolve => {
    setImmediate(resolve);
  });

const buildFont = (overrides: Partial<FontInfo> = {}): FontInfo => ({
  name: 'BBCReithSans_W_Rg',
  fontFamily: 'ReithSans',
  src: 'url("reith-sans.woff2")',
  fontDisplay: 'optional',
  fontWeight: 400,
  downloadSrc: 'https://static.files.bbci.co.uk/fonts/reith-sans.woff2',
  version: '2.610',
  ...overrides,
});

const setVisibilityState = (visibilityState: 'hidden' | 'visible') => {
  Object.defineProperty(document, 'visibilityState', {
    value: visibilityState,
    configurable: true,
  });
};

describe('setPageWrapperInlineJs', () => {
  const originalFetch = window.fetch;
  const originalFileReader = window.FileReader;

  beforeEach(() => {
    localStorage.clear();
    document.head.innerHTML = '';
    document.onvisibilitychange = null;
  });

  afterEach(() => {
    window.fetch = originalFetch;
    window.FileReader = originalFileReader;
    jest.useRealTimers();
  });

  describe('font caching', () => {
    it('does not attempt to cache fonts when fetch is unavailable', () => {
      const font = buildFont();

      setPageWrapperInlineJs({
        serviceFonts: [font],
        service: 'arabic',
        wordCount: 10,
        reportingPageType: 'article',
      });

      expect(document.head.querySelector('style')).toBeNull();
      expect(localStorage.getItem(`font-${font.name}`)).toBeNull();
    });

    it('fetches and caches a font that is not already in localStorage', async () => {
      const font = buildFont();
      window.fetch = jest.fn().mockResolvedValue({
        blob: () => Promise.resolve(new Blob(['font-data'])),
      }) as unknown as typeof fetch;
      window.FileReader = MockFileReader as unknown as typeof FileReader;

      setPageWrapperInlineJs({
        serviceFonts: [font],
        service: 'arabic',
        wordCount: 10,
        reportingPageType: 'article',
      });

      window.dispatchEvent(new Event('load'));
      await flushPromises();
      await flushPromises();

      const stored = JSON.parse(
        localStorage.getItem(`font-${font.name}`) as string,
      );
      expect(stored).toEqual({
        base64Contents: 'data:font/woff2;base64,MOCKDATA',
        fontFamily: font.fontFamily,
        fontWeight: font.fontWeight,
        fontVersion: font.version,
      });

      const style = document.head.querySelector('style');
      expect(style?.innerHTML).toContain(font.fontFamily);
      expect(style?.innerHTML).toContain('data:font/woff2;base64,MOCKDATA');
    });

    it('reuses a cached font from localStorage without fetching when the version matches', () => {
      const font = buildFont();
      const fetchMock = jest.fn();
      window.fetch = fetchMock as unknown as typeof fetch;

      localStorage.setItem(
        `font-${font.name}`,
        JSON.stringify({
          base64Contents: 'data:font/woff2;base64,CACHED',
          fontFamily: font.fontFamily,
          fontWeight: font.fontWeight,
          fontVersion: font.version,
        }),
      );

      setPageWrapperInlineJs({
        serviceFonts: [font],
        service: 'arabic',
        wordCount: 10,
        reportingPageType: 'article',
      });

      const style = document.head.querySelector('style');
      expect(style?.innerHTML).toContain('data:font/woff2;base64,CACHED');
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('attaches the cached style immediately but re-fetches when the cached version is stale', async () => {
      const font = buildFont({ version: '2.611' });
      window.fetch = jest.fn().mockResolvedValue({
        blob: () => Promise.resolve(new Blob(['font-data'])),
      }) as unknown as typeof fetch;
      window.FileReader = MockFileReader as unknown as typeof FileReader;

      localStorage.setItem(
        `font-${font.name}`,
        JSON.stringify({
          base64Contents: 'data:font/woff2;base64,CACHED',
          fontFamily: font.fontFamily,
          fontWeight: font.fontWeight,
          fontVersion: '2.610',
        }),
      );

      setPageWrapperInlineJs({
        serviceFonts: [font],
        service: 'arabic',
        wordCount: 10,
        reportingPageType: 'article',
      });

      expect(document.head.querySelector('style')?.innerHTML).toContain(
        'data:font/woff2;base64,CACHED',
      );

      window.dispatchEvent(new Event('load'));
      await flushPromises();
      await flushPromises();

      const stored = JSON.parse(
        localStorage.getItem(`font-${font.name}`) as string,
      );
      expect(stored.fontVersion).toBe('2.611');
    });

    it('caches multiple fonts independently', () => {
      const fontA = buildFont({ name: 'BBCReithSans_W_Rg' });
      const fontB = buildFont({
        name: 'BBCReithSans_W_Bd',
        fontFamily: 'ReithSansBold',
        fontWeight: 700,
      });

      localStorage.setItem(
        `font-${fontA.name}`,
        JSON.stringify({
          base64Contents: 'data:font/woff2;base64,A',
          fontFamily: fontA.fontFamily,
          fontWeight: fontA.fontWeight,
          fontVersion: fontA.version,
        }),
      );
      localStorage.setItem(
        `font-${fontB.name}`,
        JSON.stringify({
          base64Contents: 'data:font/woff2;base64,B',
          fontFamily: fontB.fontFamily,
          fontWeight: fontB.fontWeight,
          fontVersion: fontB.version,
        }),
      );

      setPageWrapperInlineJs({
        serviceFonts: [fontA, fontB],
        service: 'arabic',
        wordCount: 10,
        reportingPageType: 'article',
      });

      const styles = document.head.querySelectorAll('style');
      expect(styles).toHaveLength(2);
      expect(styles[0].innerHTML).toContain('data:font/woff2;base64,A');
      expect(styles[1].innerHTML).toContain('data:font/woff2;base64,B');
    });
  });

  describe('wrapped analytics', () => {
    it('initialises wrapped stats for a first-time visit and only persists them once the page becomes hidden', () => {
      setPageWrapperInlineJs({
        serviceFonts: [],
        service: 'arabic',
        wordCount: 100,
        reportingPageType: 'article',
      });

      expect(localStorage.getItem('ws_bbc_wrapped')).toBeNull();

      setVisibilityState('hidden');
      document.onvisibilitychange?.(new Event('visibilitychange'));

      const wrapped = JSON.parse(
        localStorage.getItem('ws_bbc_wrapped') as string,
      );
      const year = new Date().getFullYear();

      expect(wrapped[year].wordCount).toBe(100);
      expect(wrapped[year].serviceCounts.arabic).toBe(1);
      expect(wrapped[year].pageTypeCounts.article).toBe(1);
      expect(typeof wrapped[year].duration).toBe('number');
    });

    it('merges new stats with existing wrapped stats for the same year', () => {
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;

      localStorage.setItem(
        'ws_bbc_wrapped',
        JSON.stringify({
          [year]: {
            byMonth: { [month]: 5 },
            pageTypeCounts: { article: 2 },
            serviceCounts: { arabic: 3 },
            topicCounts: {},
            duration: 1000,
            wordCount: 50,
          },
        }),
      );

      setPageWrapperInlineJs({
        serviceFonts: [],
        service: 'arabic',
        wordCount: 25,
        reportingPageType: 'article',
      });

      setVisibilityState('hidden');
      document.onvisibilitychange?.(new Event('visibilitychange'));

      const wrapped = JSON.parse(
        localStorage.getItem('ws_bbc_wrapped') as string,
      );

      expect(wrapped[year].wordCount).toBe(75);
      expect(wrapped[year].serviceCounts.arabic).toBe(4);
      expect(wrapped[year].pageTypeCounts.article).toBe(3);
      expect(wrapped[year].byMonth[month]).toBe(6);
    });

    it('tracks topic counts and stores topic metadata for new and repeat topics', () => {
      localStorage.setItem(
        'ws_bbc_topics',
        JSON.stringify({
          arabic: {
            'Existing Topic': {
              count: 2,
              id: 'c000000001',
              path: '/arabic/topics/c000000001',
            },
          },
        }),
      );

      setPageWrapperInlineJs({
        serviceFonts: [],
        wrappedTopics: [
          { topicName: 'Existing Topic', topicId: 'c000000001' },
          { topicName: 'New Topic', topicId: 'c000000002' },
        ],
        service: 'arabic',
        wordCount: 10,
        reportingPageType: 'article',
      });

      const topics = JSON.parse(
        localStorage.getItem('ws_bbc_topics') as string,
      );

      expect(topics.arabic['Existing Topic'].count).toBe(3);
      expect(topics.arabic['New Topic']).toEqual({
        count: 1,
        id: 'c000000002',
        path: '/arabic/topics/c000000002',
      });

      setVisibilityState('hidden');
      document.onvisibilitychange?.(new Event('visibilitychange'));

      const wrapped = JSON.parse(
        localStorage.getItem('ws_bbc_wrapped') as string,
      );
      const year = new Date().getFullYear();
      expect(wrapped[year].topicCounts['Existing Topic']).toBe(1);
      expect(wrapped[year].topicCounts['New Topic']).toBe(1);
    });

    it('does not update topic counts when no wrapped topics are provided', () => {
      setPageWrapperInlineJs({
        serviceFonts: [],
        service: 'arabic',
        wordCount: 10,
        reportingPageType: 'article',
      });

      const topics = JSON.parse(
        localStorage.getItem('ws_bbc_topics') as string,
      );
      expect(topics).toEqual({});
    });

    it('accumulates duration across multiple hidden/visible cycles', () => {
      jest.useFakeTimers().setSystemTime(new Date('2026-01-01T10:00:00Z'));

      setPageWrapperInlineJs({
        serviceFonts: [],
        service: 'arabic',
        wordCount: 10,
        reportingPageType: 'article',
      });

      setVisibilityState('hidden');
      jest.setSystemTime(new Date('2026-01-01T10:00:05Z'));
      document.onvisibilitychange?.(new Event('visibilitychange'));

      const year = new Date().getFullYear();
      let wrapped = JSON.parse(
        localStorage.getItem('ws_bbc_wrapped') as string,
      );
      expect(wrapped[year].duration).toBe(5000);

      setVisibilityState('visible');
      jest.setSystemTime(new Date('2026-01-01T10:00:10Z'));
      document.onvisibilitychange?.(new Event('visibilitychange'));

      setVisibilityState('hidden');
      jest.setSystemTime(new Date('2026-01-01T10:00:12Z'));
      document.onvisibilitychange?.(new Event('visibilitychange'));

      wrapped = JSON.parse(localStorage.getItem('ws_bbc_wrapped') as string);
      expect(wrapped[year].duration).toBe(7000);
    });

    it('uses the string "undefined" as the pageType key when reportingPageType is not provided', () => {
      setPageWrapperInlineJs({
        serviceFonts: [],
        service: 'arabic',
        wordCount: 10,
      });

      setVisibilityState('hidden');
      document.onvisibilitychange?.(new Event('visibilitychange'));

      const wrapped = JSON.parse(
        localStorage.getItem('ws_bbc_wrapped') as string,
      );
      const year = new Date().getFullYear();
      expect(wrapped[year].pageTypeCounts.undefined).toBe(1);
    });

    it('produces a null wordCount when wordCount is not provided (existing behaviour, NaN is serialised as null)', () => {
      setPageWrapperInlineJs({
        serviceFonts: [],
        service: 'arabic',
        reportingPageType: 'article',
      });

      setVisibilityState('hidden');
      document.onvisibilitychange?.(new Event('visibilitychange'));

      const wrapped = JSON.parse(
        localStorage.getItem('ws_bbc_wrapped') as string,
      );
      const year = new Date().getFullYear();
      expect(wrapped[year].wordCount).toBeNull();
    });
  });

  describe('font caching and wrapped analytics combined', () => {
    it('caches fonts and tracks wrapped/topic/duration stats independently when both are present in the same call', () => {
      jest.useFakeTimers().setSystemTime(new Date('2026-01-01T10:00:00Z'));

      const font = buildFont();
      window.fetch = jest.fn().mockResolvedValue({
        blob: () => Promise.resolve(new Blob(['font-data'])),
      }) as unknown as typeof fetch;
      window.FileReader = MockFileReader as unknown as typeof FileReader;

      setPageWrapperInlineJs({
        serviceFonts: [font],
        wrappedTopics: [{ topicName: 'Climate Change', topicId: 'c000000001' }],
        service: 'arabic',
        wordCount: 42,
        reportingPageType: 'article',
      });

      // Font caching kicks off its own async work (fetch/FileReader), while
      // wrapped/topic tracking runs synchronously in the same invocation -
      // assert the synchronous analytics work isn't blocked or altered by the
      // pending font caching work.
      const topics = JSON.parse(
        localStorage.getItem('ws_bbc_topics') as string,
      );
      expect(topics.arabic['Climate Change']).toEqual({
        count: 1,
        id: 'c000000001',
        path: '/arabic/topics/c000000001',
      });

      setVisibilityState('hidden');
      jest.setSystemTime(new Date('2026-01-01T10:00:08Z'));
      document.onvisibilitychange?.(new Event('visibilitychange'));

      const year = new Date().getFullYear();
      const wrapped = JSON.parse(
        localStorage.getItem('ws_bbc_wrapped') as string,
      );
      expect(wrapped[year].wordCount).toBe(42);
      expect(wrapped[year].serviceCounts.arabic).toBe(1);
      expect(wrapped[year].pageTypeCounts.article).toBe(1);
      expect(wrapped[year].topicCounts['Climate Change']).toBe(1);
      expect(wrapped[year].duration).toBe(8000);

      // Now let the font caching promise chain resolve and confirm it still
      // completes correctly, unaffected by the wrapped analytics work above.
      window.dispatchEvent(new Event('load'));
      jest.useRealTimers();

      return flushPromises()
        .then(() => flushPromises())
        .then(() => {
          const storedFont = JSON.parse(
            localStorage.getItem(`font-${font.name}`) as string,
          );
          expect(storedFont).toEqual({
            base64Contents: 'data:font/woff2;base64,MOCKDATA',
            fontFamily: font.fontFamily,
            fontWeight: font.fontWeight,
            fontVersion: font.version,
          });

          const style = document.head.querySelector('style');
          expect(style?.innerHTML).toContain(font.fontFamily);
        });
    });
  });
});
