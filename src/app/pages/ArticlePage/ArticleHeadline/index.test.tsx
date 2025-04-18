import React from 'react';
import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';
import * as useOptimizelyVariation from '#app/hooks/useOptimizelyVariation';
import ArticleHeadline from '.';

jest.mock('#app/legacy/containers/OptimizelyPageViewTracking');

const headlineBlock = {
  id: 'c7298038',
  type: 'text',
  blocks: [
    {
      id: 'eed627ab',
      type: 'paragraph',
      model: {
        text: '‘Nziyamamariza kuba perezida w’Uburusiya Putin navaho’ - Umupfakazi wa Navalny',
        blocks: [
          {
            id: 'af816737',
            type: 'fragment',
            model: {
              text: '‘Nziyamamariza kuba perezida w’Uburusiya Putin navaho’ - Umupfakazi wa Navalny',
              attributes: [],
            },
          },
        ],
      },
    },
  ],
};

describe('ArticleHeadline - Lite Site CTA', () => {
  const useDecisionSpy = jest.spyOn(useOptimizelyVariation, 'default');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    { variation: 'control_text_only', expected: 'Inyandiko gusa' },
    {
      variation: 'variation_a_explore_data_friendly_version',
      expected: 'Koresha uburyo butwara amahera make',
    },
    {
      variation: 'variation_b_data_saving_version',
      expected: 'Uburyo buziganya amahera',
    },
    {
      variation: 'variation_c_read_data_saving_version',
      expected: 'Soma mu buryo buziganya amahera',
    },
    { variation: 'variation_d_lite_site', expected: 'Site yoroheje' },
    {
      variation: 'variation_e_2g_optimised_version',
      expected: '2G Ukoresheje uburyo busanzwe',
    },
    {
      variation: 'variation_f_low_data_version',
      expected: 'Uburyo butwara amahera make',
    },
    {
      variation: 'off',
      expected: 'Inyandiko gusa',
    },
  ])(
    'Should display $expected when the variation is $variation',
    async ({ variation, expected }) => {
      useDecisionSpy.mockReturnValueOnce(variation as unknown as true);

      let container;

      await act(async () => {
        ({ container } = await act(() => {
          return render(<ArticleHeadline {...headlineBlock} />, {
            service: 'gahuza',
            toggles: { liteSiteCTA: { enabled: true } },
          });
        }));
      });

      const titleSpan = (container as unknown as HTMLElement).querySelector(
        'div[data-e2e="to-lite-site"] div span span',
      );

      expect(titleSpan?.innerHTML).toBe(expected);
    },
  );

  it('Before hydration snapshot', async () => {
    useDecisionSpy.mockReturnValueOnce(null as unknown as true);

    let container;

    await act(async () => {
      ({ container } = await act(() => {
        return render(<ArticleHeadline {...headlineBlock} />, {
          service: 'gahuza',
          toggles: { liteSiteCTA: { enabled: true } },
        });
      }));
    });

    expect(container).toMatchSnapshot();
  });

  it('After hydration snapshot', async () => {
    useDecisionSpy.mockReturnValueOnce('off' as unknown as true);

    let container;

    await act(async () => {
      ({ container } = await act(() => {
        return render(<ArticleHeadline {...headlineBlock} />, {
          service: 'gahuza',
          toggles: { liteSiteCTA: { enabled: true } },
        });
      }));
    });

    expect(container).toMatchSnapshot();
  });
});
