import loggerMock from '#testHelpers/loggerMock';
import { existsSync, readFileSync } from 'fs';
import getAmpLiteCss, {
  resolveCssFilePath,
  readCssFiles,
  getBuildManifestCss,
  getDynamicImportCss,
} from '.';

jest.mock('fs');

const existsSyncMock = existsSync as jest.Mock;
const readFileSyncMock = readFileSync as jest.Mock;

describe('getAmpLiteCss utilities', () => {
  const originalCwd = process.cwd;
  const originalNodeEnv = process.env.NODE_ENV;

  beforeAll(() => {
    jest.spyOn(process, 'cwd').mockReturnValue('/app');
  });

  afterAll(() => {
    process.cwd = originalCwd;
    process.env.NODE_ENV = originalNodeEnv;
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = originalNodeEnv;
  });

  describe('resolveCssFilePath', () => {
    // public/_next path: Used in production standalone mode (yarn start)
    // build path: Used in development (yarn dev) and during build-time
    // The function checks public/_next first, then falls back to build.

    it('prefers public/_next when both paths exist (production scenario)', () => {
      // Both paths would exist in production standalone mode
      existsSyncMock.mockImplementation(
        (p: string) => p.includes('public/_next') || p.includes('/build/'),
      );

      expect(resolveCssFilePath('static/css/abc.css')).toBe(
        '/app/public/_next/static/css/abc.css',
      );
    });

    it('falls back to build path when public/_next does not exist (development scenario)', () => {
      existsSyncMock.mockImplementation((p: string) => p.includes('/build/'));

      expect(resolveCssFilePath('static/css/abc.css')).toBe(
        '/app/build/static/css/abc.css',
      );
    });

    it('returns null when neither path exists', () => {
      existsSyncMock.mockReturnValue(false);

      expect(resolveCssFilePath('static/css/abc.css')).toBeNull();
    });
  });

  describe('readCssFiles', () => {
    it('returns empty string for an empty files array', () => {
      expect(readCssFiles([])).toBe('');
    });

    it('returns concatenated CSS for all resolved files', () => {
      existsSyncMock.mockImplementation((p: string) =>
        p.includes('public/_next'),
      );
      readFileSyncMock.mockImplementation((p: string) => {
        if (p.includes('a.css')) return '.class-a{color:red}';
        if (p.includes('b.css')) return '.class-b{color:blue}';
        return '';
      });

      expect(readCssFiles(['static/css/a.css', 'static/css/b.css'])).toBe(
        '.class-a{color:red}.class-b{color:blue}',
      );
    });

    it('skips files that cannot be resolved to a path on disk', () => {
      existsSyncMock.mockReturnValue(false);
      readFileSyncMock.mockReturnValue('.foo{color:red}');

      expect(readCssFiles(['static/css/a.css'])).toBe('');
    });

    it('includes only the resolvable files when some cannot be found', () => {
      existsSyncMock.mockImplementation((p: string) =>
        p.includes('static/css/found.css'),
      );
      readFileSyncMock.mockReturnValue('.found{}');

      expect(
        readCssFiles(['static/css/missing.css', 'static/css/found.css']),
      ).toBe('.found{}');
    });
  });

  describe('getBuildManifestCss', () => {
    // build-manifest.json structure:
    // { pages: { '/_app': ['static/css/app.css'], '/articles/page': ['static/css/page.css'] } }
    const manifestPath = '/app/build/build-manifest.json';

    it('returns empty string when build-manifest.json does not exist', () => {
      existsSyncMock.mockReturnValue(false);

      expect(getBuildManifestCss('/articles/page')).toBe('');
      expect(existsSyncMock).toHaveBeenCalledWith(manifestPath);
    });

    it('returns empty string when the manifest has no CSS entries', () => {
      existsSyncMock.mockImplementation((p: string) => p === manifestPath);
      readFileSyncMock.mockReturnValue(
        JSON.stringify({
          pages: { '/_app': ['static/js/app.js'], '/articles/page': [] },
        }),
      );

      expect(getBuildManifestCss('/articles/page')).toBe('');
    });

    it('returns CSS from /_app and the current page route', () => {
      existsSyncMock.mockReturnValue(true);
      readFileSyncMock.mockImplementation((p: string) => {
        if (p === manifestPath) {
          return JSON.stringify({
            pages: {
              '/_app': ['static/css/app.css'],
              '/articles/page': ['static/css/page.css'],
            },
          });
        }
        if (p.includes('app.css')) return '.app-styles{color:inherit}';
        if (p.includes('page.css')) return '.page-styles{display:block}';
        return '';
      });

      expect(getBuildManifestCss('/articles/page')).toBe(
        '.app-styles{color:inherit}.page-styles{display:block}',
      );
    });

    it('deduplicates CSS files shared between /_app and the current page', () => {
      existsSyncMock.mockReturnValue(true);
      readFileSyncMock.mockImplementation((p: string) => {
        if (p === manifestPath) {
          return JSON.stringify({
            pages: {
              '/_app': ['static/css/app.css', 'static/css/shared.css'],
              '/articles/page': [
                'static/css/page.css',
                'static/css/shared.css',
              ],
            },
          });
        }
        if (p.includes('app.css')) return '.app-styles{}';
        if (p.includes('shared.css')) return '.shared-styles{}';
        if (p.includes('page.css')) return '.page-styles{}';
        return '';
      });

      expect(getBuildManifestCss('/articles/page')).toBe(
        '.app-styles{}.shared-styles{}.page-styles{}',
      );
    });

    it('handles a missing /_app key in the manifest gracefully', () => {
      existsSyncMock.mockReturnValue(true);
      readFileSyncMock.mockImplementation((p: string) => {
        if (p === manifestPath) {
          return JSON.stringify({
            pages: { '/articles/page': ['static/css/page.css'] },
          });
        }
        return '.page{}';
      });

      expect(getBuildManifestCss('/articles/page')).toBe('.page{}');
    });

    it('handles a missing page key in the manifest gracefully', () => {
      existsSyncMock.mockReturnValue(true);
      readFileSyncMock.mockImplementation((p: string) => {
        if (p === manifestPath) {
          return JSON.stringify({
            pages: { '/_app': ['static/css/app.css'] },
          });
        }
        return '.app{}';
      });

      expect(getBuildManifestCss('/unknown/page')).toBe('.app{}');
    });

    it('logs an error and returns empty string when the manifest JSON is malformed', () => {
      existsSyncMock.mockImplementation((p: string) => p === manifestPath);
      readFileSyncMock.mockReturnValue('not valid json');

      expect(getBuildManifestCss('/articles/page')).toBe('');
      expect(loggerMock.error).toHaveBeenCalledWith(
        'build_manifest_css_read_error',
        expect.objectContaining({ event: 'build_manifest_css_read_error' }),
      );
    });

    it('logs an error and returns empty string when readFileSync throws', () => {
      existsSyncMock.mockImplementation((p: string) => p === manifestPath);
      readFileSyncMock.mockImplementation(() => {
        throw new Error('disk read failed');
      });

      expect(getBuildManifestCss('/articles/page')).toBe('');
      expect(loggerMock.error).toHaveBeenCalledWith(
        'build_manifest_css_read_error',
        expect.objectContaining({ message: 'disk read failed' }),
      );
    });
  });

  describe('getDynamicImportCss', () => {
    // react-loadable-manifest.json structure:
    // { 'path/to/Component': { id: 456, files: ['static/css/component.css', 'static/js/component.js'] } }
    const manifestPath = '/app/build/react-loadable-manifest.json';

    it('returns empty string for an empty dynamicIds array without reading the manifest', () => {
      expect(getDynamicImportCss([])).toBe('');
      expect(existsSyncMock).not.toHaveBeenCalled();
    });

    it('returns empty string when react-loadable-manifest.json does not exist', () => {
      existsSyncMock.mockReturnValue(false);

      expect(getDynamicImportCss(['some-chunk'])).toBe('');
    });

    it('matches chunks by chunkKey and returns their CSS', () => {
      existsSyncMock.mockReturnValue(true);
      readFileSyncMock.mockImplementation((p: string) => {
        if (p === manifestPath) {
          return JSON.stringify({
            'path/to/Component': {
              id: 456,
              files: ['static/css/component.css', 'static/js/component.js'],
            },
          });
        }
        return '.component{display:block}';
      });

      expect(getDynamicImportCss(['path/to/Component'])).toBe(
        '.component{display:block}',
      );
    });

    it('matches chunks by numeric id', () => {
      existsSyncMock.mockReturnValue(true);
      readFileSyncMock.mockImplementation((p: string) => {
        if (p === manifestPath) {
          return JSON.stringify({
            'path/to/Component': {
              id: 456,
              files: ['static/css/component.css'],
            },
          });
        }
        return '.component{display:block}';
      });

      expect(getDynamicImportCss([456])).toBe('.component{display:block}');
    });

    it('matches chunks by a string-typed id', () => {
      existsSyncMock.mockReturnValue(true);
      readFileSyncMock.mockImplementation((p: string) => {
        if (p === manifestPath) {
          return JSON.stringify({
            'path/to/Component': {
              id: 789,
              files: ['static/css/component.css'],
            },
          });
        }
        return '.component{}';
      });

      expect(getDynamicImportCss(['789'])).toBe('.component{}');
    });

    it('deduplicates CSS files shared across multiple matching chunks', () => {
      existsSyncMock.mockReturnValue(true);
      readFileSyncMock.mockImplementation((p: string) => {
        if (p === manifestPath) {
          return JSON.stringify({
            ComponentA: {
              id: 1,
              files: ['static/css/shared.css', 'static/css/a.css'],
            },
            ComponentB: {
              id: 2,
              files: ['static/css/shared.css', 'static/css/b.css'],
            },
          });
        }
        return `.css-from-${p.split('/').pop()}`;
      });

      expect(getDynamicImportCss(['ComponentA', 'ComponentB'])).toBe(
        '.css-from-shared.css.css-from-a.css.css-from-b.css',
      );
    });

    it('ignores non-CSS files in the chunk manifest', () => {
      existsSyncMock.mockReturnValue(true);
      readFileSyncMock.mockImplementation((p: string) => {
        if (p === manifestPath) {
          return JSON.stringify({
            ComponentA: {
              id: 1,
              files: [
                'static/js/component.js',
                'static/css/component.css',
                'static/js/component.js.map',
              ],
            },
          });
        }
        if (p.includes('component.js') && !p.includes('.map'))
          return '.js-ignored{}';
        if (p.includes('component.css')) return '.css-included{}';
        if (p.includes('.map')) return '.map-ignored{}';
        return '';
      });

      expect(getDynamicImportCss(['ComponentA'])).toBe('.css-included{}');
      expect(readFileSyncMock).toHaveBeenCalledTimes(2);
    });

    it('returns empty string when no chunks match the given dynamicIds', () => {
      existsSyncMock.mockReturnValue(true);
      readFileSyncMock.mockReturnValue(
        JSON.stringify({
          'other/Component': { id: 99, files: ['static/css/other.css'] },
        }),
      );

      expect(getDynamicImportCss(['unknown-chunk'])).toBe('');
    });

    it('returns empty string when the manifest JSON is malformed', () => {
      existsSyncMock.mockImplementation((p: string) => p === manifestPath);
      readFileSyncMock.mockReturnValue('not valid json');

      expect(getDynamicImportCss(['some-chunk'])).toBe('');
      expect(loggerMock.error).toHaveBeenCalledWith(
        'dynamic_import_css_read_error',
        expect.objectContaining({ event: 'dynamic_import_css_read_error' }),
      );
    });

    it('logs an error and returns empty string when readFileSync throws', () => {
      existsSyncMock.mockImplementation((p: string) => p === manifestPath);
      readFileSyncMock.mockImplementation(() => {
        throw new Error('disk read failed');
      });

      expect(getDynamicImportCss(['some-chunk'])).toBe('');
      expect(loggerMock.error).toHaveBeenCalledWith(
        'dynamic_import_css_read_error',
        expect.objectContaining({ message: 'disk read failed' }),
      );
    });
  });

  describe('getAmpLiteCss', () => {
    const devCssPath = '/app/build/dev-css-modules.css';

    describe('in development', () => {
      beforeEach(() => {
        process.env.NODE_ENV = 'development';
      });

      it('returns the full dev CSS when dev-css-modules.css exists', () => {
        existsSyncMock.mockImplementation((p: string) => p === devCssPath);
        readFileSyncMock.mockReturnValue('.dev-styles{color:pink}');

        expect(getAmpLiteCss({ page: '/articles/page', dynamicIds: [] })).toBe(
          '.dev-styles{color:pink}',
        );
      });

      it('returns empty string when dev-css-modules.css does not exist', () => {
        existsSyncMock.mockReturnValue(false);

        expect(getAmpLiteCss({ page: '/articles/page', dynamicIds: [] })).toBe(
          '',
        );
      });
    });

    describe('in production', () => {
      beforeEach(() => {
        process.env.NODE_ENV = 'production';
      });

      it('returns combined build manifest CSS and dynamic import CSS', () => {
        const buildManifestPath = '/app/build/build-manifest.json';
        const loadableManifestPath = '/app/build/react-loadable-manifest.json';

        existsSyncMock.mockReturnValue(true);
        readFileSyncMock.mockImplementation((p: string) => {
          if (p === buildManifestPath) {
            return JSON.stringify({
              pages: {
                '/_app': ['static/css/app.css'],
                '/articles/page': [],
              },
            });
          }
          if (p === loadableManifestPath) {
            return JSON.stringify({
              ComponentA: { id: 1, files: ['static/css/dynamic.css'] },
            });
          }
          if (p.includes('static/css/app.css')) return '.app{}';
          if (p.includes('static/css/dynamic.css')) return '.dynamic{}';
          return '';
        });

        expect(
          getAmpLiteCss({ page: '/articles/page', dynamicIds: ['ComponentA'] }),
        ).toBe('.app{}.dynamic{}');
      });

      it('returns empty string when neither manifest exists', () => {
        existsSyncMock.mockReturnValue(false);

        expect(
          getAmpLiteCss({ page: '/articles/page', dynamicIds: ['123'] }),
        ).toBe('');
      });

      it('returns only dynamic CSS when the build manifest has no CSS', () => {
        const buildManifestPath = '/app/build/build-manifest.json';
        const loadableManifestPath = '/app/build/react-loadable-manifest.json';

        existsSyncMock.mockReturnValue(true);
        readFileSyncMock.mockImplementation((p: string) => {
          if (p === buildManifestPath) {
            return JSON.stringify({ pages: {} });
          }
          if (p === loadableManifestPath) {
            return JSON.stringify({
              ComponentA: { id: 1, files: ['static/css/dynamic.css'] },
            });
          }
          if (p.includes('static/css/dynamic.css')) return '.dynamic{}';
          return '';
        });

        expect(
          getAmpLiteCss({ page: '/articles/page', dynamicIds: ['ComponentA'] }),
        ).toBe('.dynamic{}');
      });
    });
  });
});
