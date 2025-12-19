import { render, act } from '@testing-library/react';
import { css, Theme } from '@emotion/react';

import SERVICES from '#app/lib/config/services';
import defaultServiceVariants from '#app/lib/config/services/defaultServiceVariants';
import { Services } from '#app/models/types/global';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import Brand from '#app/legacy/containers/Brand';
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

  describe.each(SERVICES)(`brandSVG for %s`, service => {
    it(`should match chameleonLogos/${service}.tsx`, async () => {
      await act(async () => {
        render(
          <ThemeProvider
            service={service as Services}
            variant={defaultServiceVariants[service] || 'default'}
          >
            <ServiceContextProvider service={service as Services}>
              <Brand />
            </ServiceContextProvider>
          </ThemeProvider>,
        );
      });

      const themeBrandSVG = document.body.querySelector('svg')?.innerHTML;

      const { default: svg } = await import(`./chameleonLogos/${service}`);

      const { getByTestId } = render(
        <svg data-testid={service}>{svg.group}</svg>,
      );

      const chameleonSVG = getByTestId(service).innerHTML;

      expect(themeBrandSVG).toEqual(chameleonSVG);
    });
  });
});
