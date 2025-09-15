import { Theme } from '@emotion/react';

import {
  calculatePromoWidth,
  calculateVariedNavContainerWidths,
} from './styleUtils';

describe('styleUtils', () => {
  it.each([
    {
      title:
        'calculatePromoWidth - should return the correct promo width to fit 4 items',
      fitForNItems: 5,
      gapWidth: 1,
      navButtonAffordance: false,
      expected: 'calc((100% / 5.33) - 1rem)',
    },
    {
      title:
        'calculatePromoWidth - should return the correct promo width to fit 4 items and a navigation button',
      fitForNItems: 5,
      gapWidth: 1,
      navButtonAffordance: true,
      expected: 'calc((100% / 5.5) - 1rem)',
    },
  ])('$title', ({ fitForNItems, gapWidth, navButtonAffordance, expected }) => {
    const width = calculatePromoWidth({
      fitForNItems,
      gapWidth,
      navButtonAffordance,
    });

    expect(width).toBe(expected);
  });

  it('should calculate the correct navigation button widths for all break points', () => {
    const mockMq = {
      GROUP_3_MIN_WIDTH: 'group 3 min',
      GROUP_4_MIN_WIDTH: 'group 4 min',
      GROUP_5_MIN_WIDTH: 'group 5 min',
      POINTER: 'pointer',
    } as Theme['mq'];

    const navButtonWidths = calculateVariedNavContainerWidths({
      mq: mockMq,
      display: 'block',
      widthParameter: 'flexBasis',
    });
    expect(navButtonWidths).toStrictEqual({
      'group 3 min': {
        pointer: {
          display: 'block',
          flexBasis: 'calc(calc((100% / 3.5) - 0rem) * 0.5)',
        },
      },
      'group 4 min': {
        display: 'block',
        flexBasis: 'calc(calc((100% / 4.5) - 0rem) * 0.5)',
      },
      'group 5 min': {
        display: 'block',
        flexBasis: 'calc(calc((100% / 5.5) - 0rem) * 0.5)',
      },
    });
  });
});
