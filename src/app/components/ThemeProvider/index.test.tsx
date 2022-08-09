import { useTheme } from '@emotion/react';
import { render, act } from '@testing-library/react';

import ThemeProvider from '.';

const Fixture = () => {
  const { palette, spacings } = useTheme();

  return (
    <div
      style={{
        backgroundColor: palette.BRAND_BACKGROUND,
        color: palette.BLACK,
        padding: `${spacings.DOUBLE}rem`,
      }}
    />
  );
};

describe('ThemeProvider', () => {
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
          style="background-color: rgb(184, 0, 0); color: rgb(0, 0, 0); padding: 1rem;"
        />
      </div>
    `);
  });
});
