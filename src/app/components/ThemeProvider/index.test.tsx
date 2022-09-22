import React from 'react';
import { render, act } from '@testing-library/react';
import { css, Theme } from '@emotion/react';

import ThemeProvider from '.';

describe('ThemeProvider', () => {
  it('should provide the palette', async () => {
    await act(async () => {
      render(
        <ThemeProvider service="mundo" variant="default">
          <div
            css={({ palette }: Theme) =>
              css({
                backgroundColor: palette.BRAND_BACKGROUND,
                color: palette.WHITE,
              })
            }
          />
        </ThemeProvider>,
      );
    });

    expect(document.body).toMatchInlineSnapshot(`
      .emotion-0 {
        background-color: #B80000;
        color: #FFFFFF;
      }

      <body>
        <div>
          <div
            class="emotion-0"
          />
        </div>
      </body>
    `);
  });

  it('should provide the spacings', async () => {
    await act(async () => {
      render(
        <ThemeProvider service="mundo" variant="default">
          <div
            css={({ spacings }: Theme) =>
              css({
                padding: `${spacings.FULL}rem ${spacings.DOUBLE}rem ${spacings.TRIPLE}rem ${spacings.QUADRUPLE}rem`,
              })
            }
          />
        </ThemeProvider>,
      );
    });

    expect(document.body).toMatchInlineSnapshot(`
      .emotion-0 {
        padding: 0.5rem 1rem 1.5rem 2rem;
      }

      <body>
        <div>
          <div
            class="emotion-0"
          />
        </div>
      </body>
    `);
  });

  it('should provide the media queries', async () => {
    await act(async () => {
      render(
        <ThemeProvider service="mundo" variant="default">
          <div
            css={({ mq }: Theme) =>
              css({
                [mq.GROUP_0_MAX_WIDTH]: {
                  display: 'block',
                },
                [mq.GROUP_1_MAX_WIDTH]: {
                  display: 'block',
                },
                [mq.GROUP_1_MIN_WIDTH]: {
                  display: 'block',
                },
                [mq.GROUP_1_ONLY]: {
                  display: 'block',
                },
                [mq.GROUP_2_MAX_WIDTH]: {
                  display: 'block',
                },
                [mq.GROUP_2_MIN_WIDTH]: {
                  display: 'block',
                },
                [mq.GROUP_2_ONLY]: {
                  display: 'block',
                },
                [mq.GROUP_3_MAX_WIDTH]: {
                  display: 'block',
                },
                [mq.GROUP_3_MIN_WIDTH]: {
                  display: 'block',
                },
                [mq.GROUP_3_ONLY]: {
                  display: 'block',
                },
                [mq.GROUP_4_MAX_WIDTH]: {
                  display: 'block',
                },
                [mq.GROUP_4_MIN_WIDTH]: {
                  display: 'block',
                },
                [mq.GROUP_4_ONLY]: {
                  display: 'block',
                },
                [mq.GROUP_5_MIN_WIDTH]: {
                  display: 'block',
                },
              })
            }
          />
        </ThemeProvider>,
      );
    });

    expect(document.body).toMatchInlineSnapshot(`
      @media (max-width: 14.9375rem) {
        .emotion-0 {
          display: block;
        }
      }

      @media (max-width: 24.9375rem) {
        .emotion-0 {
          display: block;
        }
      }

      @media (min-width: 15rem) {
        .emotion-0 {
          display: block;
        }
      }

      @media (min-width: 15rem) and (max-width: 24.9375rem) {
        .emotion-0 {
          display: block;
        }
      }

      @media (max-width: 37.4375rem) {
        .emotion-0 {
          display: block;
        }
      }

      @media (min-width: 25rem) {
        .emotion-0 {
          display: block;
        }
      }

      @media (min-width: 25rem) and (max-width: 37.4375rem) {
        .emotion-0 {
          display: block;
        }
      }

      @media (max-width: 62.9375rem) {
        .emotion-0 {
          display: block;
        }
      }

      @media (min-width: 37.5rem) {
        .emotion-0 {
          display: block;
        }
      }

      @media (min-width: 37.5rem) and (max-width: 62.9375rem) {
        .emotion-0 {
          display: block;
        }
      }

      @media (max-width: 79.9375rem) {
        .emotion-0 {
          display: block;
        }
      }

      @media (min-width: 63rem) {
        .emotion-0 {
          display: block;
        }
      }

      @media (min-width: 63rem) and (max-width: 79.9375rem) {
        .emotion-0 {
          display: block;
        }
      }

      @media (min-width: 80rem) {
        .emotion-0 {
          display: block;
        }
      }

      <body>
        <div>
          <div
            class="emotion-0"
          />
        </div>
      </body>
    `);
  });

  it('should provide fonts', async () => {
    await act(async () => {
      render(
        <ThemeProvider service="mundo" variant="default">
          <div />
        </ThemeProvider>,
      );
    });

    expect(
      Array.from(
        document.head.querySelectorAll('[data-emotion="css-global"]'),
      ).map(el => el.innerHTML),
    ).toEqual([
      '@font-face{font-family:ReithSans;src:url("https://gel.files.bbci.co.uk/r2.512/BBCReithSans_W_Bd.woff2") format("woff2"),url("https://gel.files.bbci.co.uk/r2.512/BBCReithSans_W_Bd.woff") format("woff");font-weight:700;font-display:optional;}',
      '@font-face{font-family:ReithSans;src:url("https://gel.files.bbci.co.uk/r2.512/BBCReithSans_W_Rg.woff2") format("woff2"),url("https://gel.files.bbci.co.uk/r2.512/BBCReithSans_W_Rg.woff") format("woff");font-display:optional;}',
      '@font-face{font-family:ReithSerif;src:url("https://gel.files.bbci.co.uk/r2.512/BBCReithSerif_W_Md.woff2") format("woff2"),url("https://gel.files.bbci.co.uk/r2.512/BBCReithSerif_W_Md.woff") format("woff");font-weight:500;font-display:optional;}',
      '@font-face{font-family:ReithSerif;src:url("https://gel.files.bbci.co.uk/r2.512/subsets/BBCReithSerif_WNumbers_Lt.woff2") format("woff2"),url("https://gel.files.bbci.co.uk/r2.512/subsets/BBCReithSerif_WNumbers_Lt.woff") format("woff");font-weight:300;font-display:optional;}',
    ]);
  });
});
