jest.mock('fs');

type LoaderContext = {
  resourcePath: string;
  rootContext: string;
};

type DevCssExtractLoader = (this: LoaderContext, jsSource: string) => string;

const makeContext = (
  resourcePath: string,
  rootContext = '/app',
): LoaderContext => ({ resourcePath, rootContext });

// Reproduces the css-loader JS output that the loader receives:
// ___CSS_LOADER_EXPORT___.push([module.id, "<css>", ""]);
const cssLoaderOutput = (css: string) =>
  `___CSS_LOADER_EXPORT___.push([module.id, "${css}", ""]);`;

describe('DevCssExtractLoader', () => {
  let loader: DevCssExtractLoader;
  let writeFileSyncMock: jest.Mock;
  let mkdirSyncMock: jest.Mock;

  beforeEach(() => {
    // Reset the module registry so the module-level cssMap starts empty for each test.
    // Re-require fs afterwards so writeFileSyncMock and mkdirSyncMock reference the
    // same mock instances that the freshly loaded loader module will use.
    jest.resetModules();
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('fs');
    writeFileSyncMock = fs.writeFileSync;
    mkdirSyncMock = fs.mkdirSync;
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    loader = require('./DevCssExtractLoader.cjs');
    jest.clearAllMocks();
  });

  describe('pass-through behaviour', () => {
    it('returns the jsSource unchanged when a CSS push is matched', () => {
      const jsSource = cssLoaderOutput('.foo{color:red}');

      expect(loader.call(makeContext('/src/a.module.css'), jsSource)).toBe(
        jsSource,
      );
    });

    it('returns the jsSource unchanged when there is no CSS push match', () => {
      const jsSource = 'unexpected loader output';

      expect(loader.call(makeContext('/src/a.module.css'), jsSource)).toBe(
        jsSource,
      );
    });
  });

  describe('disk writes', () => {
    it('creates the output directory recursively before writing', () => {
      loader.call(
        makeContext('/src/a.module.css', '/app'),
        cssLoaderOutput('.foo{color:red}'),
      );

      expect(mkdirSyncMock).toHaveBeenCalledWith('/app/build', {
        recursive: true,
      });
    });

    it('writes the extracted CSS to build/dev-css-modules.css under rootContext', () => {
      loader.call(
        makeContext('/src/a.module.css', '/app'),
        cssLoaderOutput('.foo{color:red}'),
      );

      expect(writeFileSyncMock).toHaveBeenCalledWith(
        '/app/build/dev-css-modules.css',
        '.foo{color:red}',
        'utf-8',
      );
    });

    it('does not write to disk when the source has no CSS push match', () => {
      loader.call(makeContext('/src/a.module.css'), 'no match here');

      expect(writeFileSyncMock).not.toHaveBeenCalled();
      expect(mkdirSyncMock).not.toHaveBeenCalled();
    });
  });

  describe('CSS extraction', () => {
    it('unescapes CSS that contains escaped characters', () => {
      // css-loader JSON-encodes the CSS string, so " inside CSS appears as \"
      const escaped = '.foo{content:\\"hello\\"}';

      loader.call(
        makeContext('/src/a.module.css', '/app'),
        cssLoaderOutput(escaped),
      );

      expect(writeFileSyncMock).toHaveBeenCalledWith(
        '/app/build/dev-css-modules.css',
        '.foo{content:"hello"}',
        'utf-8',
      );
    });

    it('unescapes CSS with escaped newlines', () => {
      // css-loader encodes real newlines as \n inside the push string
      const escaped = '.foo {\\ncolor: red;\\n}';

      loader.call(
        makeContext('/src/a.module.css', '/app'),
        cssLoaderOutput(escaped),
      );

      expect(writeFileSyncMock).toHaveBeenCalledWith(
        '/app/build/dev-css-modules.css',
        '.foo {\ncolor: red;\n}',
        'utf-8',
      );
    });

    it('handles a push call that spans multiple lines in the JS source', () => {
      // The /s flag on the regex allows matching across actual newlines in the source
      const multilineSource = `___CSS_LOADER_EXPORT___.push([module.id, ".foo{color:red}",
  ""]);`;

      loader.call(makeContext('/src/a.module.css', '/app'), multilineSource);

      expect(writeFileSyncMock).toHaveBeenCalledWith(
        '/app/build/dev-css-modules.css',
        '.foo{color:red}',
        'utf-8',
      );
    });
  });

  describe('in-memory CSS map', () => {
    it('concatenates CSS from multiple source files with newlines', () => {
      loader.call(
        makeContext('/src/a.module.css', '/app'),
        cssLoaderOutput('.class-a{color:red}'),
      );
      loader.call(
        makeContext('/src/b.module.css', '/app'),
        cssLoaderOutput('.class-b{color:blue}'),
      );

      expect(writeFileSyncMock).toHaveBeenLastCalledWith(
        '/app/build/dev-css-modules.css',
        '.class-a{color:red}\n.class-b{color:blue}',
        'utf-8',
      );
    });

    it('replaces CSS for the same resourcePath on Hot Module Replacement rebuild without duplication', () => {
      loader.call(
        makeContext('/src/a.module.css', '/app'),
        cssLoaderOutput('.old{color:red}'),
      );
      loader.call(
        makeContext('/src/a.module.css', '/app'),
        cssLoaderOutput('.new{color:green}'),
      );

      expect(writeFileSyncMock).toHaveBeenLastCalledWith(
        '/app/build/dev-css-modules.css',
        '.new{color:green}',
        'utf-8',
      );
    });

    it('retains CSS from unchanged files when only one file is rebuilt', () => {
      loader.call(
        makeContext('/src/a.module.css', '/app'),
        cssLoaderOutput('.class-a{color:red}'),
      );
      loader.call(
        makeContext('/src/b.module.css', '/app'),
        cssLoaderOutput('.class-b{color:blue}'),
      );
      // Hot Module Replacement: only b.module.css changed
      loader.call(
        makeContext('/src/b.module.css', '/app'),
        cssLoaderOutput('.class-b-updated{color:green}'),
      );

      expect(writeFileSyncMock).toHaveBeenLastCalledWith(
        '/app/build/dev-css-modules.css',
        '.class-a{color:red}\n.class-b-updated{color:green}',
        'utf-8',
      );
    });

    it('writes once per loader call even when other files are already in the map', () => {
      loader.call(
        makeContext('/src/a.module.css', '/app'),
        cssLoaderOutput('.class-a{color:red}'),
      );

      expect(writeFileSyncMock).toHaveBeenCalledTimes(1);

      loader.call(
        makeContext('/src/b.module.css', '/app'),
        cssLoaderOutput('.class-b{color:blue}'),
      );

      expect(writeFileSyncMock).toHaveBeenCalledTimes(2);
    });
  });
});
