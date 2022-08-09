import { useTheme } from '@emotion/react';
import { render, act } from '@testing-library/react';

import ThemeProvider from '.';

const Fixture = () => {
  const { colours, spacings } = useTheme();

  return (
    <div
      style={{
        backgroundColor: colours.BRAND_BACKGROUND,
        color: colours.BLACK,
        padding: `${spacings.DOUBLE}rem`,
      }}
    />
  );
};

it('should provide the theme to components', async () => {
  let container;

  await act(async () => {
    ({ container } = render(
      <ThemeProvider service="news">
        <Fixture />
      </ThemeProvider>,
    ));
  });

  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        style="background-color: rgb(184, 0, 0); color: rgb(0, 0, 0); padding: 2rem;"
      />
    </div>
  `);
});
