const fs = require('fs');

jest.mock('fs', () => ({
  writeFileSync: jest.fn(),
}));

jest.mock('glob', () => ({
  sync: () => [
    '/some-path/.storybook/static/fonts/NotoSerifSinhala',
    '/some-path/.storybook/static/fonts/NotoSerifSinhala/bold.eot',
    '/some-path/.storybook/static/fonts/NotoSerifSinhala/bold.ttf',
    '/some-path/.storybook/static/fonts/NotoSerifSinhala/bold.woff',
    '/some-path/.storybook/static/fonts/NotoSerifSinhala/normal.eot',
    '/some-path/.storybook/static/fonts/NotoSerifSinhala/normal.ttf',
    '/some-path/.storybook/static/fonts/NotoSerifSinhala/normal.woff',
  ],
}));

it('should build the font preloads', () => {
  // eslint-disable-next-line global-require
  require('./buildFontPreloads');
  const [[fileName, content]] = fs.writeFileSync.mock.calls;

  expect(fileName).toEqual(
    expect.stringContaining('.storybook/preview-head.html'),
  );
  expect(content).toMatchInlineSnapshot(`
    "
    <link
      rel="preload"
      href="fonts/NotoSerifSinhala/bold.eot"
      as="font"
      type="font/eot"
      crossorigin="anonymous"
    />

    <link
      rel="preload"
      href="fonts/NotoSerifSinhala/bold.ttf"
      as="font"
      type="font/ttf"
      crossorigin="anonymous"
    />

    <link
      rel="preload"
      href="fonts/NotoSerifSinhala/bold.woff"
      as="font"
      type="font/woff"
      crossorigin="anonymous"
    />

    <link
      rel="preload"
      href="fonts/NotoSerifSinhala/normal.eot"
      as="font"
      type="font/eot"
      crossorigin="anonymous"
    />

    <link
      rel="preload"
      href="fonts/NotoSerifSinhala/normal.ttf"
      as="font"
      type="font/ttf"
      crossorigin="anonymous"
    />

    <link
      rel="preload"
      href="fonts/NotoSerifSinhala/normal.woff"
      as="font"
      type="font/woff"
      crossorigin="anonymous"
    />
    "
  `);
});
