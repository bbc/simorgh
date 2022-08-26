import { render, act } from '@testing-library/react';
import { css, Theme } from '@emotion/react';

import ThemeProvider from '.';

const Fixture = () => {
  return (
    <div
      css={({ spacings, mq, palette }: Theme) =>
        css({
          backgroundColor: palette.BRAND_BACKGROUND,
          color: palette.WHITE,
          padding: `${spacings.FULL}rem`,
          [mq.GROUP_3_MIN_WIDTH]: {
            padding: `${spacings.FULL}rem`,
          },
        })
      }
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
      .emotion-0 {
        background-color: #B80000;
        color: #FFFFFF;
        padding: 0.5rem;
      }

      @media (min-width: 37.5rem) {
        .emotion-0 {
          padding: 0.5rem;
        }
      }

      <div>
        <div
          class="emotion-0"
        />
      </div>
    `);
  });
});
