import { css } from '@emotion/react';
import {
  GROUP_3_MIN_WIDTH,
  GROUP_5_MIN_WIDTH,
} from '#components/ThemeProvider/mediaQueries';

export const oneColumn = css({
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  gridAutoFlow: 'column',
});

export const twoColumn = css({ ...oneColumn });

export const multiColumn = css([
  twoColumn,
  {
    [GROUP_5_MIN_WIDTH]: {
      gridAutoFlow: 'row',
    },
  },
]);

export const gridTemplateRows = (numberOfItems: number) =>
  css({ gridTemplateRows: `repeat(${numberOfItems}, auto)` });

export const multiColumnGridTemplateRows = (numberOfItems: number) =>
  css({
    [GROUP_3_MIN_WIDTH]: {
      gridTemplateRows: `repeat(${Math.ceil(numberOfItems / 2)}, auto)`,
    },
  });
