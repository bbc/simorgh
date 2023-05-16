import { css, Theme } from '@emotion/react';
import { GROUP_3_MIN_WIDTH } from '../../../ThemeProvider/mediaQueries';

const styles = {
  oneColumn: css({
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    gridAutoFlow: 'column',
  }),

  twoColumn: css({}),

  multiColumn: ({ mq }: Theme) =>
    css({
      [mq.GROUP_5_MIN_WIDTH]: {
        gridAutoFlow: 'row',
      },
    }),
};

export const gridTemplateRows = (numberOfItems: number) =>
  css({ gridTemplateRows: `repeat(${numberOfItems}, auto)` });

export const multiColumnGridTemplateRows = (numberOfItems: number) => {
  css({
    [GROUP_3_MIN_WIDTH]: {
      gridTemplateRows: `repeat(${Math.ceil(numberOfItems / 2)}, auto)`,
    },
  });
};

export default styles;
