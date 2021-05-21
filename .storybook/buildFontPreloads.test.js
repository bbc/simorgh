const fs = require('fs');

jest.mock('fs', () => ({
  writeFileSync: jest.fn(),
}));

jest.mock('glob', () => ({
  sync: () => [
    '/some-path/.storybook/static/fonts/IskoolaPota',
    '/some-path/.storybook/static/fonts/IskoolaPota/bold.eot',
    '/some-path/.storybook/static/fonts/IskoolaPota/bold.ttf',
    '/some-path/.storybook/static/fonts/IskoolaPota/bold.woff',
    '/some-path/.storybook/static/fonts/IskoolaPota/normal.eot',
    '/some-path/.storybook/static/fonts/IskoolaPota/normal.ttf',
    '/some-path/.storybook/static/fonts/IskoolaPota/normal.woff',
  ],
}));

it('should build the font preloads', () => {
  require('./buildFontPreloads.js');
  const [[fileName, content]] = fs.writeFileSync.mock.calls;

  expect(fileName).toEqual(
    expect.stringContaining('.storybook/preview-head.html'),
  );
  expect(content).toMatchInlineSnapshot(`
    "
    <link
      rel=\\"preload\\"
      href=\\"fonts/IskoolaPota/bold.eot\\"
      as=\\"font\\"
      type=\\"font/eot\\"
      crossorigin=\\"anonymous\\"
    />

    <link
      rel=\\"preload\\"
      href=\\"fonts/IskoolaPota/bold.ttf\\"
      as=\\"font\\"
      type=\\"font/ttf\\"
      crossorigin=\\"anonymous\\"
    />

    <link
      rel=\\"preload\\"
      href=\\"fonts/IskoolaPota/bold.woff\\"
      as=\\"font\\"
      type=\\"font/woff\\"
      crossorigin=\\"anonymous\\"
    />

    <link
      rel=\\"preload\\"
      href=\\"fonts/IskoolaPota/normal.eot\\"
      as=\\"font\\"
      type=\\"font/eot\\"
      crossorigin=\\"anonymous\\"
    />

    <link
      rel=\\"preload\\"
      href=\\"fonts/IskoolaPota/normal.ttf\\"
      as=\\"font\\"
      type=\\"font/ttf\\"
      crossorigin=\\"anonymous\\"
    />

    <link
      rel=\\"preload\\"
      href=\\"fonts/IskoolaPota/normal.woff\\"
      as=\\"font\\"
      type=\\"font/woff\\"
      crossorigin=\\"anonymous\\"
    />
    "
  `);
});
